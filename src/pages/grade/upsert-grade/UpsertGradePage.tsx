import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GradeModel,
  createGrade,
  getGradeDetailApi,
  getLevelDetailApi,
  gradeDetailKeys,
  levelDetailKeys,
  updateGrade,
} from '../../../+core/services/level.service';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';
import { MY_ROUTE } from '../../../routes/route.constant';
import { SubjectPage } from '../../subject/SubjectPage';

export default function UpsertGradePage() {
  //state
  const { id, levelId } = useParams<{ id: string; levelId: string }>();

  //hooks
  const [form] = Form.useForm<GradeModel>();
  const navigate = useNavigate();

  //API
  const gradeDetailQuery = useQuery({
    queryKey: gradeDetailKeys.detail(id!),
    queryFn: () => getGradeDetailApi(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  const levelDetailQuery = useQuery({
    queryKey: levelDetailKeys.detail(levelId!),
    queryFn: () => getLevelDetailApi(levelId!),
    enabled: !!levelId,
    placeholderData: keepPreviousData,
  });

  //todo

  const createGradeMutation = useMutation({
    mutationFn: (body: GradeModel) => createGrade(body),
    onSuccess: (resp) => {
      toastSuccess('Tạo Lớp học thành công');
      navigate(MY_ROUTE.GRADE.DETAIL(levelId!, resp.data.data.id));
      navigate(-1);
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  const updateGradeMutation = useMutation({
    mutationFn: (body: GradeModel) => updateGrade(body),
    onSuccess: () => {
      toastSuccess('Cập nhật Lớp học thành công');
      navigate(-1);
    },
    onError: handleError,
  });

  //handlers
  const onFinish = (values: any) => {
    if (!id) {
      const body: GradeModel = {
        ...values,
        id: levelId!,
      };
      createGradeMutation.mutate(body);
    } else {
      const body: GradeModel = {
        ...values,
        id: id,
      };
      updateGradeMutation.mutate(body);
    }
  };

  useEffect(() => {
    if (gradeDetailQuery.data) {
      form.setFieldsValue(gradeDetailQuery.data.data.data);
    }
  }, [gradeDetailQuery.data]);

  //useEffect setData from getDetail to Form

  return (
    <div className='w-full'>
      <Spin spinning={false}>
        <div className='flex flex-col w-full gap-4 px-6 mb-10'>
          <p className='text-lg font-semibold'>Thông tin lớp học</p>
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
              <Form.Item label={<span className='font-medium'>Tên cấp học</span>}>
                <Input
                  className='!h-10 !pb-1.5'
                  disabled
                  value={levelDetailQuery.data?.data.data.levelName}
                />
              </Form.Item>
              <Form.Item<GradeModel>
                label={<span className='font-medium'>Tên lớp học</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên lớp học',
                  },
                ]}
                name='gradeName'
              >
                <Input className='!h-10 !pb-1.5' />
              </Form.Item>

              <div className='flex items-center justify-end gap-4 mt-4'>
                <Form.Item>
                  <Button
                    onClick={() => {
                      navigate(MY_ROUTE.LEVEL.DETAIL(levelId!));
                    }}
                    type='primary'
                    className='!h-10 !px-5 min-w-[103px] !bg-gray-100 text-black-800 text-base font-medium !border-[#E7E5E4] shadow-md hover:!text-black-800'
                  >
                    Hủy
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={createGradeMutation.isPending || updateGradeMutation.isPending}
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

          {levelId && id && <SubjectPage levelId={levelId} gradeId={id} />}
          {/* {id && <GradesPage levelId={id} />} */}
        </div>
      </Spin>
    </div>
  );
}
