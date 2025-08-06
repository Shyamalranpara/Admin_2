// ShiftCard.tsx
import React from 'react';

interface ShiftCardProps {
  title: string | React.ReactNode;
  value: string;
  onAddClick: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ title, value, onAddClick }) => {
  return (
    <div className="shift-card">
      <div className="shift-card-title">{title}</div>
      <div className="shift-card-value">{value || '00'}</div>
      <div className="shift-card-add">
        <a style={{ color: '#408634', cursor: 'pointer' }} onClick={onAddClick}>
          Add
        </a>
      </div>
    </div>
  );
};

export default ShiftCard;
