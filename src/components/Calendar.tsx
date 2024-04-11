"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import settingsIcon from "@/images/settings-icon.png";
import editIcon from "@/images/editIcon.png";

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

const TimeCard = ({ props }: { props: Object | null }) => {
  if (!props) return <div className="w-8 h-8 bg-green-500 absolute"></div>;
  const {top, left, width, height} = props
  return (
    <div
      style={{ width, height, top, left, backgroundColor: 'black',   position: 'absolute' }}
    ></div>
  );
};




const LayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-8/12 h-3/4 bg-white grid grid-cols-12 grid-rows-10 rounded-xl">
    {children}
  </div>
);

const Header = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (bool: boolean) => void }) => (
  <div className="col-span-12 border-b font-mona text-xl p-6">
    <div className="flex flex-row items-center">
      <h1>Name of the schedule</h1>
      <div className="flex-grow"></div>
      <Image className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block" src={editIcon.src} alt="Edit" width={25} height={25} />
      <Image className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block ml-3 " src={settingsIcon.src} alt="Settings" width={25} height={25} />
    </div>
  </div>
);

const Empty = () => <div className="col-span-1"></div>;

const DaysRow = ({ days }: { days: string[] }) => (
  <div className="col-span-11 row-span-1">
    <div className="grid grid-cols-7">
      {days.map((day: string, index: number) => (
        <div key={index} className="flex items-center justify-center min-h-[50px] font-mona text-sm mt-4">
          {day}
        </div>
      ))}
    </div>
  </div>
);

const TimeAndCells = ({ hours, timeCells, handleEventCard, timeCardProps }: { hours: string[], timeCells: string[], handleEventCard: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, timeCardProps:  Object | null}) => (
  <div className="col-span-12 row-span-9 overflow-y-auto grid grid-cols-12">
    <div className="col-span-1 m-5">
      {hours.map((hour, index) => (
        <div key={index} className={`flex items-center justify-center font-mona text-sm ${index === 0 ? "-mt-6 mb-[46px]" : "mb-12"}`}>
          {hour}
        </div>
      ))}
    </div>
    <div className="col-span-11">
      <div className="grid grid-cols-7 relative" id="cells-container">
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
                className="border border-dashed border-gray-300 p-4"
                data-value={`${dayName} ${timeSlot}`}
                onClick={(e) => handleEventCard(e)}
              ></div>
          );
        })}
        <TimeCard props={timeCardProps} />
      </div>
    </div>
  </div>
);


const SideBarContainer = () => (
  <div className="w-1/12 h-3/4 ml-5 flex flex-col">
    {buttonNames.map((text, index) => <SideBarIcon key={index} text={text} />)}
  </div>
);

const SideBarIcon = ({ text }: { text: string }) => (
  <div className="bg-white flex justify-center items-center relative h-16 w-full mt-2 mb-2 mx-auto rounded-xl">
    {text}
  </div>
);

const Calendar = () => {
  const [timeStart, setTimeStart] = useState<string>("07:00");
  const [hours, setHours] = useState<string[]>([]);
  const [timeCells, setTimeCells] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeCardProps, setTimeCardProps] = useState<Object | null>(null);

  useEffect(() => {
    setHours(generateHours(timeStart));
    setTimeCells(generateTimeCells(timeStart));
  }, [timeStart]);

  const handleEventCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const cellsContainer = document.getElementById("cells-container") as HTMLDivElement;
    const cell = document.getElementById(e.currentTarget.id) as HTMLDivElement;
    const cellsContainerProps = cellsContainer.getBoundingClientRect();
    const cellProps = cell.getBoundingClientRect();
  
    const top = cellProps.top - cellsContainerProps.top;
    const left = cellProps.left - cellsContainerProps.left;
    const width = cellProps.width;
    const height = cellProps.height;
    
    setTimeCardProps({ top:top, left:left, width:width, height:height });
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <LayoutContainer>
          <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Empty />
          <DaysRow days={daysOfWeek} />
          <TimeAndCells hours={hours} timeCells={timeCells} handleEventCard={handleEventCard} timeCardProps={timeCardProps} />
        </LayoutContainer>
        <SideBarContainer />
      </div>
    </>
  );
};

export default Calendar;