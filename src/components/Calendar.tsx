/* eslint-disable @next/next/no-img-element */
"use client"; // Assuming this is an experimental directive or should be removed if it's incorrect.
import React, { useState, useEffect, useRef } from "react";
import { TimeCard } from "@/types/calendar";
import { weeklyCalendar } from '@/types/calendar';

import settingsIcon from "@/images/settings-icon.png";
import editIcon from "@/images/editIcon.png";
import dragDropIcon from "@/images/drag-and-drop.png";
import bellIcon from "@/images/bell.png";
import whiteArrowIcon from "@/images/whiteArrow.png";

const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

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
  const timeCellsArray: string[] = [];
  let hour = parseInt(timeStart.substring(0, 2), 10);
  let minutes = parseInt(timeStart.substring(3, 5), 10);

  for (let i = 0; i < 48; i++) {
    timeCellsArray.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);

    minutes += 30;
    if (minutes >= 60) {
      minutes = 0;
      hour = (hour + 1) % 24;
    }
  }

  return timeCellsArray;
};

const calculateExactTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellTime: string) => {
  const cellHeight = (e.target as HTMLElement).offsetHeight;
  const relativeY = e.clientY - (e.target as HTMLElement).getBoundingClientRect().top;

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

const LayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-screen relative z-0">
    <div className="w-10/12 h-5/6 bg-white grid grid-cols-12 grid-rows-10 rounded-xl">
      {children}
    </div>
  </div>
);

const Header = ({ name }: { name: string }) => {
  return (
    <div className="col-span-12 border-b font-mona text-xl p-6 ">
      <div className="flex flex-row items-center">
        <h1>{name}</h1>
        <div className="flex-grow"></div>
        <img className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block" src={editIcon.src} alt="Edit" width={25} height={25} />
        <img className="transition-transform duration-200 hover:scale-110 cursor-pointer inline-block ml-3" src={settingsIcon.src} alt="Settings" width={25} height={25} />
      </div>
    </div>
  );
};

const Empty = () => <div className="col-span-1" />;

const DaysRow = () => (
  <div className="col-span-11 row-span-1">
    <div className="grid grid-cols-7">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="flex items-center justify-center min-h-[50px] font-mona text-sm mt-4 overflow-visible">
          {day}
        </div>
      ))}
    </div>
  </div>
);

const TimeCardContextMenu = ({ card }: { card: TimeCard }) => {
  return (
    <div className="absolute z-50 bg-slate-600 w-40 h-40 rounded-lg" style={{ left: `${card.width + 1}vw`, top: '0' }}>
      <div id="triangle"
        className="
        absolute
        top-1 -left-3
        w-0 h-0 
        border-t-[10px] border-t-transparent
        border-r-[15px] border-r-slate-600
        border-b-[10px] border-b-transparent"
      />
    </div>
  )
}


const TimeCard = ({ card, currentContextMenu }: { card: TimeCard, currentContextMenu: number }) => {

  return (
    <>
      <div className="absolute z-40 border-purple-primary bg-purple-primary bg-opacity-10 border-2 rounded-lg flex flex-col"
        style={{
          height: `${card.height}vh`,
          width: `${card.width}vw`,
          top: `${card.top}vh`,
          left: `${card.left}vw`,
        }}>
        {currentContextMenu == card.index && <TimeCardContextMenu card={card} />}
      </div>
    </>
  )
}



