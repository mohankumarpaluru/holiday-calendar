'use client'

import { useMemo, useState } from 'react'
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from '@/lib/utils';

const Day = ({ day, holidays }) => {
    const [isHovered, setIsHovered] = useState(false)
    const { toast } = useToast()

    if (!day.date) {
        return <div className="aspect-square" />
    }

    const holiday = useMemo(() => holidays.find(
        (h) => h.date.getDate() === day.date.getDate() && h.date.getMonth() === day.date.getMonth()
    ), [holidays, day.date]);

    const isHoliday = !!holiday;
    const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

    const isToday = useMemo(() => {
        const today = new Date();
        return day.date.getDate() === today.getDate() &&
            day.date.getMonth() === today.getMonth() &&
            day.date.getFullYear() === today.getFullYear();
    }, [day.date]);

    const getHolidayColor = () => {
        if (!isHoliday) return ''
        const dayOfWeek = day.date.getDay()
        switch (dayOfWeek) {
            case 1: // Monday
            case 5: // Friday
                return 'bg-[#B2D8B2]'
            case 2: // Tuesday
            case 4: // Thursday
                return 'bg-[#A4C9E7]'
            case 3: // Wednesday
                return 'bg-[#FFE599]'
            default:
                return 'bg-gray-300' // Saturday and Sunday
        }
    }

    const handleClick = () => {
        if (holiday) {
            toast({
                title: holiday.name,
                description: `Date: ${holiday.date.toDateString()}`,
            })
        }
    }

    const content = (
        <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer ${getHolidayColor()} hover:bg-opacity-80 ${
                isWeekend && !isHoliday ? 'text-gray-400' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {day.date.getDate()}
        </div>
    );
    const theme = useTheme();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="aspect-square p-1">
                        {isToday ? (
                            <AnimatedGradientText>
                                <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          {content}
        </span>
                            </AnimatedGradientText>
                        ) : (
                            content
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{day.date.toDateString()}</p>
                    {isHoliday && <p>Holiday: {holiday.name}</p>}
                    {isWeekend && !isHoliday && <p>Weekend</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Day
