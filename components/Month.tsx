import Day from './Day'
import ShineBorder from "@/components/ui/shine-border"
import { useTheme } from "next-themes";


const Month = ({ month, holidays, isCurrentMonth }: { month: any, holidays: any[], isCurrentMonth: boolean }) => {
    const content = (
        <>
            <h2 className="text-xl font-semibold mb-2">{month.name}</h2>
            <div className="grid grid-cols-7 gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium font-bold">
                        {day}
                    </div>
                ))}
                {month.days.map((day, index) => (
                    <Day
                        key={index}
                        day={day}
                        holidays={holidays}
                    />
                ))}
            </div>
        </>
    )
    const theme = useTheme();
    return isCurrentMonth ? (
        <ShineBorder
          className="backdrop-blur-sm text-card-foreground rounded-lg shadow-md"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          {content}
        </ShineBorder>
      ) : <ShineBorder className="backdrop-blur-sm text-card-foreground rounded-lg shadow-md p-4"
      color={theme.theme === "dark" ? ["#010816", "#010816", "#010816"]: ["#ffffff", "#ffffff", "#ffffff"]}>
      {content} </ShineBorder>
}

export default Month
