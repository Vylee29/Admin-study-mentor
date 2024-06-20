import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns } from './components/columns';
import { ReportModel } from '../../+core/models/report.model';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ResponseModal from '../../components/ui/response-modal/ResponseModal';
import React from 'react';

export function ReportsPage() {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<ReportModel | null>(null);

  const { data } = useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/admin/users/reports', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('http://localhost:3001/api/admin/report/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      console.log('DATA', data);
      return response.json();
    },
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries(['report']);
    },
  });

  const handleRowClick = (record: ReportModel) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = (sendMailModel: any) => {
    mutation.mutate(sendMailModel);
    queryClient.invalidateQueries(['report']);
    closeModal();
  };

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Newest Report</span>
      <div className='text-[16px] text-gray-500 pb-6'>{data?.data.length} results found</div>
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
      <div className='flex flex-col gap-8 p-8 rounded-md bg-white-900'>
        <Table
          rowKey={(record) => record.reportId}
          columns={columns}
          dataSource={data?.data}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: false,
            pageSize: 5,
            size: 'small',
            total: data?.data.length,
          }}
          onRow={(record: ReportModel) => ({
            onClick: () => handleRowClick(record),
          })}
        />
        <ResponseModal
          title='Feedback Form'
          visible={modalVisible}
          onClose={closeModal}
          onSave={handleSave}
          data={selectedRow}
        />
      </div>
    </div>
  );
}