const TimeAndCells = ({ calendar, setCalendar }: { calendar: weeklyCalendar, setCalendar: React.Dispatch<React.SetStateAction<weeklyCalendar>> }) => {

  const [timeCards, setTimeCards] = useState<TimeCard[]>([]);
  const [timeCardIndex, setTimeCardIndex] = useState<number>(0);
  const [currentContextMenu, setCurrentContextMenu] = useState<number>(-1);
  const [currentCardCollision, setCurrentCardCollision] = useState<boolean>(false);
  const [mouse, setMouse] = useState({ isDown: false, initialPositionY: 0 });
  const hours = generateHours(calendar.timeStart);
  const timeCells = generateTimeCells(calendar.timeStart);


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellTime: string, dayName: string) => {
    setMouse({ isDown: true, initialPositionY: e.clientY });
    const cellProps = e.currentTarget.getBoundingClientRect();
    const cellsContainerProps = (document.getElementById("cells-container") as HTMLDivElement).getBoundingClientRect();
    const newTimeCard: TimeCard = {
      index: timeCardIndex,
      name: "",
      initialPositionY : e.clientY,
      top: ((e.clientY - cellsContainerProps.top) / window.innerHeight) * 100,
      left: (((cellProps.left - cellsContainerProps.left) / window.innerWidth) + .001) * 100,
      width: ((cellProps.width / window.innerWidth) - .001) * 100,
      height: 0,
      timeStart: calculateExactTime(e, cellTime),
      timeEnd: "",
      day: dayName,
      style: "gray",
    }

    setTimeCardIndex(prev => prev + 1);
    setTimeCards([...timeCards, newTimeCard]);
    setCurrentContextMenu(-1);
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellTime: string) => {
    setMouse({ isDown: false, initialPositionY: 0 });

    setTimeCards(timeCards.map((card, idx) => {
      if (idx === timeCards.length - 1) {
        return {
          ...card,
          timeEnd: calculateExactTime(e, cellTime)
        };
      }
      return card;
    }));
    setCurrentContextMenu(timeCards[timeCards.length - 1].index);
  }


    const detectCollision = (currentCard: TimeCard, otherCards: TimeCard[]) => {
      return otherCards.some(card => {
        return currentCard !== card &&
          currentCard.left < card.left + card.width &&
          currentCard.left + currentCard.width > card.left &&
          currentCard.top < card.top + card.height &&
          currentCard.top + currentCard.height > card.top;
      });
    };
    
    const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (mouse.isDown) {
        const newHeight = ((e.clientY - mouse.initialPositionY) / window.innerHeight) * 100;
        const lastCard = timeCards[timeCards.length - 1];
        const updatedCard = {
          ...lastCard,
          height: newHeight,
        };
        // Check if the new card would collide with any existing cards
        if (!detectCollision(updatedCard, timeCards.slice(0, -1))) {
          setTimeCards(timeCards.map((card, idx) => {
            if (idx === timeCards.length - 1) {
              return updatedCard;
            }
            return card;
          }));
        }
      }
    };


  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardIndex: number) => {
    e.preventDefault();
    setCurrentContextMenu(cardIndex);
  }


  return (
    <div className="col-span-12 row-span-9 overflow-y-auto grid grid-cols-12">
      <div className="col-span-1 m-5">
        {hours.map((hour, index) => (
          <div key={index} className={`flex items-center justify-center font-mona text-sm ${index === 0 ? "-mt-6 mb-[40px]" : "mb-11"}`}>
            {hour}
          </div>
        ))}
      </div>
      <div className="col-span-11">
        <div className="grid grid-cols-7 relative z-0 overflow-visible" id="cells-container"
          onMouseMove={(e) => handleOnMouseMove(e)} >
          {Array.from({ length: 7 }, (_, index) => <div key={index} className="pb-1" />)}
          {Array.from({ length: 336 }, (_, index) => {
            const dayIndex = index % 7;
            const timeIndex = Math.floor(index / 7);
            const dayName = daysOfWeek[dayIndex];
            const timeSlot = timeCells[timeIndex];
            const cellId = `${index}_${dayName}_${timeSlot}`;
            return (
              <div
                title="cell"
                key={index}
                id={cellId}
                className="border border-dashed border-gray-300 w-full h-8"
                data-value={`${dayName} ${timeSlot}`}
                onMouseUp={(e) => handleMouseUp(e, timeSlot)}
                onMouseDown={(e) => handleMouseDown(e, timeSlot, dayName)}
              />
            );
          })}
          {timeCards.map((card, index) => {
            return (
              <div key={index} onContextMenu={(e) => handleContextMenu(e, card.index)}  >
                <TimeCard card={card} currentContextMenu={currentContextMenu} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const Calendar = () => {
  const tempCalendar: weeklyCalendar = {
    name: "Monkey calendar",
    timeCards: [],
    timeStart: "7:00",
  }
  const [calendar, setCalendar] = useState<weeklyCalendar>(tempCalendar)

  return <>
    <LayoutContainer>
      <Header name={calendar.name} />
      <Empty />
      <DaysRow />
      <TimeAndCells calendar={calendar} setCalendar={setCalendar} />
    </LayoutContainer>
  </>
};


export default Calendar;
