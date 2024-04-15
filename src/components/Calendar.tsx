"use client";
import React, { useState, useEffect } from "react";
import { timeCardProps } from "@/types/calendar";

import Image from "next/image";
import settingsIcon from "@/images/settings-icon.png";
import editIcon from "@/images/editIcon.png";
import dragDropIcon from "@/images/drag-and-drop.png"
import bellIcon from "@/images/bell.png"
import whiteArrowIcon from "@/images/whiteArrow.png"

const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const buttonNames = ["Print", "Create", "Compare", "Help", "Save", "Share", "Edit", "Delete", "Remove"];

const generateHours = (timeStart: string): string[] => {
  const hoursArray: string[] = [];
  let hour = parseInt(timeStart.substring(0, 2), 10);
  let minutes = parseInt(timeStart.substring(3, 5), 10);

  for (let i = 0; i < 24; i++) {
    let hourFormatted = hour < 10 ? `0${hour}` : `${hour}`;
    let minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
    hoursArray.push(`${hourFormatted}:${minutesFormatted}`);
    hour = (hour + 1) % 24;
  }

  return hoursArray;
};

const generateTimeCells = (timeStart: string): string[] => {
  const TimeCellsArray: string[] = [];
  let hour = parseInt(timeStart.substring(0, 2), 10);
  let minutes = parseInt(timeStart.substring(3, 5), 10);

  for (let i = 0; i < 48; i++) {
    TimeCellsArray.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);

    minutes += 30;
    if (minutes >= 60) {
      minutes = 0;
      hour = (hour + 1) % 24;
    }
  }

  return TimeCellsArray;
};




const LayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10/12 h-5/6 bg-white grid grid-cols-12 grid-rows-10 rounded-xl relative z-0 overflow-visible">
      {children}
    </div>
  </div>

);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="col-span-12 border-b font-mona text-xl p-6 relative z-0 overflow-visible">
      <div className="flex flex-row items-center">
        <h1>Name of the schedule</h1>
        <div className="flex-grow"></div>
        <Image className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block" src={editIcon.src} alt="Edit" width={25} height={25} />
        <Image className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block ml-3 " src={settingsIcon.src} alt="Settings" width={25} height={25} />
      </div>
    </div>
  );
};

const Empty = () => <div className="col-span-1 relative z-0 overflow-visible"></div>;

const DaysRow = () => (
  <div className="col-span-11 row-span-1 relative z-0 overflow-visible">
    <div className="grid grid-cols-7">
      {daysOfWeek.map((day: string, index: number) => (
        <div key={index} className="flex items-center justify-center min-h-[50px] font-mona text-sm mt-4">
          {day}
        </div>
      ))}
    </div>
  </div>
);

const TimeCard = ({ timeCardProps }) => {
  const { top, left, width, height } = timeCardProps
  return (
    <div className="absolute z-50 border-purple-primary border-2 rounded-lg" style={width, height}>
      <header className="bg-purple-primary rounded-t-md flex flex-row items-center p-2 text-white font-mona text-[10px] tracking-widest">
        <Image className=" mr-2" src={bellIcon.src} width={20} height={20} alt="drag-and-drop" />
        <span>7:00</span>
        <Image className="mx-2" src={whiteArrowIcon.src} width={20} height={30} alt="white-arrow" />
        <span>10:00</span>
      </header>
      <main className=" rounded-b-md w-full h-auto p-2">
        <div className=" bg-purple-primary opacity-10"></div>
        <span className="font-mona text-xs text-black ">Math Class</span>
        <Image className="origing-center rotate-90 absolute right-1 bottom-1 opacity-25 cursor-grab" src={dragDropIcon.src} width={10} height={10} alt="drag-and-drop" />
      </main>
    </div>
  );
};

const TimeAndCells = () => {
  const [timeStart, setTimeStart] = useState<string>("07:00");
  const [hours, setHours] = useState<string[]>([]);

  const [timeCells, setTimeCells] = useState<string[]>([]);
  // const [timeCards, setTimeCards] = useState<timeCardProps[] | null>(null);
  const [timeCardProps, setTimeCardProps] = useState<timeCardProps | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cellsContainerProps, setCellsContainerProps] = useState<{ top: number, left: number } | null>(null);

  useEffect(() => {
    setHours(generateHours(timeStart));
    setTimeCells(generateTimeCells(timeStart));
  }, [timeStart]);

  const calculateExactTime = (e, cellTime) => {
    const cellHeight = e.target.offsetHeight; // Assuming each cell has uniform height
    const relativeY = e.clientY - e.target.getBoundingClientRect().top;
    const minutesPerPixel = 30 / cellHeight;
    const minutesFromStart = Math.floor(relativeY * minutesPerPixel);

    let [hours, minutes] = cellTime.split(':').map(Number);
    minutes += minutesFromStart;
    if (minutes >= 60) {
      minutes -= 60;
      hours = (hours + 1) % 24;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e, cellTime) => {
    const exactStartTime = calculateExactTime(e, cellTime);
    console.log('Start Time:', exactStartTime);
    // Set the start time for your event creation here
  };

  const handleMouseUp = (e, cellTime) => {
    const exactEndTime = calculateExactTime(e, cellTime);
    console.log('End Time:', exactEndTime);
    // Set the end time for your event creation here
  };

  return (
    <div className="col-span-12 row-span-9 overflow-y-auto grid grid-cols-12 relative z-0 overflow-visible">
      <div className="col-span-1 m-5">
        {hours.map((hour, index) => (
          <div key={index} className={`flex items-center justify-center font-mona text-sm ${index === 0 ? "-mt-6 mb-[40px]" : "mb-11"}`}>
            {hour}
          </div>
        ))}
      </div>
      <div className="col-span-11 relative z-0 overflow-visible">
        <div className="grid grid-cols-7 relative z-0 overflow-visible" id="cells-container">
          {Array.from({ length: 7 }, (_, index) => <div key={index} className="pb-1"></div>)}
          {Array.from({ length: 336 }, (_, index) => {
            const dayIndex = index % 7;
            const timeIndex = Math.floor(index / 7);
            const dayName = daysOfWeek[dayIndex];
            const timeSlot = timeCells[timeIndex];
            const cellId = `${index}_${dayName}_${timeSlot}`;
            return (
              <div
                key={index}
                id={cellId}
                className="border border-dashed border-gray-300 w-full h-8"
                data-value={`${dayName} ${timeSlot}`}
                onMouseDown={(e) => handleMouseDown(e, timeSlot)}
                onMouseUp={(e) => handleMouseUp(e, timeSlot)}
                style={{ cursor: 'crosshair' }} 

              >
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Calendar = () => (
  <>
    <LayoutContainer>
      <Header />
      <Empty />
      <DaysRow />
      <TimeAndCells />
    </LayoutContainer>
  </>
)


export default Calendar;