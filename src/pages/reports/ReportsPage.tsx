import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { ReportListFilter } from '../../+core/models/report.model';
import {
  convertReportListModelToTable,
  getReportListApi,
  reportListKeys,
} from '../../+core/services/tutors.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns } from './components/columns';

export type ReportTable = {
  key: string;
  image: string;
  name: string;
  title: string;
  role: string;
  status: number; // 0: not yet, 1: pending, 2: done
};

export function ReportsPage() {
  const [searchParams] = useSearchParams();

  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: ReportListFilter = {
      option: searchParams.get('option') || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter<ReportListFilter>({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });

  const reportListQuery = useQuery({
    queryKey: reportListKeys.list(filter),
    queryFn: () => getReportListApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data.map(convertReportListModelToTable),
      };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Newest Report</span>
      <div className='text-[16px] text-gray-500'>120 results found</div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
        />
        <div className='flex gap-5'>
          <FilterOutlined />
          <SortAscendingOutlined />
        </div>
      </div>
      <div className='flex flex-col py-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={reportListQuery.data?.data || []}
          loading={reportListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={reportListQuery.data?.pagination.page || 1}
          pageSize={reportListQuery.data?.pagination.pageSize || 10}
          total={reportListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
    </div>
  );
}
