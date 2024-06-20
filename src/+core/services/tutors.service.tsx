import { api } from '../https/http';
import { StudentListReq } from '../models/student.model';
import { TutorTable } from '../models/tutor.model';
import { PagingResp } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export const tutorListKeys = initKeys('tutor-list-keys');
export const getTutorsListApi = async (params: StudentListReq) => {
  return api.get<PagingResp<TutorTable[]>>(`api/admin/tutors`, {
    params,
  });
};
