import { api } from '../https/http';
import { BaseResp } from '../models/base.model';
import { GetQuestionResponseModel } from '../models/question.model';
import { initKeys } from '../utilities/query-key.utility';

export const detailedQuestionKeys = initKeys('detailed-question-keys');

export const getDetailedQuestionApi = async (questionId: string) => {
  return api.get<BaseResp<GetQuestionResponseModel>>(`/api/questions/${questionId}`);
};
