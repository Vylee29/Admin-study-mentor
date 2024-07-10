import { Modal } from 'antd';
import { QuestionStatus } from '../../../+core/enums/question.enum';
import { getQuestionStatus } from '../../../+core/utilities/question.utility';
import { DetailedQuestion } from '../../../pages/questions/components/DetailedQuestion';

type IProps = {
  visible: boolean;
  title: string;
  questionId?: string;
  setVisible: (value: boolean) => void;
  status?: QuestionStatus;
};

function DetailedQuestionModal({ title, visible, questionId, setVisible, status }: IProps) {
  return (
    <Modal
      open={visible}
      title={title}
      closeIcon={true}
      className='!w-2/3'
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {questionId && <DetailedQuestion questionId={questionId} />}
      <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
        <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
        Trạng thái câu hỏi
      </div>
      {status && <div>{getQuestionStatus(status)}</div>}
    </Modal>
  );
}

export default DetailedQuestionModal;
