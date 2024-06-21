import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { CustomTextInput } from '../form/CustomTextInput';
import { ReportModel } from '../../../+core/models/report.model';

interface ResponseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (sendMailModel: any) => void;
  title: string;
  data: ReportModel | any;
}

const ResponseModal: React.FC<ResponseModalProps> = ({ title, visible, onClose, data, onSave }) => {
  const [feedback, setFeedback] = useState<string>('');

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  useEffect(() => {
    if (visible) {
      setFeedback('');
    }
  }, [visible]);

  const handleSave = () => {
    console.log('feedback');
    data.contentFeedback = feedback;
    const sendMailModel = {
      reportId: data?.reportId,
      fullName: data?.fullName,
      userId: data?.userId,
      questionName: data?.questionName,
      content: data?.content,
      feedback: data?.contentFeedback,
    };
    console.log(sendMailModel);
    onSave(sendMailModel);
    onClose();
  };

  const handleCancel = () => {
    setFeedback('');
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
      <Form layout='vertical'>
        <CustomTextInput
          label='Feedback Content'
          onChange={handleFeedbackChange}
          value={feedback}
        />
      </Form>
    </Modal>
  );
};

export default ResponseModal;
