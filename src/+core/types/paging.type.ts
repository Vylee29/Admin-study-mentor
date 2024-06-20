export interface IPaginationInfo {
    page: number;
    pageSize: number;
    total?: number;
    previousPage?: number | undefined;
    nextPage?: number | undefined;
    totalPages?: number;
}

export const initialPagingState: IPaginationInfo = {
    pageSize: 10,
    page: 1,
};

export type PagingResp<T> = {
    success: boolean;
    message: string;
    data: T;
    paginationInfo: IPaginationInfo;
};
