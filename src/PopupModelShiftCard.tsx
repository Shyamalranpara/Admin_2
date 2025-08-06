// PopupModel.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

interface PopupModelShiftCard {
  open: boolean;
  title: string;
  label: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const PopupModelShiftCard: React.FC<PopupModelShiftCard> = ({
  open,
  title,
  label,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleOk = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
    }
    setInputValue('');
  };

  const handleCancel = () => {
    onClose();
    setInputValue('');
  };

  useEffect(() => {
    if (open) setInputValue('');
  }, [open]);

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
     okText={
  <button style={{ backgroundColor: "#408634", color: "white", padding: "5px 12px", border: "none", borderRadius: "4px" }}>
    Submit
  </button>
}

      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <label>{label}</label>
      <Input
        placeholder="Enter value"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  );
};

export default PopupModelShiftCard;
