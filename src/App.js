import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import EventBookingApp from "./components/EventBookingApp";

function App() {
  const eventId = "75ea4324-cba7-46f1-8b9b-d0af40d26481"; // Use the event ID you created

  return (
    <Router>
      <EventBookingApp eventId={eventId} />
    </Router>
  );
}

export default App;
