import Day from './Day'

const Month = ({month, holidays}) => {
    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
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
        </div>
    )
}

export default Month
