import { EyeOutlined, LineOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ActionType } from '../../../+core/enums/question.enum';
import { UserResp } from '../../../+core/models/profile.model';

type UserActionProps = {
  handleViewDetail: (record: UserResp) => void;
  handleStatusChange?: (record: UserResp) => void;
  record: UserResp;
  type?: ActionType;
};

function UserAction({ record, handleStatusChange, handleViewDetail, type }: UserActionProps) {
  return (
    <div className='flex gap-[15px]'>
      <Tooltip placement='top' title='Xem chi tiết'>
        <Button type='primary' icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} />
      </Tooltip>
      {record.status === 0 ? ( // Assuming 0 is ACTIVE status
        <Tooltip placement='top' title='Vô hiệu hóa'>
          <Button
            className='bg-red-500'
            icon={<LineOutlined />}
            onClick={() => handleStatusChange && handleStatusChange(record)}
          />
        </Tooltip>
      ) : (
        type === ActionType.USER && (
          <Tooltip placement='top' title='Kích hoạt'>
            <Button
              className='bg-green-500'
              icon={<PlusOutlined />}
              onClick={() => handleStatusChange && handleStatusChange(record)}
            />
          </Tooltip>
        )
      )}
    </div>
  );
}

export default UserAction;
