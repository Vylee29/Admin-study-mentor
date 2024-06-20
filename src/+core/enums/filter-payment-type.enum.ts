export enum FilterPaymentType {
    ALL = 'Tất cả',
    COMPLETED = 'Hoàn tất',
    NOT_COMPLETED = 'Chưa thanh toán',
    CANCELED = 'Đã hủy',
}

export const filterPaymentOptions = Object.values(FilterPaymentType).map((e) => {
    return {
        label: e,
        value: e,
    };
});
