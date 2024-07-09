'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useState } from 'react';
import { CertificateNotApproved } from '../../../+core/models/tutor.model';
import { imageUtility } from '../../../+core/utilities/image.utility';

function DetailedCertificate({
  certificate,
  visible,
  setVisible,
  onApprove,
  onDecline,
  title,
}: {
  certificate?: CertificateNotApproved;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onApprove: () => void;
  onDecline: (content: string) => void;
  title: string;
}) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');

  const handleDecline = () => {
    if (showInput) {
      onDecline(input);
    } else setShowInput(true);
  };

  return (
    <Modal
      width={700}
      open={visible}
      title={title}
      closable={true}
      onCancel={() => setVisible(false)}
      afterClose={() => setShowInput(false)}
      closeIcon={null}
      footer={[
        <Button key='cancel' onClick={() => setVisible(false)}>
          Hủy
        </Button>,
        <>
          <Button key='save' onClick={handleDecline} className='!bg-red-600 !text-white-900'>
            {showInput ? 'Từ chối' : 'Nhập lý do từ chối'}
          </Button>
          {!showInput && (
            <Button key='save' onClick={onApprove} className='!bg-blue-600 !text-white-900'>
              Duyệt
            </Button>
          )}
        </>,
      ]}
    >
      <div className='w-full'>
        <div className='w-full flex flex-col gap-2'>
          {/* Full name */}
          <div className='flex items-center gap-x-2'>
            <span className='font-bold'>Tên người hướng dẫn: </span>
            <div>{certificate?.fullName}</div>
          </div>
          {/* Email */}
          <div className='flex items-center gap-x-2'>
            <span className='font-bold'>Email: </span>
            <div>{certificate?.email}</div>
          </div>
          {/* Subjects */}
          <div className='flex items-center gap-x-2'>
            <span className='font-bold'>Danh sách môn học đang đăng ký: </span>
            <div className='text-[#0064FF] text-sm font-semibold'>
              {Array.isArray(certificate?.subjectIds) && certificate?.subjectIds.length > 0 ? (
                certificate?.subjectIds.map((item, index) => (
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
              <span className='font-bold'>Danh sách chứng chỉ: </span>
              {Array.isArray(certificate?.certificates) && certificate?.certificates.length > 0 ? (
                certificate?.certificates.map((file, index) => (
                  <div
                    key={file.fileKey}
                    className='flex border rounded-lg border-gray-600 border-solid mt-1 items-center justify-between p-4 gap-1'
                  >
                    <div className='flex items-center'>
                      <div className='font-bold text-md mx-4 max-w-4/5 truncate '>
                        {file.fileName}
                      </div>
                    </div>
                    <a
                      href={imageUtility(file.fileKey)}
                      type='download'
                      className='hover:opacity-90'
                    >
                      <DownloadOutlined className=' text-2xl cursor-pointer' />
                    </a>
                  </div>
                ))
              ) : (
                <span>Không có chứng chỉ nào</span>
              )}
            </div>
          </div>
        </div>
        {showInput && (
          <div className='mt-2'>
            <div className='font-bold mb-1'>Nhập lý do từ chối: </div>
            <TextArea
              value={input}
              rows={4}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default DetailedCertificate;
