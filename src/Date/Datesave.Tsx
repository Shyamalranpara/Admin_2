import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const Datesave: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);


  useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      setSelectedDate(dayjs(savedDate));
    }
  }, []);

  const handleChange = (date: any) => {
    setSelectedDate(date);
    if (date) {
      localStorage.setItem("selectedDate", date.format("YYYY-MM-DD"));
    } else {
      localStorage.removeItem("selectedDate");
    }
  };

  return (
    <DatePicker
      value={selectedDate}
      onChange={handleChange}
      format="YYYY-MM-DD"
    />
  );
};

export default Datesave;
