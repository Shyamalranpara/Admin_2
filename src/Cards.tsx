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
    <Card
      style={{
        borderRadius: 12,
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        minHeight: 180,
      }}
    >
      <p style={{ fontSize: 12, color: '#555' }}>{title}</p>
      <p style={{ fontSize: '30px', fontWeight: '500', margin: '6px 0', lineHeight: '40px' }}>
        {value}
        {unit && <span style={{ fontSize: '30px', lineHeight: '40px' }}>{unit}</span>}
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '4px 0' }} />
      {bottomText && (
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: isLink ? 'underline' : 'none',
            color: isLink ? 'green' : '#408634',
            cursor: isLink ? 'pointer' : 'default',
            margin: 0,
          }}
          onClick={onClick} 
        >
          {bottomText}
        </p>
      )}
    </Card>
  );
};

export default Cards;
