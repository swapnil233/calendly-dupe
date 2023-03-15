import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={minDate}
      />
    </div>
  );
};

export default Calendar;
