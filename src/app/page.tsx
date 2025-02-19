"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// putt result and timestamp
type PuttLog = {
  result: string  // the result of the putt (made, missed, etc.)
  timestamp: Date // the timestamp of when the putt was recorded
}

export default function PuttingTracker() {
  //   total putts, made putts, selected putt result, and putt log
  const [totalPutts, setTotalPutts] = useState(0)
  const [madePutts, setMadePutts] = useState(0)
  const [currentPuttResult, setCurrentPuttResult] = useState("")
  const [puttLog, setPuttLog] = useState<PuttLog[]>([])

  // function to handle recording a putt
  const handlePutt = () => {
    // alert if nothing is selected
    if (!currentPuttResult) {
      alert("Please select a putt result before recording.")
      return
    }

    // update the total putts
    setTotalPutts((prev) => prev + 1)
    
    if (currentPuttResult === "made") {
      setMadePutts((prev) => prev + 1) // increase makes
    }

    // add the new putt to the log
    setPuttLog((prev) => [{ result: currentPuttResult, timestamp: new Date() }, ...prev.slice(0, 9)])
    // reset the selected putt result after click
    setCurrentPuttResult("")
  }

  // putting accuracy percentage yes
  const accuracy = totalPutts > 0 ? ((madePutts / totalPutts) * 100).toFixed(2) : "0.00"

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Putting Accuracy Tracker</h1>

      {/* card displaying the statistics (total putts, made putts, accuracy) */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Putts: {totalPutts}</p>
          <p>Made Putts: {madePutts}</p>
          <p>Accuracy: {accuracy}%</p>
        </CardContent>
      </Card>

      {/* card for selecting and recording the putt  */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Record Putt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* putt result dropdown */}
            <Select value={currentPuttResult} onValueChange={setCurrentPuttResult}>
              <SelectTrigger>
                <SelectValue placeholder="Select putt result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="made">Made</SelectItem>
                <SelectItem value="left">Missed - Left of the hole</SelectItem>
                <SelectItem value="right">Missed - Right of the hole</SelectItem>
                <SelectItem value="short">Missed - Short of the hole</SelectItem>
                <SelectItem value="long">Missed - Long past the hole</SelectItem>
                <SelectItem value="lip-out">Missed - Lip out</SelectItem>
              </SelectContent>
            </Select>
            {/* record button*/}
            <Button onClick={handlePutt}>Record Putt</Button>
          </div>
        </CardContent>
      </Card>

      {/* card displaying putt log */}
      <Card>
        <CardHeader>
          <CardTitle>Putt Log</CardTitle>
        </CardHeader>
        <CardContent>
          {/* if there are putts recorded, display them, otherwise show a message */}
          {puttLog.length > 0 ? (
            <div className="space-y-2">
              {puttLog.map((putt, index) => (
                // display each putt with a different alert variant based on the result
                <Alert key={index} variant={putt.result === "made" ? "default" : "destructive"}>
                  <AlertTitle>{putt.result === "made" ? "Made" : `Missed - ${putt.result}`}</AlertTitle>
                  <AlertDescription>{putt.timestamp.toLocaleString()}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <p>No putts recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}