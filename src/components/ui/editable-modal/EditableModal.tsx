import { Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface Data {
  [key: string]: string;
}

interface EditableModalProps {
  visible: boolean;
  onClose: () => void;
  data: Data | null;
  onSave: (editedData: Data) => void;
  title: string;
}

const EditableModal: React.FC<EditableModalProps> = ({ title, visible, onClose, data, onSave }) => {
  const [editedData, setEditedData] = useState<Data | null>(null);
  const [tempData, setTempData] = useState<Data | null>(null);

  useEffect(() => {
    setEditedData(data);
    setTempData(data);
  }, [data]);

  const handleChange = (field: string, value: string) => {
    if (tempData) {
      setTempData({ ...tempData, [field]: value });
    }
  };

  const handleSave = () => {
    if (tempData) {
      onSave(tempData);
      onClose();
    }
  };

  const handleCancel = () => {
    setTempData(editedData); // Restore original data
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key='save' onClick={handleSave} className='!bg-blue-600 !text-white-900'>
          Lưu
        </Button>,
      ]}
      title={title}
    >
      {tempData && (
        <>
          {Object.keys(tempData).map((key) => (
            <div key={key} className='mb-2'>
              <label className='font-semibold text-lg'>{key}</label>
              <Input.TextArea
                value={tempData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                autoSize={{ minRows: 1 }}
              />
            </div>
          ))}
        </>
      )}
    </Modal>
  );
};

export default EditableModal;
