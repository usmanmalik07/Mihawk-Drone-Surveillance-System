import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "./CustomCalender.css";

const CustomCalender = ({ onDateChange }) => { // Accept a prop to handle date changes
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Ensure we are comparing only the date, not the time
    return date;
  }, []); // The empty dependency array ensures this only runs once on mount

  const [selected, setSelected] = useState(today);

  // const footer = selected
  //   ? `Selected meeting timings for ${format(selected, "EEEE, MMMM do, yyyy")}`
  //   : "Pick a day for the meeting.";

  const handleDateSelect = (date) => {
    setSelected(date);
    if (onDateChange) {
      onDateChange(date); // Pass the selected date back to the parent component
    }
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleDateSelect}
      disabled={[
        { before: today }, // Disable all dates before today
        { dayOfWeek: [0, 6] } // Disable Sundays and Saturdays
      ]}
      // footer={footer}
    />
  );
};

export default CustomCalender;

