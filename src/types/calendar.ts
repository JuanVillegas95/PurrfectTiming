export interface TimeCard{
  index: number,
  top: number,
  left: number,
  width: number,
  height: number,
  name: string,
  timeStart: string,
  timeEnd: string,
  style: "gray" | "purple" | "blue"| "pink"| "orange",
  day: string,
}
export interface weeklyCalendar{
  name: string,
  timeCards: TimeCard[],
  timeStart: string,
}