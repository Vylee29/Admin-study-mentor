import { api } from '../https/http';
import { BaseResp } from '../models/base.model';
import { GetQuestionResponseModel, QuestionListReq } from '../models/question.model';
import { PagingResp } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export const detailedQuestionKeys = initKeys('detailed-question-keys');

export const getDetailedQuestionApi = async (questionId: string) => {
  return api.get<BaseResp<GetQuestionResponseModel>>(`/api/questions/${questionId}`);
};

export const questionListKeys = initKeys('question-list-keys');
export const getQuestionListApi = async (params: QuestionListReq) => {
  return api.get<PagingResp<GetQuestionResponseModel[]>>(`api/admin/list-questions`, {
    params,
  });
};
