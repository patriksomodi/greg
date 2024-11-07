import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'

export function WorkCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const startDate = new Date('2024-10-23')

  const isWorkDay = (day: Date) => {
    const daysSinceStart = Math.floor((day.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return [0, 1].includes(daysSinceStart % 4)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Munkarend Naptár</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate as any}
          className="rounded-md border"
          modifiers={{
            workDay: (day: Date) => isWorkDay(day),
          }}
          modifiersStyles={{
            workDay: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
          }}
          components={{
            DayContent: ({ date }: { date: any }) => (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span>{date.getDate()}</span>
                {isWorkDay(date) && (
                  <Badge variant="default" className="mt-1 text-[0.6rem] px-1 py-0">
                    Munkanap
                  </Badge>
                )}
              </div>
            ),
          }}
        />
        <div className="mt-4 text-center">
          <Badge variant={isWorkDay(date) ? "default" : "secondary"} className="text-sm">
            {isWorkDay(date) ? "Munkanap" : "Szabadnap"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}