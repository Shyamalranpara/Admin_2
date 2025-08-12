import React, { useState } from 'react';
import { DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';

interface PopupModelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
  label?: string;
placeholder?: string;
 defaultValue?: string;
}

const PopupModel: React.FC<PopupModelProps> = ({
   open,
  onClose,
  onSubmit,
  title,
  label,
  placeholder = 'Enter',
  defaultValue = ''
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
   React.useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue, open]);

  const handleOk = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Modal
      className="w-[500px] h-[230px]"
      title={
        <span className='text-[20px font-normal leading-[28px]' >
          {title}
        </span>
      }
      open={open}
      onOk={handleOk}
      okText="Submit"
      onCancel={onClose}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className=" flex justify-end items-center">
        <h1>
                                          <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY"/>
          
        </h1>
      </div>

      <div className=" leading-[40px]">
        <label>
          <span className='text-[18px] leading-[22px] font-normal' >
            {label}
          </span>
          <br />
          <input
          className="w-full border border-[#D9D9D9] px-[5px] py-[2px] rounded-[6px]"
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
