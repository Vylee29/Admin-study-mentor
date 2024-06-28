import { OptionItems } from '../types/option.type';

export enum QuestionType {
  MEETING = 0,
  FILE = 1,
}

export enum QuestionStatusString {
  PENDING = 'PENDING',
  NEW = 'NEW', // tạo thành công bước 2
  ACCEPTED = 'ACCEPTED', // tạo thành công bước 3
  REJECTED = 'REJECTED', // tạo thành công bước 2
  ANSWERED = 'ANSWERED', // tạo thành công bước 3
  EXPIRED = 'EXPIRED', // tạo thành công không bước
  DONE = 'DONE', // done
}

export enum QuestionStatus {
  PENDING = 0,
  NEW = 1, // tạo thành công bước 2
  ACCEPTED = 2, // tạo thành công bước 3
  REJECTED = 3, // tạo thành công bước 2
  ANSWERED = 4, // tạo thành công bước 3
  EXPIRED = 5, // tạo thành công không bước
  DONE = 6, // done
}

export const getStepByStatus = (status: QuestionStatus): QuestionStep | null => {
  switch (status) {
    case QuestionStatus.NEW:
      return QuestionStep.TWO;
    case QuestionStatus.ACCEPTED:
      return QuestionStep.THREE;
    case QuestionStatus.REJECTED:
      return QuestionStep.TWO;
    case QuestionStatus.ANSWERED:
      return QuestionStep.FOUR;
    case QuestionStatus.DONE:
      return QuestionStep.THREE;
    default:
      return null;
  }
};

export enum QuestionStatusForTutor {
  PENDING = 'PENDING',
  NEW = 'NEW',
}

export const optionQuestionStatus: OptionItems = [
  {
    label: 'Tất cả',
    value: null,
  },
  {
    label: 'Chờ xác nhận',
    value: QuestionStatusString.PENDING,
  },
  {
    label: 'Mới',
    value: QuestionStatusString.NEW,
  },
  {
    label: 'Đã chấp nhận',
    value: QuestionStatusString.ACCEPTED,
  },
  {
    label: 'Đã từ chối',
    value: QuestionStatusString.REJECTED,
  },
  {
    label: 'Đã trả lời',
    value: QuestionStatusString.ANSWERED,
  },
  {
    label: 'Hết hạn',
    value: QuestionStatusString.EXPIRED,
  },
  {
    label: 'Hoàn thành',
    value: QuestionStatusString.DONE,
  },
];

export const optionQuestionStatusForTutor = [
  {
    label: 'Tất cả',
    value: null,
  },
  {
    label: 'Mới',
    value: QuestionStatusForTutor.NEW,
  },
  {
    label: 'Đang trả lời',
    value: QuestionStatusForTutor.PENDING,
  },
];

export enum QuestionStep {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}

export enum QuestionAcceptStatus {
  AGREE = 1,
  DECLINE = 0,
}

export enum QuestionEnum {
  GG_MEET = 0,
  FILE = 1,
}

export enum ActionType {
  USER = 'USER',
  QUESTION = 'QUESTION',
}
