
import React, { useState, useEffect } from 'react';

const Calendar: React.FC = () => {
    const [date, setDate] = useState(new Date());

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const month = date.getMonth();
    const year = date.getFullYear();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const renderCalendar = () => {
        const totalDays = daysInMonth(month, year);
        const startDay = firstDayOfMonth(month, year);
        const blanks = Array(startDay).fill(null);
        const days = Array.from({ length: totalDays }, (_, i) => i + 1);
        const totalSlots = [...blanks, ...days];

        return totalSlots.map((d, i) => (
            <div key={i} className={`h-20 border-r border-b border-gray-200 flex items-center justify-center ${d === today && month === currentMonth && year === currentYear ? 'bg-red-500 text-white rounded-full' : ''}`}>
                {d}
            </div>
        ));
    };
    
    const monthName = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    return (
        <div className="h-full w-full bg-white text-zinc-800 font-sf flex flex-col">
            <header className="p-4 border-b text-center">
                <h1 className="text-2xl font-bold">{monthName}</h1>
            </header>
            <div className="grid grid-cols-7 text-center font-bold text-sm text-gray-500 border-b">
                {daysOfWeek.map(day => <div key={day} className="p-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 flex-grow">
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
