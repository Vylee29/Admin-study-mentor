import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Image, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  BankAccountInput,
  BankItemResp,
  LookUpBankNumberReq,
  QRCodeReq,
} from '../../../+core/models/profile.model';
import {
  createQRCodeApi,
  getBankListApi,
  getBankListKeys,
  getTutorBankInfoApi,
  getTutorBankInfoKeys,
  lookUpBankNumberApi,
  updateTutorialBankInfoApi,
} from '../../../+core/services/user.service';
import { formatPriceVND } from '../../../+core/utilities/caculate-price.utility';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';
/*
 getTutorBankInfoQuery?.data?.idOfBanking &&
      getTutorBankInfoQuery?.data?.numberOfBanking &&
      getTutorBankInfoQuery?.data?.nameOfBanking
*/
type Props = {
  idOfBanking?: string;
  numberOfBanking?: string;
  nameOfBanking?: string;
  nameUserOfBanking?: string;
  money?: number;
};

function BankAccountForm({
  idOfBanking,
  numberOfBanking,
  nameOfBanking,
  nameUserOfBanking,
  money,
}: Props) {
  console.log('first render', idOfBanking, numberOfBanking, nameOfBanking, nameUserOfBanking);
  const [form] = Form.useForm<BankAccountInput>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [bankList, setBankList] = useState<BankItemResp[]>([]);

  const mutateUpdateTutorBankInfo = useMutation({
    mutationFn: (data: any) => updateTutorialBankInfoApi(data),
    onSuccess: () => {
      toastSuccess('Cập nhật thông tin thành công');
    },
    onError: handleError,
  });

  const handleSubmitBankAccount = (values: BankAccountInput) => {
    setIsUpdate(false);

    const requestCreateQRCode: QRCodeReq = {
      accountNo: values.accountNumber,
      accountName: values.accountName,
      acqId: +values.binBank,
      template: 'qr_only',
    };

    createQRCode.mutate(requestCreateQRCode);

    const requestUpdateTutorBankInfo = {
      idOfBanking: values.binBank,
      numberOfBanking: values.accountNumber,
      nameUserOfBanking: values.accountName,
    };

    mutateUpdateTutorBankInfo.mutate(requestUpdateTutorBankInfo);
  };

  const handleCancelUpdate = () => {
    setIsUpdate(false);
    form.resetFields();
  };

  const lookUpMutation = useMutation({
    mutationFn: (data: LookUpBankNumberReq) => lookUpBankNumberApi(data),
    onError: handleError,
  });

  const createQRCode = useMutation({
    mutationFn: (data: QRCodeReq) => createQRCodeApi(data),
    onError: handleError,
  });

  const handleLookUpBankNumber = async () => {
    const values = form.getFieldsValue();

    if (!values.accountNumber || !values.binBank) return;

    lookUpMutation.mutate({
      bin: values.binBank,
      accountNumber: values.accountNumber,
    });
  };

  const getBankListQuery = useQuery({
    queryKey: getBankListKeys.all,
    queryFn: () => getBankListApi(),
    select: (resp) => resp.data.data,
  });

  const getTutorBankInfoQuery = useQuery({
    queryKey: getTutorBankInfoKeys.all,
    queryFn: () => getTutorBankInfoApi(),
    select: (resp) => resp.data.data,
  });

  useEffect(() => {
    if (lookUpMutation.data?.data?.data?.accountName) {
      form.setFieldValue('accountName', lookUpMutation.data?.data?.data?.accountName);
    }
  }, [lookUpMutation.data?.data?.data?.accountName]);

  useEffect(() => {
    if (createQRCode.data?.data?.data?.qrDataURL) {
      setQrCodeImage(createQRCode.data?.data?.data?.qrDataURL);
    }
  }, [createQRCode.data?.data?.data?.qrDataURL]);

  useEffect(() => {
    if (getBankListQuery?.data) {
      const listData = getBankListQuery?.data;

      setBankList(listData);
    }
  }, [getBankListQuery?.data]);

  useEffect(() => {
    if (idOfBanking && numberOfBanking && nameOfBanking && nameUserOfBanking) {
      form.setFieldsValue({
        binBank: idOfBanking,
        accountNumber: numberOfBanking,
        accountName: nameUserOfBanking,
      });

      const requestCreateQRCode: QRCodeReq = {
        accountNo: numberOfBanking,
        accountName: nameUserOfBanking ?? '',
        acqId: +idOfBanking,
        template: 'qr_only',
      };

      createQRCode.mutate(requestCreateQRCode);
    }
  }, [idOfBanking, numberOfBanking, nameOfBanking, nameUserOfBanking]);

  return (
    <div className='flex flex-col items-start gap-4 p-8 mb-8 rounded-md bg-white-900'>
      <div className='text-xl font-semibold text-black-800'>Tài khoản ngân hàng</div>
      <div className='text-md'>
        Cung cấp tài khoản ngân hàng chính xác để <strong>Study Mentor</strong> có thể chuyển tiền
        cho bạn
      </div>
      <div className='mb-2 text-base font-bold'>
        Số tiền cần thanh toán:{' '}
        <span className='font-bold text-red-600'>{formatPriceVND(money ?? 0)}</span>
      </div>
      {qrCodeImage && <Image src={qrCodeImage} alt='QR code' width={200} height={200} />}
      <Form
        name='bankAccountForm'
        onFinish={handleSubmitBankAccount}
        form={form}
        className='w-full'
        autoComplete='off'
        disabled={!isUpdate}
      >
        {/* bank name */}
        <div className='mb-2 text-base font-bold'>Tên ngân hàng</div>
        <Form.Item<BankAccountInput>
          name='binBank'
          rules={[{ required: true, message: 'Vui lòng chọn trường này!' }]}
          className='!mb-2'
        >
          <Select
            options={bankList.map((bank) => ({
              label: bank.shortName,
              value: bank.bin,
            }))}
            className='h-12 text-base font-medium text-gray-700'
            placeholder='Chọn ngân hàng của bạn'
            onChange={(value) => form.setFieldValue('binBank', value)}
          />
        </Form.Item>

        {/* account number */}
        <div className='mb-2 text-base font-bold'>Số tài khoản</div>
        <Form.Item<BankAccountInput>
          name='accountNumber'
          rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
          className='!mb-2'
        >
          <Input
            className='h-12 text-base font-medium text-gray-700'
            placeholder='Nhập số tài khoản của bạn'
            onChange={(e) => form.setFieldValue('accountNumber', e.target.value)}
            onBlur={handleLookUpBankNumber}
          />
        </Form.Item>

        {/* account name */}
        <div className='mb-2 text-base font-bold'>Tên tài khoản</div>
        <Form.Item<BankAccountInput>
          name='accountName'
          rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
          className='!mb-8'
        >
          <Input
            className='h-12 text-base font-medium text-gray-700'
            placeholder='Tên tài khoản của bạn'
            disabled
          />
        </Form.Item>

        {isUpdate && (
          <div className='flex items-center justify-between'>
            <Button
              size='large'
              className='!h-12 !w-[160px] font-bold text-base bg-gray-300'
              onClick={handleCancelUpdate}
            >
              Hủy
            </Button>
            <Form.Item colon={false} className='!mb-0'>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                className='!h-12 font-bold text-base !w-[160px] bg-primary-800'
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
    </div>
  );
}

export default BankAccountForm;
