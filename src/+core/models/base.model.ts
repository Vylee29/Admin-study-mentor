export type BaseResp<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type BaseRespExternal<T> = {
  code: number;
  desc: string;
  data: T;
};
