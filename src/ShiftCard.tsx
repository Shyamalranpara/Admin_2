// ShiftCard.tsx
import React from 'react';

interface ShiftCardProps {
  title: string | React.ReactNode;
  value: string;
  onAddClick: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ title, value, onAddClick }) => {
  return (
    <div className="bg-[#ffffff] h-[120px] rounded-[10px] p-[16px] shadow-custom-soft border border-[#f0f0f0] flex flex-col justify-between">
      <div className="text-xs font-medium text-black mb-[8px] uppercase">{title}</div>
      <div className="text-[32px] font-extrabold text-[#0000000] m-[8px 0]">{value || '00'}</div>
      <div className=" text-[#408634] text-sm font-medium underline cursor-pointer mt-auto">
        <a className='font-normal' style={{ color: '#408634', cursor: 'pointer' }} onClick={onAddClick}>
          Add
        </a>
      </div>
    </div>
  );
};

export default ShiftCard;
