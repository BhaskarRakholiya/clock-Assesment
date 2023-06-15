import "../style/Clock.css";

import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";

const Clock = () => {
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editedTime, setEditedTime] = useState("");

  const handleInputChange = (e) => {
    setEditedTime(e.target.value);
  };

  const handleDate = () => {
    if (time.seconds < 59) {
      return setTime((prev) => ({
        ...prev,
        seconds: prev.seconds + 1,
      }));
    }
    return setTime((prev) => ({
      ...prev,
      minutes: prev.minutes + 1,
      seconds: 0,
    }));
  };

  useEffect(() => {
    const clockInterval = setTimeout(handleDate, 1000);
    return () => {
      clearTimeout(clockInterval);
    };
  }, [time]);

  const handleEdit = () => {
    setEditMode(true);
    let currentClockTime = time.minutes + ":" + time.seconds;
    setEditedTime(currentClockTime);
  };

  const handleSave = (e) => {
    if (e.keyCode === 13) {
      const [minutes, seconds] = editedTime.split(":");
      setTime({ minutes: parseInt(minutes), seconds: parseInt(seconds) });
      setEditMode(false);
    }
  };

  const { minutes, seconds } = time;
  const secondsStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  };
  const minutesStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };

  // const handleDrag = (e, position, handType) => {
  //   const { x, y } = position;
  //   const radius = 100;
  //   const centerX = 150;
  //   const centerY = 150;

  //   const angle = Math.atan2(y - centerY, x - centerX);
  //   const distance = Math.sqrt(
  //     Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  //   );

  //   if (distance <= radius) {
  //     const degrees = (angle * 180) / Math.PI;
  //     const updatedTime = getTimeFromDegrees(degrees, handType);

  //     setTime(updatedTime);
  //   }
  // };

  // const getTimeFromDegrees = (degrees, handType) => {
  //   let totalSeconds = Math.round((degrees / 360) * 43200);

  //   if (handType === "minute") {
  //     totalSeconds = Math.round((degrees / 6) * 60);
  //   }
  //   updatedTime.setSeconds(totalSeconds);
  //   return updatedTime;
  // };

  return (
    <div className="clock">
      <h3>clock</h3>
      <div className="analog-clock">
        {/* <Draggable
          bounds="parent"
          onDrag={(e, position) => handleDrag(e, position, "minutes")}
          position={{ x: 0, y: 0 }}
          axis="both"
          scale={1}
        > */}
        <div className="dial minutes" style={minutesStyle} />
        {/* </Draggable> */}
        <div className="dial seconds" style={secondsStyle} />
      </div>
      {!editMode ? (
        <div className="digital-clock" onClick={handleEdit}>
          {minutes}:{seconds}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={editedTime}
            onChange={handleInputChange}
            onKeyDown={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default Clock;
