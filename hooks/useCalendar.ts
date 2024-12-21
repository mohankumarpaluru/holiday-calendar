import {useEffect, useState} from 'react'
import {holidayData} from '../lib/holidayData'

export const useCalendar = (year: number, city: string) => {
    const [months, setMonths] = useState([])
    const [holidays, setHolidays] = useState([])

    useEffect(() => {
        const generateCalendar = () => {
            const newMonths = []
            for (let month = 0; month < 12; month++) {
                const days = []
                const firstDay = new Date(year, month, 1)
                const daysInMonth = new Date(year, month + 1, 0).getDate()

                // Add empty days to align with Monday start
                const dayOfWeek = firstDay.getDay()
                const emptyDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1
                for (let i = 0; i < emptyDays; i++) {
                    days.push({date: null})
                }

                for (let day = 1; day <= daysInMonth; day++) {
                    days.push({date: new Date(year, month, day)})
                }
                newMonths.push({
                    name: new Date(year, month, 1).toLocaleString('default', {month: 'long'}),
                    days,
                })
            }
            setMonths(newMonths)
        }

        generateCalendar()

        // Set holidays from the hard-coded data
        const cityHolidays = holidayData[city] || []
        const sortedHolidays = cityHolidays.map(holiday => ({
            ...holiday,
            date: new Date(holiday.date)
        })).sort((a, b) => a.date.getTime() - b.date.getTime())
        setHolidays(sortedHolidays)
    }, [year, city])

    return {months, holidays}
}
