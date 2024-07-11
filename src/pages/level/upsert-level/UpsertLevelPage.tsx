import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LevelModel,
  createLevel,
  getLevelDetailApi,
  levelDetailKeys,
  updateLevel,
} from '../../../+core/services/level.service';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';
import { MY_ROUTE } from '../../../routes/route.constant';
import { GradesPage } from '../../grade/GradePage';

export default function UpsertLevelPage() {
  //state
  const { id } = useParams<{ id: string }>();

  //hooks
  const [form] = Form.useForm<LevelModel>();
  const navigate = useNavigate();

  //API

  const levelDetailQuery = useQuery({
    queryKey: levelDetailKeys.detail(id!),
    queryFn: () => getLevelDetailApi(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  //todo

  const createLevelMutation = useMutation({
    mutationFn: (body: LevelModel) => createLevel(body),
    onSuccess: (resp) => {
      toastSuccess('Tạo cấp học thành công');
      navigate(MY_ROUTE.LEVEL.DETAIL(resp.data.data.id));
    },
    onError: handleError,
  });

  const updateLevelMutation = useMutation({
    mutationFn: (body: LevelModel) => updateLevel(body),
    onSuccess: () => {
      toastSuccess('Cập nhật Cấp học thành công');
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  //handlers
  const onFinish = (values: any) => {
    if (!id) {
      const body: LevelModel = {
        ...values,
      };
      createLevelMutation.mutate(body);
    } else {
      const body: LevelModel = {
        ...values,
        id: id,
      };
      updateLevelMutation.mutate(body);
    }
  };

  useEffect(() => {
    if (levelDetailQuery.data) {
      form.setFieldsValue(levelDetailQuery.data.data.data);
    }
  }, [levelDetailQuery.data]);

  //useEffect setData from getDetail to Form

  return (
    <div className='w-full'>
      <Spin spinning={false}>
        <div className='flex flex-col w-full gap-4 px-6 mb-10'>
          <p className='text-lg font-semibold'>Thông tin cấp học</p>
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
              <Form.Item<LevelModel>
                label={<span className='font-medium'>Tên cấp học</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên cấp học',
                  },
                ]}
                name='levelName'
              >
                <Input className='!h-10 !pb-1.5' />
              </Form.Item>
              <Form.Item<LevelModel>
                label={<span className='font-medium'>Mô tả</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mô tả cấp học',
                  },
                ]}
                name='description'
              >
                <Input className='!w-full !h-10 !pt-1' />
              </Form.Item>

              <div className='flex items-center justify-end gap-4 mt-4'>
                <Form.Item>
                  <Button
                    onClick={() => {
                      navigate(MY_ROUTE.LEVEL.self);
                    }}
                    type='primary'
                    className='!h-10 !px-5 min-w-[103px] !bg-gray-100 text-black-800 text-base font-medium !border-[#E7E5E4] shadow-md hover:!text-black-800'
                  >
                    Hủy
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={createLevelMutation.isPending || updateLevelMutation.isPending}
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

          {id && <GradesPage levelId={id} />}
        </div>
      </Spin>
    </div>
  );
}
