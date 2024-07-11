import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Radio, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateVoucherReq, UpdateVoucherReq } from '../../../+core/models/voucher.model';
import { createVoucher, updateVoucher } from '../../../+core/services/user.service';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';

export default function UpsertVoucherPage() {
  //state
  const { id } = useParams<{ id: string }>();

  //hooks
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //API

  //getDetail
  //todo

  const createVourcherMutation = useMutation({
    mutationFn: (body: CreateVoucherReq) => createVoucher(body),
    onSuccess: () => {
      toastSuccess('Tạo mã khuyến mãi thành công');
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  const updateVourcherMutation = useMutation({
    mutationFn: (body: UpdateVoucherReq) => updateVoucher(body),
    onSuccess: () => {
      toastSuccess('Cập nhật khuyến mãi thành công');
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  //handlers
  const onFinish = (values: any) => {
    if (id === 'create') {
      const body: CreateVoucherReq = {
        ...values,
        status: Number(values.status),
        isDefault: false,
      };
      createVourcherMutation.mutate(body);
    } else {
      const body: UpdateVoucherReq = {
        ...values,
        voucherId: id,
        status: Number(values.status),
        isDefault: false,
      };
      updateVourcherMutation.mutate(body);
    }
  };

  //useEffect setData from getDetail to Form

  return (
    <div className='w-full'>
      <Spin spinning={false}>
        <div className='flex flex-col w-full gap-4 px-6 mb-10'>
          <p className='text-lg font-semibold'>Thông tin mã khuyến mãi</p>
          <Form
            requiredMark={false}
            className='flex flex-col gap-4'
            form={form}
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 'auto' }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <div className='flex flex-col gap-2 w-1/2 !text-base'>
              <Form.Item
                label={<span className='font-medium'>Mã khuyến mãi</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mã khuyến mãi',
                  },
                ]}
                name='code'
              >
                <Input className='!h-10 !pb-1.5' />
              </Form.Item>
              <Form.Item
                label={<span className='font-medium'>Tỷ lệ giảm giá (%)</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tỷ lệ giảm giá',
                  },
                ]}
                name='percentage'
              >
                <InputNumber<number>
                  defaultValue={0}
                  min={0}
                  max={100}
                  className='!w-full !h-10 !pt-1'
                  formatter={(value) => `${value}%`}
                  parser={(value) => value?.replace('%', '') as unknown as number}
                />
              </Form.Item>
              <Form.Item
                label={<span className='font-medium'>Số lượng</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số lượng mã giảm giá',
                  },
                ]}
                name='quantity'
              >
                <InputNumber<number> defaultValue={0} className='!w-full !h-10 !pt-1' />
              </Form.Item>
              <Form.Item label={<span className='font-medium'>Trạng thái</span>} name='status'>
                <Radio.Group className={`flex gap-4 -mt-2`}>
                  <Radio value='0'>Không hoạt động</Radio>
                  <Radio value='1'>Hoạt động</Radio>
                </Radio.Group>
              </Form.Item>

              <div className='flex items-center justify-end gap-4 mt-4'>
                <Form.Item>
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    type='primary'
                    className='!h-10 !px-5 min-w-[103px] !bg-gray-100 text-black-800 text-base font-medium !border-[#E7E5E4] shadow-md hover:!text-black-800'
                  >
                    Hủy
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={createVourcherMutation.isPending || updateVourcherMutation.isPending}
                    type='primary'
                    className='!h-10 !px-5 !py-2 !bg-primary-red text-base font-medium  !text-white-900 !border-none shadow-sm'
                    htmlType='submit'
                  >
                    Hoàn tất
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Spin>
    </div>
  );
}
