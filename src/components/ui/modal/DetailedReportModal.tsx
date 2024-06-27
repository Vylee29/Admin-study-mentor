import { Modal } from 'antd';
import { UserType } from '../../../+core/enums/user.enum';
import ReportQuestionPage from '../../../pages/reports/components/DetailedReport';

type IProps = {
  visible: boolean;
  reportId?: string;
  title: string;
  questionId?: string;
  userType?: UserType;
};

function DetailedReportModal({ title, visible, reportId, questionId, userType }: IProps) {
  return (
    <Modal open={visible} title={title} closeIcon={null} className='!w-2/3' footer={null}>
      {questionId && reportId && userType && (
        <ReportQuestionPage questionId={questionId} reportId={reportId} userType={userType} />
      )}
    </Modal>
  );
}

export default DetailedReportModal;
