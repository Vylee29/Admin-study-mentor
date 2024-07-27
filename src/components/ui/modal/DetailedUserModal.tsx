import { DownloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Image, Modal } from 'antd';
import { Gender, Status, UserType } from '../../../+core/enums/user.enum';
import { getUserById, getUserByIdKey } from '../../../+core/services/user.service';
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

function DetailedUserModal({
  title,
  visible,
  studentId,
  onClose,
  onActivate,
  onDeactivate,
  userType,
}: StudentModalProps) {
  const getUserByIdQuery = useQuery({
    queryKey: [getUserByIdKey.all, studentId],
    queryFn: () => getUserById(studentId),
    select: (resp) => resp.data.data,
    enabled: visible, //
  });

  const isCertificates =
    userType === UserType.TUTOR &&
    Array.isArray(getUserByIdQuery?.data?.certificates) &&
    getUserByIdQuery?.data?.certificates.length > 0;

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
        getUserByIdQuery?.data?.status === Status.ACTIVE ? (
          <Button key='save' onClick={onDeactivate} className='!bg-red-600 !text-white-900'>
            Vô hiệu hóa
          </Button>
        ) : (
          <Button key='save' onClick={onActivate} className='!bg-blue-600 !text-white-900'>
            Kích hoạt
          </Button>
        ),
      ]}
    >
      <div>
        <div className='flex items-center gap-x-2'>
          {/* Avatar and full name */}
          <Image
            className='!w-10 !h-10 rounded-full object-cover'
            src={imageUtility(getUserByIdQuery?.data?.avatar?.fileKey)}
            alt='avatar'
          />
          <p className='font-semibold'>{getUserByIdQuery?.data?.fullName}</p>
        </div>
        {/* Email */}
        {getUserByIdQuery?.data?.email && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Email: </span>
            <div>{getUserByIdQuery?.data?.email}</div>
          </div>
        )}
        {/* Phone number */}
        {getUserByIdQuery?.data?.phone && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Số điện thoại: </span>
            <div>{getUserByIdQuery?.data?.phone}</div>
          </div>
        )}
        {/* Date of birth */}
        {getUserByIdQuery?.data?.dateOfBirth && (
          <div className='flex items-center mt-2 gap-x-2'>
            <span className='font-bold'>Năm sinh: </span>
            <div>{getUserByIdQuery?.data?.dateOfBirth}</div>
          </div>
        )}
        {/* Gender */}
        <div className='flex items-center mt-2 gap-x-2'>
          <span className='font-bold'>Giới tính: </span>
          <div>{getUserByIdQuery?.data?.gender === Gender.Male ? 'Nam' : 'Nữ'}</div>
        </div>
        {userType === UserType.TUTOR && (
          <>
            {/* Subjects */}
            <div className='flex items-center mt-2 gap-x-2'>
              <span className='font-bold'>Danh sách môn học đang đăng ký: </span>
              <div className='text-[#0064FF] text-sm font-semibold'>
                {Array.isArray(getUserByIdQuery?.data?.subjects) &&
                getUserByIdQuery?.data?.subjects.length > 0 ? (
                  getUserByIdQuery?.data?.subjects.map((item, index) => (
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
                {isCertificates && <span className='font-bold'>Danh sách chứng chỉ: </span>}
                {isCertificates ? (
                  getUserByIdQuery?.data?.certificates.map((file) => (
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
            {getUserByIdQuery?.data?.status === Status.ACTIVE ? (
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
