import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookingApp from "./components/BookingApp";

function App() {
  return (
    <Router>
      <BookingApp />
    </Router>
  );
}

export default App;
