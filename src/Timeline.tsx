import React, { useState } from 'react';
import { Modal, Timeline as AntTimeline } from 'antd';

const TimelineModal = ({ isModalOpen, handleCancel }) => {
  return (
     <Modal
      title={<span className='font-medium text-[20px] leading-[28px]'>TFH Timeline</span>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null} 
    >
      <AntTimeline
        mode="alternate"
        items={[
          {  children: (
    <span >
      TFH 1 <br /> <span>29 JUL, 2025</span>
    </span>
  ),
  color: 'green' },
          
          { children: (
    <span >
      TFH 2 <br /> <span>28 JUL, 2025</span>
    </span>
  ),
  color: 'green'  },
          {
            children: (
    <span >
      TFH 1 <br /> <span>28 JUL, 2025</span>
    </span>
  ),
  color: 'green' 
          },
          { 
            children: (
    <span >
      TFH 2 <br /> <span>27 JUL, 2025</span>
    </span>
  ),
  color: 'green' 
           },
          { 
            children: (
    <span >
      TFH 1 <br /> <span>27 JUL, 2025</span>
    </span>
  ),
  color: 'green' 
           },
         
        ]}
      />
    </Modal>
  );
};

export default function App() {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  return (
    <div>
       <span className="font-normal text-[30px] leading-[38px]">
        last update - 21/07/2025
      </span>
      <a
        className="mx-6 font-normal text-[20px] leading-[28px] underline text-black cursor-pointer"
        onClick={() => setIsTimelineOpen(true)}
      >
        Timeline
      </a>

      <TimelineModal 
        isModalOpen={isTimelineOpen}
        handleCancel={() => setIsTimelineOpen(false)}
      />
    </div>
  );
}
