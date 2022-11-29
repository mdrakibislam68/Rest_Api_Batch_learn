import React, { useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";

const CountDown = ({ date }) => {
  const Completionist = () => <span>You are good to go!</span>;

  // useEffect(() => {}, [third]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="flex items-center gap-8 text-center text-[#4062FF]">
          <div className="flex flex-col font-bold text-[34px] leading-10 font-['Nunito_sans'] gap-1 ">
            <span>{zeroPad(days)}</span>
            <span className="text-2xl ">Days</span>
          </div>
          <div className="flex flex-col font-bold text-[34px] leading-10 font-['Nunito_sans'] gap-1 ">
            <span>{zeroPad(hours)}</span>
            <span className="text-2xl ">Hours</span>
          </div>
          <div className="flex flex-col font-bold text-[34px] leading-10 font-['Nunito_sans'] gap-1 ">
            <span>{zeroPad(minutes)}</span>
            <span className="text-2xl ">Min</span>
          </div>
          <div className="flex flex-col font-bold text-[34px] leading-10 font-['Nunito_sans'] gap-1 ">
            <span>{zeroPad(seconds)}</span>
            <span className="text-2xl ">Sec</span>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <span>
        <Countdown date={Date.now() + date && date} renderer={renderer} />
      </span>
    </div>
  );
};

export default CountDown;
