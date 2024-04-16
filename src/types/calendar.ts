export interface TimeCard{
  top: number,
  left: number,
  width: number,
  height: number,
  name: string,
  timeStart: string,
  timeEnd: string,
}
export interface weeklyCalendar{
  name: string,
  timeCards: TimeCard[],
  timeStart: string,
}