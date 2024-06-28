import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import {
  convertVoucherListModelToTable,
  getVoucherListApi,
  voucherListKeys,
} from '../../+core/services/user.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns } from './components/columns';

export function VouchersPage() {
  const [searchParams] = useSearchParams();

  const { initialPaging } = useMemo(() => {
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter({
    initialPaging,
    debounceTime: 500,
  });

  const voucherListQuery = useQuery({
    queryKey: voucherListKeys.list(filter),
    queryFn: () => getVoucherListApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data.map(convertVoucherListModelToTable),
      };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Voucher</span>
      <div className='text-[16px] text-gray-500 pb-6'>Manage your vouchers</div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
        />
      </div>
      <div className='flex flex-col py-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={voucherListQuery.data?.data || []}
          loading={voucherListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={voucherListQuery.data?.pagination.page || 1}
          pageSize={voucherListQuery.data?.pagination.pageSize || 10}
          total={voucherListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
    </div>
  );
}
