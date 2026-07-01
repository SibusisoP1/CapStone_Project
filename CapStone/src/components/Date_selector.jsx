import React from "react";
import Calendar from "react-calendar";
import "../App.css";

// Crucial: Import the default styling so it builds the grid structure perfectly
import "react-calendar/dist/Calendar.css";

function Date_selector({ checkIn, setCheckIn, checkOut, setCheckOut }) {
  const today = new Date();
  return (
    <div>
      <div
        className="C_container"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* 1. ALWAYS VISIBLE CHECK-IN CALENDAR */}
        <div>
          <h4 style={{ margin: "10px 0" }}>Check-In</h4>
          <div
            className="calendar_container"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "6px",
              width: "323px",
              overflow: "hidden",
            }}
          >
            <Calendar
              onChange={setCheckIn}
              value={checkIn}
              minDate={today} // Prevents picking past dates
            />
          </div>
        </div>

        {/* 2. ALWAYS VISIBLE CHECK-OUT CALENDAR */}
        <div style={{ textAlign: "center" }}>
          <h4 style={{ margin: "10px 0" }}>Check-Out</h4>
          <div
            className="calendar-container"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "6px",
              overflow: "hidden",
              width: "323px",
              opacity: checkIn ? 1 : 0.5,
            }}
          >
            <Calendar
              onChange={setCheckOut}
              value={checkOut}
              // Minimum checkout date must be at least 1 day after check-in
              minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : today}
              activeStartDate={checkIn ? checkIn : today} // Automatically snaps the grid view to match the check-in month
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Date_selector;
