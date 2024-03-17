import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { columns, mockData } from './components/columns';

export type VoucherTable = {
  key: string;
  id: string;
  code: string;
  percent: number;
  startDate: Date;
  endDate: Date;
  quantity: number;
};

export function VoucherPage() {
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
