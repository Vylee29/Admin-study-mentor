import { Modal } from 'antd';
import { UserType } from '../../../+core/enums/user.enum';
import ReportQuestionPage from '../../../pages/reports/components/DetailedReport';

type IProps = {
  visible: boolean;
  reportId?: string;
  title: string;
  questionId?: string;
  userType?: UserType;
  setVisible: (value: boolean) => void;
};

function DetailedReportModal({
  title,
  visible,
  reportId,
  questionId,
  userType,
  setVisible,
}: IProps) {
  return (
    <Modal
      open={visible}
      title={title}
      closeIcon={true}
      className='!w-2/3'
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {questionId && reportId && userType && (
        <ReportQuestionPage questionId={questionId} reportId={reportId} userType={userType} />
      )}
    </Modal>
  );
}

export default DetailedReportModal;
