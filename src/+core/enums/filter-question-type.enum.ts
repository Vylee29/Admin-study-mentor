import { QuestionStatus } from './question.enum';

export enum FilterQuestionType {
    ALL = 'Tất cả',
    COMPLETED = 'Hoàn thành',
    NOT_COMPLETED = 'Đang xử lý',
    CANCELED = 'Đã hủy',
}

export function convertQuestionFilter(q: QuestionStatus): FilterQuestionType {
    if (q === QuestionStatus.DONE) return FilterQuestionType.COMPLETED;
    else if (
        q === QuestionStatus.NEW ||
        q === QuestionStatus.ANSWERED ||
        q === QuestionStatus.ACCEPTED
    )
        return FilterQuestionType.NOT_COMPLETED;
    else return FilterQuestionType.CANCELED;
}

export const filterQuestionOptions = Object.values(FilterQuestionType).map((e) => {
    return {
        label: e,
        value: e,
    };
});
