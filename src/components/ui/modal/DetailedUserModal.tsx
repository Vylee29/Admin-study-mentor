import { DownloadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Image, Modal } from 'antd';
import { Gender, Status, UserType } from '../../../+core/enums/user.enum';
import { getUserById } from '../../../+core/services/user.service';
import { imageUtility } from '../../../+core/utilities/image.utility';

type StudentModalProps = {
  visible: boolean;
  studentId: string;
  title: string;
  onClose: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  userType: UserType;
};

function DetailedUserModal({ title, visible, onClose, userType }: StudentModalProps) {
  const userMutation = useMutation({
    mutationFn: (id: string) => getUserById(id),
  });

  // const isCertificates =
  //   userType === UserType.TUTOR &&
  //   Array.isArray(getUserByIdQuery?.data?.certificates) &&
  //   getUserByIdQuery?.data?.certificates.length > 0;

  return (
    <Modal
      open={visible}
      title={title}
      closable={true}
      onCancel={onClose}
      closeIcon={null}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Hủy
        </Button>,
      ]}
    >
      <div>
        <div className='flex items-center gap-x-2'>
          {/* Avatar and full name */}
          <Image
            className='!w-10 !h-10 rounded-full object-cover'
            src={imageUtility(userMutation?.data?.data?.data?.avatar?.fileKey)}
            alt='avatar'
          />
          <p className='font-semibold'>{userMutation?.data?.data?.data?.fullName}</p>
        </div>
        {/* Email */}
        {userMutation?.data?.data?.data?.email && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Email: </span>
            <div>{userMutation?.data?.data?.data?.email}</div>
          </div>
        )}
        {/* Phone number */}
        {userMutation?.data?.data?.data?.phone && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Số điện thoại: </span>
            <div>{userMutation?.data?.data?.data?.phone}</div>
          </div>
        )}
        {/* Date of birth */}
        {userMutation?.data?.data?.data?.dateOfBirth && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Năm sinh: </span>
            <div>{userMutation?.data?.data?.data?.dateOfBirth}</div>
          </div>
        )}
        {/* Gender */}
        <div className='flex items-center mt-2 gap-x-2'>
          <span className='font-bold'>Giới tính: </span>
          <div>{userMutation?.data?.data?.data?.gender === Gender.Male ? 'Nam' : 'Nữ'}</div>
        </div>
        {userType === UserType.TUTOR && (
          <>
            {/* Subjects */}
            <div className='flex items-center mt-2 gap-x-2'>
              <span className='font-bold'>Danh sách môn học đang đăng ký: </span>
              <div className='text-[#0064FF] text-sm font-semibold'>
                {Array.isArray(userMutation?.data?.data?.data?.subjects) &&
                userMutation?.data?.data?.data?.subjects.length > 0 ? (
                  userMutation?.data?.data?.data?.subjects.map((item, index) => (
                    <span key={index}>{item.name},&nbsp; </span>
                  ))
                ) : (
                  <span>Không có môn học nào</span>
                )}
              </div>
            </div>
            {/* Certificates */}
            <div className='mt-2'>
              <div className='text-sm font-semibold'>
                {userMutation?.data?.data?.data?.certificates && (
                  <span className='font-bold'>Danh sách chứng chỉ: </span>
                )}
                {userMutation?.data?.data?.data?.certificates ? (
                  userMutation?.data?.data?.data?.certificates.map((file, index) => (
                    <div
                      key={file.fileKey}
                      className='flex items-center justify-between gap-1 p-4 mt-1 border border-gray-600 border-solid rounded-lg'
                    >
                      <div className='flex items-center'>
                        <div className='mx-4 font-bold truncate text-md max-w-4/5 '>
                          {file.fileName}
                        </div>
                      </div>
                      <a
                        href={imageUtility(file.fileKey)}
                        type='download'
                        className='hover:opacity-90'
                      >
                        <DownloadOutlined className='text-2xl cursor-pointer ' />
                      </a>
                    </div>
                  ))
                ) : (
                  <span>Không có chứng chỉ nào</span>
                )}
              </div>
            </div>
          </>
        )}
        {/* Status */}
        <div className='flex items-center mt-2 gap-x-2'>
          <span className='font-bold'>Trạng thái tài khoản: </span>
          <div>
            {userMutation?.data?.data?.data?.status === Status.ACTIVE ? (
              <span className='text-green-600'>Đang kích hoạt</span>
            ) : (
              <span className='text-red-600'>Vô hiệu hóa</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailedUserModal;
