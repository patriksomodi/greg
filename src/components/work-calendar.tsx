import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function WorkCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendar, setCalendar] = useState<Array<{ date: Date; works: boolean | null }>>([])

  const startDate = new Date('2024-10-23 00:00')

  useEffect(() => {
    generateCalendar(currentDate)
  }, [currentDate])

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const calendarDays = []

    // Add empty slots for days before the 1st of the month
    for (let i = 1; i < firstDayOfMonth; i++) {
      calendarDays.push({ date: new Date(year, month, i - firstDayOfMonth + 1), works: null })
    }

    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      console.log(i, currentDate, startDate)
      const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      const cycleDay = ((daysSinceStart % 4) + 4) % 4 // Ensure positive result
      const works = cycleDay < 2 // Work on the first two days of each 4-day cycle
      calendarDays.push({ date: currentDate, works })
    }

    setCalendar(calendarDays)
  }

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + increment)
      return newDate
    })
  }

  const daysOfWeek = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', "V"]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Greg naptár</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-bold">
            {currentDate.toLocaleString('hu-HU', { month: 'long', year: 'numeric' })}
          </span>
          <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-bold">{day}</div>
          ))}
          {calendar.map((day, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="text-center p-2">
              {day.works !== null ? (
                <>
                  <span className={`${day.date.toDateString() === new Date().toDateString() ? 'font-bold' : ''}`}>
                    {day.date.getDate()}
                  </span>
                  <Badge
                    variant={day.works ? "default" : "secondary"}
                    className="ml-1 text-xs"
                  >
                    {day.works ? "W" : ""}
                  </Badge>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}