import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GradeModel,
  SubjectModel,
  createSubject,
  getGradeDetailApi,
  getLevelDetailApi,
  getSubjectDetailApi,
  gradeDetailKeys,
  levelDetailKeys,
  subjectDetailKeys,
  updateSubject,
} from '../../../+core/services/level.service';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';
import { MY_ROUTE } from '../../../routes/route.constant';

export default function UpsertSubjectPage() {
  //state
  const { id, levelId, gradeId } = useParams<{ id?: string; levelId: string; gradeId: string }>();

  //hooks
  const [form] = Form.useForm<GradeModel>();
  const navigate = useNavigate();

  //API
  const subjectDetailQuery = useQuery({
    queryKey: subjectDetailKeys.detail(id!),
    queryFn: () => getSubjectDetailApi(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  const gradeDetailQuery = useQuery({
    queryKey: gradeDetailKeys.detail(gradeId!),
    queryFn: () => getGradeDetailApi(gradeId!),
    enabled: !!gradeId,
    placeholderData: keepPreviousData,
  });

  const levelDetailQuery = useQuery({
    queryKey: levelDetailKeys.detail(levelId!),
    queryFn: () => getLevelDetailApi(levelId!),
    enabled: !!levelId,
    placeholderData: keepPreviousData,
  });

  //todo

  const createSubjectMutation = useMutation({
    mutationFn: (body: SubjectModel) => createSubject(body),
    onSuccess: () => {
      toastSuccess('Tạo chủ đề thành công thành công');
      navigate(-1);
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  const updateSubjectMutation = useMutation({
    mutationFn: (body: SubjectModel) => updateSubject(body),
    onSuccess: () => {
      toastSuccess('Cập nhật chủ đề thành công');
    },
    onError: handleError,
    onSettled: () => {
      navigate(-1);
    },
  });

  //handlers
  const onFinish = (values: any) => {
    if (!id) {
      const body: SubjectModel = {
        ...values,
        gradeId: gradeId,
      };
      createSubjectMutation.mutate(body);
    } else {
      const body: SubjectModel = {
        ...values,
        id: id,
      };
      updateSubjectMutation.mutate(body);
    }
  };

  useEffect(() => {
    if (subjectDetailQuery.data) {
      form.setFieldsValue(subjectDetailQuery.data.data.data);
    }
  }, [subjectDetailQuery.data]);

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
              <Form.Item label={<span className='font-medium'>Tên cấp học</span>}>
                <Input
                  className='!h-10 !pb-1.5'
                  disabled
                  value={levelDetailQuery.data?.data.data.levelName}
                />
              </Form.Item>
              <Form.Item
                label={<span className='font-medium'>Tên lớp học</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên lớp học',
                  },
                ]}
              >
                <Input
                  className='!h-10 !pb-1.5'
                  value={gradeDetailQuery.data?.data.data.gradeName}
                />
              </Form.Item>

              <Form.Item<SubjectModel>
                label={<span className='font-medium'>Tên chủ đề</span>}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên chủ đề',
                  },
                ]}
                name='name'
              >
                <Input className='!h-10 !pb-1.5' />
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
                    loading={createSubjectMutation.isPending || updateSubjectMutation.isPending}
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

          {/* {id && <GradesPage levelId={id} />} */}
        </div>
      </Spin>
    </div>
  );
}
