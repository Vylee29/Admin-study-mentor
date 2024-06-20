import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns } from './components/columns';
import { VoucherModel } from '../../+core/models/voucher.model';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import EditableModal from '../../components/ui/editable-modal/EditableModal';

export function VouchersPage() {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any | null>(null);

  const { data } = useQuery({
    queryKey: ['voucher'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/admin/manage/voucher', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('http://localhost:3001/api/admin/manage/voucher', {
        method: 'PUT',
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
      queryClient.invalidateQueries(['voucher']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (voucherId: string) => {
      const response = await fetch(`http://localhost:3001/api/admin/manage/voucher/${voucherId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      console.log('Delete successful');
      queryClient.invalidateQueries(['voucher']);
    },
  });

  const handleDelete = (voucherId: string) => {
    deleteMutation.mutate(voucherId);
    queryClient.invalidateQueries(['voucher']);
    closeModal();
  };

  const handleRowClick = (record: any) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = (voucher: any) => {
    mutation.mutate(voucher);
    queryClient.invalidateQueries(['voucher']);
    closeModal();
  };

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
        <div className='flex gap-5'>
          <FilterOutlined />
          <SortAscendingOutlined />
        </div>
      </div>
      <div className='flex flex-col gap-8 p-8 rounded-md bg-white-900'>
        <Table
          rowKey={(data) => data.voucherId}
          columns={columns}
          dataSource={data?.data}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: false,
            pageSize: 5,
            size: 'small',
            total: 50,
          }}
          onRow={(record: any) => ({
            onClick: () => handleRowClick(record),
          })}
        />
        {selectedRow && (
          <EditableModal
            title='Detail Voucher'
            visible={modalVisible}
            onClose={closeModal}
            data={selectedRow}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
