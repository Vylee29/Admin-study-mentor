import { Pagination } from 'antd';
import { IPaginationInfo, initialPagingState } from '../../../+core/types/paging.type';

export const PaginationCore = ({
  total,
  pageSize,
  current,
  onPageNumberChange,
}: {
  total?: number;
  pageSize?: number;
  current?: number;
  onPageNumberChange?: ({ page, pageSize }: IPaginationInfo) => void;
}) => {
  const handlePageChange = (page: number, pageSize: number) => {
    onPageNumberChange && onPageNumberChange({ page, pageSize });
  };

  return (
    <div className='flex justify-center pb-2'>
      <Pagination
        defaultCurrent={1}
        total={total}
        className='flex justify-center py-4'
        onChange={handlePageChange}
        pageSize={pageSize || initialPagingState.pageSize}
        current={current || initialPagingState.page}
      />
    </div>
  );
};
