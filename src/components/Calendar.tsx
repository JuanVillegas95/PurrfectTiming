"use client";
import React, { useState, useEffect, useRef } from 'react';

const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const buttonNames = [
  "Print",
  "Create",
  "Compare",
  "Help",
  "Save",
  "Share",
  "Edit",
  "Delete",
  "Remove",
];

function generateHours(timeStart : string) {
  const hoursArray = [];
  let hour = parseInt(timeStart.substring(0, 2), 10);
  let minutes = parseInt(timeStart.substring(3, 5), 10);

  for (let i = 0; i < 24; i++) {
    let hourFormatted = hour < 10 ? `0${hour}` : `${hour}`;
    let minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;

    hoursArray.push(`${hourFormatted}:${minutesFormatted}`);

    hour = (hour + 1) % 24;
  }

  return hoursArray;
}


function LayoutContainer({ children }) {
  return (
    <div className="w-8/12 h-3/4 bg-white grid grid-cols-10 grid-rows-10 rounded-lg border-amber-900 border-8">
      {children}
    </div>
  );
}

function Header() {
  return (
    <div className="m-1 col-span-10 border-b font-mona text-xl p-4">
      <h1>Name of the schedule</h1>
    </div>
  );
}

function Empty() {
  return (
    <div className="m-1 col-span-1"></div>
  );
}

function DaysRow({ days }) {
  return (
    <div className="m-1 col-span-9 row-span-1">
      <div className="grid grid-cols-7">
        {days.map((day: string, index: number) => (
          <div key={index} className="flex items-center justify-center min-h-[50px] font-mona text-sm">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeColumn({ timeStart }){
  const [hours, setHours] = useState<string[]>([]);

  useEffect(() => {
    setHours(generateHours(timeStart));
  }, [timeStart]); // Regenerate hours whenever timeStart changes

  return (
    <div className="m-1 col-span-1 row-span-9 overflow-y-auto">
      {hours.map((hour, index) => (
        <div key={index} className="flex items-center justify-center min-h-[50px] font-mona text-sm">
          {hour}
        </div>
      ))}
    </div>
  );
}

function CellContainer() {
  return (
    <div className="m-1 col-span-9 row-span-9 overflow-y-auto">
      <div className="grid grid-cols-7">
        {Array.from({ length: 168 }, (_, index) => (
          <div
            key={index}
            className="border border-dashed border-gray-300 p-4"
          >
          </div>
        ))}
      </div>
    </div>
  );
}


function SideBarContainer() {
  return (
    <div className="w-1/12 h-3/4 bg-white ml-5">
      <Buttons buttonNames={buttonNames} />
    </div>
  );
}

function Buttons({ buttonNames }) {
  return (
    <ul className="border-4 border-indigo-500/100 m-1">
      {buttonNames.map((name: string, index: number) => {
        <Button name={name} />
      })}
    </ul>
  );
}

function Button({ name }) {
  return (
    <li className="w-5 h-5 rounded-full">
      {name}
    </li>
  );
}

export default function Calendar() {
  const timeStart = "02:00";
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <LayoutContainer>
          <Header />
          <Empty />
          <DaysRow days={daysOfWeek} />
          <TimeColumn timeStart={timeStart} />
          <CellContainer />
        </LayoutContainer>
        <SideBarContainer />
      </div>
    </>
  );
}