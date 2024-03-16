import { Table } from 'antd';
import React from 'react';
import EditableModal from '../../components/ui/editable-modal/EditableModal';

interface Data {
  [key: string]: string;
}

const testData = [
  { id: '1', name: 'John Doe', class: '12A', subject: 'Math' },
  { id: '2', name: 'Jane Smith', class: '11B', subject: 'Physics' },
  { id: '3', name: 'Alice Johnson', class: '10C', subject: 'Chemistry' },
];

const DetailedInfoDemoPage: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  ];

  const handleRowClick = (record: Data) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = (editedData: Data) => {
    console.log('Edited Data:', editedData);
    closeModal();
  };

  return (
    <div>
      <Table
        dataSource={testData}
        columns={columns}
        rowKey='id'
        onRow={(record: Data) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <EditableModal
        title='Detail Student Information'
        visible={modalVisible}
        onClose={closeModal}
        data={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
};

export default DetailedInfoDemoPage;
