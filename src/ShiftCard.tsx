import React, { useState } from 'react';

interface ShiftCardProps {
  title: string;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ title }) => {


  return (
    <div className="shift-card">
      <div className="shift-card-title">{title}</div>
      <div className="shift-card-value">00</div>

 <div className="shift-card-add">

  <a style={{color:"#408634"}} href="#">Add</a>

     </div>
      
    </div>
    
  );
};

export default ShiftCard;
