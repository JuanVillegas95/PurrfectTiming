export interface TimeCard{
  index: number,
  initialPositionY: number,
  top: number,
  left: number,
  width: number,
  height: number,
  name: string,
  timeStart: string,
  timeEnd: string,
  day: string,
  style: React.CSSProperties
}
export interface weeklyCalendar{
  name: string,
  timeCards: TimeCard[],
  timeStart: string,
}