import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Table, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACTION_TITLE } from '../../+core/constants/shared.contant';
import { TutorState } from '../../+core/enums/user.enum';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { CertificateNotApproved, VerifyCertificateReq } from '../../+core/models/tutor.model';
import {
  getCertificateNotApprovedApi,
  getCertificateNotApprovedKeys,
  verifyCertificateApi,
} from '../../+core/services/tutors.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns as baseColumns } from './components/columns';
import DetailedCertificate from './components/DetailedCertificate';

export function CertificatesPage() {
  const [searchParams] = useSearchParams();
  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: { search: string } = {
      search: searchParams.get('search') || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter<{ search: string }>({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });
  const [visible, setVisible] = useState(false);
  const [selectedCertificate, setCertificate] = useState<CertificateNotApproved>();

  const certificatesListQuery = useQuery({
    queryKey: getCertificateNotApprovedKeys.list(filter),
    queryFn: () => getCertificateNotApprovedApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data,
      };
    },
    placeholderData: keepPreviousData,
  });

  const updateCertificateStatusMutation = useMutation({
    mutationFn: (req: VerifyCertificateReq) => verifyCertificateApi(req),
    onSuccess: () => {
      console.log('onSuccess');

      toastSuccess('Cập nhật trạng thái chứng chỉ thành công');
    },
    onError: handleError,
    onSettled: () => {
      certificatesListQuery.refetch();
    },
  });

  const handleViewDetail = (cer: CertificateNotApproved) => {
    setCertificate(cer);
    setVisible(true);
  };

  const handleApproveStudent = () => {
    updateCertificateStatusMutation.mutate({
      userId: selectedCertificate?.userId || '',
      tutorState: TutorState.CERTIFICATE_APPROVED,
    });
    setVisible(false);
  };

  const handleDeclineStudent = (content: string) => {
    updateCertificateStatusMutation.mutate({
      userId: selectedCertificate?.userId || '',
      tutorState: TutorState.CERTIFICATE_REJECTED,
      content,
    });
    setVisible(false);
  };

  // Update the columns with action handlers
  const columns = useMemo(() => {
    return baseColumns.map((col) => {
      if (col.title === ACTION_TITLE) {
        return {
          ...col,
          render: (value: any, record: CertificateNotApproved) => (
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
      <DetailedCertificate
        certificate={selectedCertificate}
        visible={visible}
        setVisible={setVisible}
        onApprove={handleApproveStudent}
        onDecline={handleDeclineStudent}
        title='Chi tiết chứng chỉ'
      />
      <span className='text-[24px] font-bold text-black-800'>Xét duyệt chứng chỉ </span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {certificatesListQuery.data?.pagination?.total} kết quả tìm thấy
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
          dataSource={certificatesListQuery.data?.data || []}
          rowKey={(students) => students.userId}
          loading={certificatesListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={certificatesListQuery.data?.pagination.page || 1}
          pageSize={certificatesListQuery.data?.pagination.pageSize || 10}
          total={certificatesListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
    </div>
  );
}
