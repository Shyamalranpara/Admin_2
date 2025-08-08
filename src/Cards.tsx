// Cards.tsx
import React from 'react';
import { Card } from 'antd';

interface CardsProps {
  title: React.ReactNode;
  value: string | number;
  unit?: string;
  bottomText?: string;
  isLink?: boolean;
  onClick?: () => void; 
}

const Cards: React.FC<CardsProps> = ({
  title,
  value,
  unit,
  bottomText,
  isLink,
  onClick,
}) => {
  return (
    <Card className='rounded-[12px] w-full shadow-[0_2px_8px_rgba(0,0,0,0.05)] min-h-[180px]' >
      <p className='text-[12px] text-[#555]'>{title}</p>
      <p className='text-[30px] font-medium m-[6px 0] leading-[40px]' >
        {value}
        {unit && <span className='text-[30px] leading-[40px]'>{unit}</span>}
      </p>
      <hr className=' mt-4 border-t border-[#eee] my-[4px]' />
      {bottomText && (
       <p
  className={`text-[14px] font-medium m-0 ${
    isLink ? 'underline text-green-600 cursor-pointer' : 'text-slate-500 cursor-default '
  }`}
          onClick={onClick} 
>
        
          {bottomText}
        </p>
      )}
    </Card>
  );
};

export default Cards;
