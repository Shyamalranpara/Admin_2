import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

const DateDayJs: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onDateChange = (date: Dayjs | null, dateString: string | string[]) => {
    console.log("Dayjs object:", date);
    console.log("Formatted date:", dateString);

    setSelectedDate(date);
  };

  return (
    <div className="p-[20px]">
      <DatePicker
        onChange={onDateChange}
        value={selectedDate}
        format="DD-MM-YYYY"
        defaultValue={dayjs()}
      />

      <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY" />

      {selectedDate && (
        <p>
          Selected Date (Custom Format): {selectedDate.format("DD MMM YYYY")}
        </p>
      )}
    </div>
  );
};

export default DateDayJs;
