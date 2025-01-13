import Day from './Day'
import ShineBorder from "@/components/ui/shine-border"

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
    return isCurrentMonth ? (
        <ShineBorder
          className="backdrop-blur-sm text-card-foreground rounded-lg shadow-md"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          {content}
        </ShineBorder>
      ) : <div className="backdrop-blur-sm text-card-foreground rounded-lg shadow-md p-4">
      {content} </div>
}

export default Month
