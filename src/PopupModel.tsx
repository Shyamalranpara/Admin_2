import React, { useState } from 'react';
import { DatePicker, Modal } from 'antd';
import './PopupModel.css';

interface PopupModelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
  label?: string;
placeholder?: string;
}

const PopupModel: React.FC<PopupModelProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  label,
  placeholder = 'Enter',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleOk = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Modal
      className="Modal-popup"
      title={
        <span style={{ fontSize: '20px', fontWeight: '500', lineHeight: '28px' }}>
          {title}
        </span>
      }
      open={open}
      onOk={handleOk}
      okText="Submit"
      onCancel={onClose}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="popup-model">
        <h1>
          <DatePicker />
        </h1>
      </div>

      <div className="popup-model-2">
        <label>
          <span style={{ fontSize: '18px', lineHeight: '22px', fontWeight: '400' }}>
            {label}
          </span>
          <br />
          <input
            style={{
              width: '100%',
              border: '1px solid #D9D9D9',
              padding: '12px 5px',
              borderRadius: '6px',
            }}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
      </div>
    </Modal>
  );
};

export default PopupModel;
