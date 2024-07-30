import { QuestionStatus } from '../enums/question.enum';

export const getQuestionStatus = (status: number) => {
  switch (status) {
    case QuestionStatus.NEW:
      return 'Mới';
    case QuestionStatus.ACCEPTED:
      return 'Đã được người hướng dẫn chấp nhận';
    case QuestionStatus.DONE:
      return 'Hoàn thành';
    case QuestionStatus.REJECTED:
      return 'Bị từ chối';
    case QuestionStatus.EXPIRED:
      return 'Hết hạn';
    case QuestionStatus.ANSWERED:
      return 'Đã được người hướng dẫn trả lời';
    default:
      return 'N/A';
  }
};
