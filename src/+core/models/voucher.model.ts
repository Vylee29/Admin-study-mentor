export type VoucherModel = {
  voucherId: string;
  code: string;
  percentage: number;
  quantity: number;
  status: number;
  isDefault: boolean;
};

export type VoucherTable = {
  key: string;
  code: string;
  percentage: number;
  quantity: number;
  status: number;
  isDefault: boolean;
};
