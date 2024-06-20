import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns } from './components/columns';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TutorModel } from '../../+core/models/tutor.model';

export function TutorsPage() {
  const [tutors, setTutors] = useState<TutorModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [search, setSearch] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<TutorModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/admin/tutors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: search,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setTutors(res.data.data);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [token, search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRowClick = (record: TutorModel) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = (editedData: TutorModel) => {
    console.log('Edited Data:', editedData);
    closeModal();
  };

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Tutor</span>
      <div className='text-[16px] text-gray-500 pb-6'>{tutors.length} results found</div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
          onChange={handleSearch}
        />
        <div className='flex gap-5'>
          <FilterOutlined />
          <SortAscendingOutlined />
        </div>
      </div>
      <div className='flex flex-col gap-8 p-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={tutors}
          rowKey={(tutors) => tutors.id}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: false,
            pageSize: 5,
            size: 'small',
            total: tutors.length,
            // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          onRow={(record: TutorModel) => {
            return {
              onClick: () => {
                handleRowClick(record);
              },
            };
          }}
        />
      </div>
    </div>
  );
}
