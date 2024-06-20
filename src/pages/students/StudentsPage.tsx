// import { FilterQuestionType, filterQuestionOptions } from '@core/enums/filter-question-type.enum';
import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { StudentListFilter } from '../../+core/models/student.model';
import { getStudentsListApi, studentListKeys } from '../../+core/services/students.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns } from './components/columns';

export function StudentsPage() {
  const [searchParams] = useSearchParams();

  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: StudentListFilter = {
      search: searchParams.get('search') || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter<StudentListFilter>({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });

  const studentListQuery = useQuery({
    queryKey: studentListKeys.list(filter),
    queryFn: () => getStudentsListApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data,
      };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Student</span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {studentListQuery.data?.data.length} results found
      </div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
          onChange={(e) => {
            handleFilterChange({ search: e.target.value });
          }}
        />
        <div className='flex gap-5'>
          <FilterOutlined />
          <SortAscendingOutlined />
        </div>
      </div>
      <div className='flex flex-col py-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={studentListQuery.data?.data || []}
          rowKey={(students) => students.id}
          loading={studentListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={studentListQuery.data?.pagination.page || 1}
          pageSize={studentListQuery.data?.pagination.pageSize || 10}
          total={studentListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
    </div>
  );
}
