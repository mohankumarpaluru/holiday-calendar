'use client'

import {GeistMono} from 'geist/font/mono'
import {useMemo, useState} from 'react'
import {useTheme} from 'next-themes'
import {useCalendar} from '../hooks/useCalendar'
import Month from './Month'
import {Button} from "@/components/ui/button"
import {Moon, Sun} from "lucide-react" // Import GitHub icon
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {holidayData} from '../lib/holidayData'

type City = keyof typeof holidayData;

const Calendar = () => {
    const [selectedCity, setSelectedCity] = useState<City>(Object.keys(holidayData)[0] as City);
    const [view, setView] = useState<'calendar' | 'list'>('calendar')
    const {months, holidays} = useCalendar(2025, selectedCity)
    const cities = useMemo(() => Object.keys(holidayData), [])

    const {setTheme, theme} = useTheme()

    const getHolidayColor = (date: Date) => {
        const dayOfWeek = date.getDay()
        switch (dayOfWeek) {
            case 1: // Monday
            case 5: // Friday
                return 'bg-[#B2D8B2] bg-opacity-50'
            case 2: // Tuesday
            case 4: // Thursday
                return 'bg-[#A4C9E7] bg-opacity-50'
            case 3: // Wednesday
                return 'bg-[#FFE599] bg-opacity-50'
            default:
                return 'bg-gray-100' // Saturday and Sunday
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">ACN 2025 Holiday Calendar</h1>
                <div className="flex items-center space-x-4">
                    <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a city"/>
                        </SelectTrigger>
                        <SelectContent className={`${GeistMono.className}`}>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}
                    >
                        {view === 'calendar' ? 'List View' : 'Calendar View'}
                    </Button>

                    {/* Theme toggle button */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-[1.2rem] w-[1.2rem]"/>
                        ) : (
                            <Moon className="h-[1.2rem] w-[1.2rem]"/>
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* GitHub link button */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open('https://github.com/mohankumarpaluru/holiday-calendar', '_blank')}
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[1.5rem] w-[1.5rem]">
                            <title>GitHub</title>
                            <path
                                fill="currentColor"
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>

                        <span className="sr-only">Go to GitHub</span>
                    </Button>
                </div>
            </div>

            {view === 'calendar' ? (
                <>
                    <div className="flex flex-wrap justify-center space-x-4 mb-6">
                        <div className="flex items-center mb-2">
                            <div className="w-4 h-4 bg-[#B2D8B2] rounded-md mr-2"></div>
                            <span>Long Weekend</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="w-4 h-4 bg-[#A4C9E7] rounded-md mr-2"></div>
                            <span>Magic 1 for 4</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="w-4 h-4 bg-[#FFE599] rounded-md mr-2"></div>
                            <span>Midweek Break</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {months.map((month) => (
                            <Month key={month.name} month={month} holidays={holidays}/>
                        ))}
                    </div>
                </>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Holidays in {selectedCity} - 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold">Date</TableHead>
                                        <TableHead className="font-semibold">Day</TableHead>
                                        <TableHead className="font-semibold">Holiday Name</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {holidays.map((holiday, index) => (
                                        <TableRow key={index}
                                                  className={`${getHolidayColor(holiday.date)} transition-colors hover:bg-muted/50`}>
                                            <TableCell
                                                className="font-medium">{holiday.date.toLocaleDateString()}</TableCell>
                                            <TableCell>{holiday.date.toLocaleDateString('en-US', {weekday: 'long'})}</TableCell>
                                            <TableCell>{holiday.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Calendar
