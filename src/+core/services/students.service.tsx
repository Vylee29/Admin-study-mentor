import { api } from '../https/http';
import { UserResp } from '../models/profile.model';
import { StudentListReq } from '../models/student.model';
import { PagingResp } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export const studentListKeys = initKeys('student-list-keys');
export const getStudentsListApi = async (params: StudentListReq) => {
  return api.get<PagingResp<UserResp[]>>(`api/admin/students`, {
    params,
  });
};
