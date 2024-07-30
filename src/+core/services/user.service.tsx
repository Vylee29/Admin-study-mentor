import { Status } from '../enums/user.enum';
import { api } from '../https/http';
import { BaseResp, BaseRespExternal } from '../models/base.model';
import {
  BankItemResp,
  BankModel,
  LookUpBankNumberReq,
  LookUpBankNumberResp,
  QRCodeReq,
  QRCodeResp,
} from '../models/profile.model';
import { OptionReport, ReportListFilter, ReportModel, ReportTable } from '../models/report.model';
import { ChartRevenueItem, FeedbackReportReq, UserModel } from '../models/user.model';
import {
  CreateVoucherReq,
  UpdateVoucherReq,
  VoucherModel,
  VoucherTable,
} from '../models/voucher.model';
import { IPaginationInfo, PagingResp } from '../types/paging.type';
import { initKeys } from '../utilities/query-key.utility';

export const getUserByIdKey = initKeys('user-by-id');
export const getUserById = async (id: string) => {
  return await api.get<BaseResp<UserModel>>(`/api/users/${id}`);
};

export const updateUserStatus = async (id: string, status: Status) => {
  return await api.patch(`/api/admin/users/${id}`, {
    status,
  });
};

export const reportListKeys = initKeys('tutor-list-keys');
export const getReportListApi = async (params: ReportListFilter & IPaginationInfo) => {
  return api.get<PagingResp<ReportModel[]>>(`api/admin/users/reports`, {
    params,
  });
};

export function convertReportListModelToTable(r: ReportModel): ReportTable {
  return {
    key: r.reportId,
    ...r,
  };
}

export const voucherListKeys = initKeys('tutor-list-keys');
export const getVoucherListApi = async (params: IPaginationInfo) => {
  return api.get<PagingResp<VoucherModel[]>>(`api/admin/manage/voucher`, {
    params,
  });
};

export function convertVoucherListModelToTable(r: VoucherModel): VoucherTable {
  return {
    key: r.voucherId,
    ...r,
  };
}

export const getDetailedReportKeys = initKeys('detailed-report-keys');
export const getDetailedReportApi = async (reportId: string, params?: { option: OptionReport }) => {
  return api.get<PagingResp<ReportModel>>(`api/admin/users/report/${reportId}`, { params });
};

export const feedbackReportApi = async (req: FeedbackReportReq) => {
  return api.post('api/admin/report/feedback', req);
};

export const getChartRevenueKeys = initKeys('get-chart-revenue-keys');

export const getChartRevenueApi = async (days: number) => {
  return api.get<BaseResp<ChartRevenueItem[]>>(`api/admin/chart/system-income`, {
    params: { option: days },
  });
};

export const deleteVoucher = async (id: string) => {
  return await api.delete(`/api/admin/manage/voucher/${id}`);
};

export const createVoucher = async (body: CreateVoucherReq) => {
  return await api.post(`/api/admin/manage/voucher`, body);
};

export const updateVoucher = async (body: UpdateVoucherReq) => {
  return await api.put(`/api/admin/manage/voucher`, body);
};

export const getBankListKeys = initKeys('get-bank-list-keys');

export const getBankListApi = async () => {
  return api.get<BaseRespExternal<BankItemResp[]>>(`https://api.vietqr.io/v2/banks`, {
    needsAuth: true,
  } as any & { needsAuth?: boolean });
};

export const lookUpBankNumberApi = async (request: LookUpBankNumberReq) => {
  return api.post<BaseRespExternal<LookUpBankNumberResp>>(
    `https://api.vietqr.io/v2/lookup`,
    request,
    {
      vietQRAuth: true,
    } as any & { vietQRAuth?: boolean },
  );
};

export const createQRCodeApi = async (data: QRCodeReq) => {
  return api.post<BaseRespExternal<QRCodeResp>>(`https://api.vietqr.io/v2/generate`, data, {
    vietQRAuth: true,
  } as any & { vietQRAuth?: boolean });
};

export const getTutorBankInfoKeys = initKeys('get-tutor-bank-info-keys');

export const getTutorBankInfoApi = async () => {
  return api.get<BaseResp<BankModel>>(`api/users/tutor/bank`);
};

export const updateTutorialBankInfoApi = async (data: BankModel) => {
  return api.put<void>(`api/users/tutor/bank`, data);
};

export type MarkPayReq = {
  tutorId: string;
  questionId: string;
};

export const markPaymentTutor = async (body: MarkPayReq) => {
  return await api.post(`/api/admin/tutor/mark-paid`, body);
};

export const getBankingInfo = async (tutorId: string) => {
  return await api.get<BaseResp<BankModel>>(`api/users/${tutorId}/banking`);
};
