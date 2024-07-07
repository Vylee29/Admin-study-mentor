import { api } from '../https/http';
import { StudentListReq } from '../models/student.model';
import { CertificateNotApproved, TutorTable, VerifyCertificateReq } from '../models/tutor.model';
import { PagingResp } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export const tutorListKeys = initKeys('tutor-list-keys');
export const getTutorsListApi = async (params: StudentListReq) => {
  return api.get<PagingResp<TutorTable[]>>(`api/admin/tutors`, {
    params,
  });
};

export const getCertificateNotApprovedKeys = initKeys('certificate-not-approved-keys');
export const getCertificateNotApprovedApi = async (params: StudentListReq) => {
  return api.get<PagingResp<CertificateNotApproved[]>>(`api/admin/tutors/verify`, {
    params,
  });
};

export const verifyCertificateApi = async (req: VerifyCertificateReq) => {
  return api.put('api/admin/tutors/verify', req);
};
