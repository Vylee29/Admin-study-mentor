import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACTION_TITLE } from '../../+core/constants/shared.contant';
import { Status, UserType } from '../../+core/enums/user.enum';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { UserResp } from '../../+core/models/profile.model';
import { StudentListFilter } from '../../+core/models/student.model';
import { getStudentsListApi, studentListKeys } from '../../+core/services/students.service';
import { updateUserStatus } from '../../+core/services/user.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import DetailedUserModal from '../../components/ui/modal/DetailedUserModal';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import UserAction from '../../components/ui/user-action/UserAction';
import { columns as baseColumns } from './components/columns';

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
  const [visible, setVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

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

  const updateUserStatusMutation = useMutation({
    mutationFn: (status: Status) => updateUserStatus(selectedStudentId, status),
    onSuccess: () => {
      toastSuccess('Cập nhật trạng thái thành công');
    },
    onError: handleError,
    onSettled: () => {
      studentListQuery.refetch();
    },
  });

  const handleViewDetail = (student: UserResp) => {
    setSelectedStudentId(student.id);
    setVisible(true);
  };

  const handleStatusChange = (student: UserResp) => {
    setSelectedStudentId(student.id);
    updateUserStatusMutation.mutate(
      student.status === Status.ACTIVE ? Status.IN_ACTIVE : Status.ACTIVE,
    );
  };

  const handleActivateStudent = () => {
    updateUserStatusMutation.mutate(Status.ACTIVE);
    setVisible(false);
  };

  const handleDeactivateStudent = () => {
    updateUserStatusMutation.mutate(Status.IN_ACTIVE);
    setVisible(false);
  };

  // Update the columns with action handlers
  const columns = useMemo(() => {
    return baseColumns(filter, handleFilterChange).map((col) => {
      if (col.title === ACTION_TITLE) {
        return {
          ...col,
          render: (value: any, record: UserResp) => (
            <UserAction
              record={record}
              handleStatusChange={handleStatusChange}
              handleViewDetail={handleViewDetail}
            />
          ),
        };
      }
      return col;
    });
  }, [handleViewDetail, handleStatusChange, filter, handleFilterChange]);

  return (
    <div>
      <DetailedUserModal
        studentId={selectedStudentId}
        title='Thông tin chi tiết'
        visible={visible}
        onClose={() => setVisible(false)}
        onActivate={handleActivateStudent}
        onDeactivate={handleDeactivateStudent}
        userType={UserType.STUDENT}
      />
      <span className='text-[24px] font-bold text-black-800'>Student</span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {studentListQuery.data?.data.length} kết quả tìm thấy
      </div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
          onChange={(e: any) => {
            handleFilterChange({ search: e.target.value });
          }}
        />
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
