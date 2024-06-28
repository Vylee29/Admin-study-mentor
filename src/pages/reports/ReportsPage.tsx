import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, Table, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { OptionReport, ReportListFilter, ReportModel } from '../../+core/models/report.model';

import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns as baseColumns } from './components/columns';

import {
  convertReportListModelToTable,
  getReportListApi,
  reportListKeys,
} from '../../+core/services/user.service';
import DetailedReportModal from '../../components/ui/modal/DetailedReportModal';

export function ReportsPage() {
  const [searchParams] = useSearchParams();
  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: ReportListFilter = {
      option: (searchParams.get('option') as OptionReport) || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);
  const [visible, setVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportModel>();

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

  const handleViewDetail = (report: ReportModel) => {
    setSelectedReport(report);
    setVisible(true);
  };

  // Update the columns with action handlers
  const columns = useMemo(() => {
    return baseColumns.map((col) => {
      if (col.title === 'Action') {
        return {
          ...col,
          render: (value: any, record: ReportModel) => (
            <Tooltip placement='top' title='Xem chi tiết'>
              <Button
                type='primary'
                icon={<EyeOutlined />}
                onClick={() => handleViewDetail(record)}
              />
            </Tooltip>
          ),
        };
      }
      return col;
    });
  }, [handleViewDetail]);

  return (
    <div>
      <DetailedReportModal
        title='Chi tiết báo cáo'
        reportId={selectedReport?.reportId}
        questionId={selectedReport?.questionId}
        visible={visible}
        userType={selectedReport?.userType}
        setVisible={setVisible}
      />
      <span className='text-[24px] font-bold text-black-800'>Newest Report</span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {reportListQuery?.data?.data?.length} kết quả tìm thấy
      </div>
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
