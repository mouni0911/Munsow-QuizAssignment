import React, { useState, useRef, useEffect } from "react";

const QuizTimer = ({ onTimerExpired }) => {
  const intervalRef = useRef(null);
  const [time, setTime] = useState({ hours: 0, minutes: 2, seconds: 0 });

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(intervalRef.current);
          if (onTimerExpired) {
            onTimerExpired();
          }
          return prevTime;
        }

        const newTime =
          prevTime.seconds === 0
            ? prevTime.minutes === 0
              ? { hours: prevTime.hours - 1, minutes: 59, seconds: 59 }
              : {
                  hours: prevTime.hours,
                  minutes: prevTime.minutes - 1,
                  seconds: 59,
                }
            : {
                hours: prevTime.hours,
                minutes: prevTime.minutes,
                seconds: prevTime.seconds - 1,
              };

        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  //   const resetTimer = () => {
  //     stopTimer();
  //     setTime({ hours: 0, minutes: 2, seconds: 0 });
  //     startTimer();
  //   };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const isDanger = time.minutes === 0 && time.seconds >= 0;
  return (
    <div
      style={{
        textAlign: "right",
        margin: "auto",
        marginLeft: isDanger ? "50%" : "0",
        transform: isDanger ? "translateX(-100%)" : "none",
      }}
    >
      {/* <h3 style={{ color: "green" }}>Timer</h3> */}
      <h2
        style={{
          color: isDanger ? "red" : "green",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </h2>
    </div>
  );
};

export default QuizTimer;
