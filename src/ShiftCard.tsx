// ShiftCard.tsx
import React from 'react';

interface ShiftCardProps {
  title: string | React.ReactNode;
  value: string;
  onAddClick: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ title, value, onAddClick }) => {
  return (
    <div className="bg-[#ffffff] h-auto min-h-[150px] md:h-[120px] rounded-[10px] p-[12px] md:p-[16px] shadow-custom-soft border border-[#f0f0f0] flex flex-col justify-between">
      <div className="text-[10px] md:text-xs font-medium text-black mb-[6px] md:mb-[8px] uppercase">{title}</div>
      <div className="text-[24px] md:text-[32px] font-extrabold text-[#0000000] m-[6px_0] md:m-[8px_0]">{value || '00'}</div>
      <div className="text-[#408634] text-xs md:text-sm font-medium underline cursor-pointer mt-auto">
        <a className='font-normal' style={{ color: '#408634', cursor: 'pointer' }} onClick={onAddClick}>
          Add
        </a>
      </div>
    </div>
  );
};

export default ShiftCard;
