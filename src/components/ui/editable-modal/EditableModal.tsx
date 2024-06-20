import { Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface Data {
  [key: string]: string | string[];
}

interface EditableModalProps {
  visible: boolean;
  onClose: () => void;
  data: Data | null;
  onSave: (editedData: Data) => void;
  onDelete: (id: any) => void;
  title: string;
}

const EditableModal: React.FC<EditableModalProps> = ({
  title,
  visible,
  onClose,
  data,
  onSave,
  onDelete,
}) => {
  const [editedData, setEditedData] = useState<Data | null>(null);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (key: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: Array.isArray(prev ? prev[key] : false)
        ? value.split(',').map((item) => item.trim())
        : value,
    }));
  };

  const handleSave = () => {
    if (editedData) {
      onSave(editedData);
      onClose();
    }
  };

  const handleCancel = () => {
    setEditedData(data);
    onClose();
  };

  const handleDelete = () => {
    onDelete(data.voucherId);
    onClose();
  };

  const renderValue = (key: string) => {
    const value = editedData ? editedData[key] : '';
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
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
        <Button key='delete' onClick={handleDelete} danger>
          Xóa
        </Button>,
      ]}
      title={title}
    >
      {editedData && (
        <>
          {Object.keys(editedData).map((key) => (
            <div key={key} className='mb-2'>
              <label className='text-lg font-semibold'>{key}</label>
              <Input.TextArea
                value={renderValue(key)}
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
