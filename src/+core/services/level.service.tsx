import { api } from '../https/http';
import { BaseResp } from '../models/base.model';
import { IPaginationInfo } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export type LevelModel = {
  id?: string;
  levelName: string;
  description: string;
};

export const levelListKeys = initKeys('level-list-keys');
export const getLevelListApi = async (params: IPaginationInfo) => {
  return api.get<BaseResp<LevelModel[]>>(`api/admin/levels`, {
    params,
  });
};

export const deleteLevel = async (id: string) => {
  return api.delete<void>(`api/admin/levels/${id}`);
};

export const levelDetailKeys = initKeys('level-detail-keys');
export const getLevelDetailApi = async (id: string) => {
  return api.get<BaseResp<LevelModel>>(`api/admin/levels/${id}`);
};

export const createLevel = async (body: LevelModel) => {
  return await api.post<
    BaseResp<{
      id: string;
    }>
  >(`api/admin/levels/`, body);
};

export const updateLevel = async (body: LevelModel) => {
  return await api.patch(`api/admin/levels/${body.id}`, {
    levelName: body.levelName,
    description: body.description,
  });
};

export type GradeModel = {
  id?: string;
  gradeName: string;
};

export const gradeListKeys = initKeys('grade-list-keys');
export const getGradeListApi = async (params: IPaginationInfo, levelId: string) => {
  return api.get<BaseResp<GradeModel[]>>(`api/admin/grades/${levelId}`, {
    params,
  });
};

export const gradeDetailKeys = initKeys('grade-detail-keys');
export const getGradeDetailApi = async (id: string) => {
  return api.get<BaseResp<GradeModel>>(`api/admin/grades/detail/${id}`);
};

export const deleteGrade = async (id: string) => {
  return api.delete<void>(`api/admin/grades/${id}`);
};

export const createGrade = async (body: GradeModel) => {
  return await api.post<
    BaseResp<{
      id: string;
    }>
  >(`api/admin/grades/`, {
    gradeName: body.gradeName,
    levelId: body.id,
  });
};

export const updateGrade = async (body: GradeModel) => {
  return await api.patch(`api/admin/grades/${body.id}`, {
    gradeName: body.gradeName,
  });
};

export type SubjectModel = {
  id?: string;
  name: string;
  gradeId?: string;
  description?: string;
};

export const subjectListKeys = initKeys('subject-list-keys');
export const getSubjectListApi = async (
  params: IPaginationInfo,
  levelId: string,
  gradeId: string,
) => {
  return api.get<BaseResp<SubjectModel[]>>(`api/admin/subjects/${levelId}/${gradeId}`, {
    params,
  });
};

export const deleteSubject = async (id: string) => {
  return api.delete<void>(`api/admin/subjects/${id}`);
};

export const createSubject = async (body: SubjectModel) => {
  return await api.post(`api/admin/subjects/`, body);
};

export const updateSubject = async (body: SubjectModel) => {
  return await api.patch(`api/admin/subjects/${body.id}`, {
    name: body.name,
  });
};

export const subjectDetailKeys = initKeys('subject-detail-keys');
export const getSubjectDetailApi = async (id: string) => {
  return await api.get(`api/admin/subjects/${id}`);
};
