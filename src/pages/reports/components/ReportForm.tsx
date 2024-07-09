import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { FeedbackReportInput, FeedbackReportReq } from '../../../+core/models/user.model';
import {
  feedbackReportApi,
  getDetailedReportApi,
  getDetailedReportKeys,
  reportListKeys,
} from '../../../+core/services/user.service';
import { handleError } from '../../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../../+core/utilities/toast.utility';
import { CustomTextAreaInput } from '../../../components/ui/form/CustomTextAreaInput';
import CustomSkeletonParagraph from '../../../components/ui/skeleton/CustomSkeletonParagraphProps';

type IProps = {
  reportId: string;
  setVisible: (value: boolean) => void;
};
function ReportForm({ reportId, setVisible }: IProps) {
  const [form] = Form.useForm<FeedbackReportInput>();
  const queryClient = useQueryClient();

  const detailedReportQuery = useQuery({
    queryKey: getDetailedReportKeys.list({ reportId }),
    queryFn: () => getDetailedReportApi(reportId),
    select: (data) => data?.data.data,
  });

  const feedbackReportMutation = useMutation({
    mutationFn: (req: FeedbackReportReq) => feedbackReportApi(req),
    onError: handleError,
    onSuccess: () => {
      toastSuccess('Gửi phản hồi thành công');
      setVisible(false);
      queryClient.invalidateQueries(reportListKeys.all as InvalidateQueryFilters);
    },
  });

  const handleSubmit = async (values: FeedbackReportInput) => {
    detailedReportQuery?.data &&
      feedbackReportMutation.mutate({
        reportId: detailedReportQuery?.data?.reportId,
        fullName: detailedReportQuery?.data?.fullName,
        userId: detailedReportQuery?.data?.userId,
        questionName: detailedReportQuery?.data?.questionName,
        content: detailedReportQuery?.data?.content,
        feedback: values.content,
      });
  };

  return (
    <div>
      {detailedReportQuery?.isFetching ? (
        <CustomSkeletonParagraph height={60} />
      ) : (
        <>
          <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
            Thông tin phản hồi
          </div>
          {detailedReportQuery?.data?.hasFeedback ? (
            <div>{detailedReportQuery?.data?.contentFeedback}</div>
          ) : (
            <Form
              name='ReportForm'
              onFinish={handleSubmit}
              form={form}
              //cancel

              autoComplete='off'
            >
              {/* Report content */}
              <CustomTextAreaInput<FeedbackReportInput>
                name='content'
                classNameForm='w-full'
                rows={3}
                autoFocus
                rules={[{ required: true, message: 'Vui lòng nhập nội dung báo cáo!' }]}
                placeholder='Nhập nội dung phản hồi'
                isActive={false}
              />
              <Form.Item colon={false} className='mt-8'>
                <Button type='primary' htmlType='submit' size='middle'>
                  Gửi phản hổi
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </div>
  );
}

export default ReportForm;
