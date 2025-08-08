import React from 'react';
import { Modal, Input } from 'antd';

interface PopupModelShiftCardProps {
  open: boolean;
  title: string;
  label: string;
  value: string; 
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const PopupModelShiftCard: React.FC<PopupModelShiftCardProps> = ({
  open,
  title,
  label,
  value,
  onChange,
  onClose,
  onSubmit,
}) => {
  const handleOk = () => {
    if (value.trim()) {
      onSubmit(value);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={
        <button
          style={{
            color: 'white',
            padding: '5px 12px',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Submit
        </button>
      }
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <label>{label}</label>
      <Input
        placeholder="Enter value"
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />
    </Modal>
  );
};

export default PopupModelShiftCard;
