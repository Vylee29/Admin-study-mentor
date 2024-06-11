// import { FilterQuestionType, filterQuestionOptions } from '@core/enums/filter-question-type.enum';
import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns } from './components/columns';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StudentModel} from  '../../+core/models/student.model';


export function StudentsPage() {
 const [students, setStudents] = useState<StudentModel[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

 useEffect(() => {
  axios.get('http://localhost:3000/api/admin/students',{
    headers: {
          Authorization: `Bearer ${token}`,
        },
  }).then((res) => {
    if (Array.isArray(res.data.data)) {
      setStudents(res.data.data);
    } else {
      throw new Error('Invalid data format');
    }
  })
  .catch(error => {
    setError(error.message);
  });
  }, [token]);

  return (
    <div>
      <span className='text-[24px] font-bold text-black-800'>Student</span>
      <div className='text-[16px] text-gray-500 pb-6'>{students.length} results found</div>
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
          columns={columns}
          dataSource={students}
          rowKey={(students) => students.id}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: false,
            pageSize: 5,
            size: 'small',
            total: students.length,
            // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </div>
  );
}
