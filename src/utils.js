export const generateTimeSlots = () => {
  const timeSlots = [];
  for (let i = 9; i <= 17; i++) {
    const hour = i.toString().padStart(2, "0");
    const time = `${hour}:00`;
    timeSlots.push(time);
  }
  return timeSlots;
};

export const formatTimeTo24Hour = (time) => {
  const [hour, minute] = time.split(":");
  const newHour = parseInt(hour, 10);
  return `${newHour.toString().padStart(2, "0")}:${minute}`;
};

export const formatTimeTo12Hour = (time) => {
  const [hour, minute] = time.split(":");
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  const newHour = hourInt % 12 || 12;
  return `${newHour}:${minute} ${ampm}`;
};
