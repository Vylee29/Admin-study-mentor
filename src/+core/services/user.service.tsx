import { Status } from '../enums/user.enum';
import { api } from '../https/http';
import { BaseResp } from '../models/base.model';
import { ReportListFilter, ReportModel, ReportTable } from '../models/report.model';
import { ChartRevenueItem, FeedbackReportReq, UserModel } from '../models/user.model';
import { VoucherModel, VoucherTable } from '../models/voucher.model';
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
export const getDetailedReportApi = async (reportId: string) => {
  return api.get<PagingResp<ReportModel>>(`api/admin/users/report/${reportId}`);
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
