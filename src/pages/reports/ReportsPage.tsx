import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns, mockData } from './components/columns';

export type ReportTable = {
  key: string;
  image: string;
  name: string;
  title: string;
  role: string;
  status: number; // 0: not yet, 1: pending, 2: done
};

export function ReportsPage() {
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
      <div className='flex flex-col gap-8 p-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={mockData}
          //centered pagination
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: false,
            pageSize: 5,
            size: 'small',
            total: 50,
            // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </div>
  );
}
