import React, { useState } from "react";
import {format, subMonths, addMonths, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isSameMonth, isSameDay} from "date-fns";
import "../styles/Calendar.scss";

export default function Calendar(){

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
     }
     const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
     }

    const header = () => {
        const dateFormat = "MMM yyy";
        return (
            <div className="row month">
                <i class="fas fa-chevron-left" onClick={prevMonth}></i>
                <h3>{format(currentDate, dateFormat)}</h3>
                <i class="fas fa-chevron-right" onClick={nextMonth}></i>
            </div>
           );
        };

    const daysOfWeek = () => {
        const dateFormat = "E";
        const days = [];
        let startDate = startOfWeek(currentDate);
        for (let i = 0; i < 7; i++) {
              days.push(
                <p key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </p>
              );
           }
           return <div className="days row">{days}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day)
    }

    const cells = () => {
            const monthStart = startOfMonth(currentDate);
            const monthEnd = endOfMonth(monthStart);
            const startDate = startOfWeek(monthStart);
            const endDate = endOfWeek(monthEnd);
            const dateFormat = "d";
            const rows = [];
            let days = [];
            let day = startDate;
            let formattedDate = "";

            while (day <= endDate) {
               for (let i = 0; i < 7; i++) {
               formattedDate = format(day, dateFormat);
               const day2 = day;
               days.push(
                  <div 
                   className={`cell ${!isSameMonth(day, monthStart)
                   ? "disabled" : isSameDay(day, selectedDate) 
                   ? "selected" : "" }`} 
                   key={day} 
                   onClick={() => onDateClick(day2)}
                   > 
                   <p className="number">{formattedDate}</p>
                 </div>
                 );
               day = addDays(day, 1);
              }
               rows.push(
                  <div className="row" key={day}> {days} </div>
                );
               days = [];
             }
            return <div className="body">{rows}</div>;
    }

    return (
        <div className="calendar">
            {header()}     
            {daysOfWeek()}     
            {cells()}
        </div>
    );
}