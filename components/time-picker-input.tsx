"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface TimePickerInputProps {
  value: string
  onChange: (value: string) => void
}

export function TimePickerInput({ value, onChange }: TimePickerInputProps) {
  const [hours, setHours] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":")
      setHours(h)
      setMinutes(m)
    }
  }, [value])

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHours = e.target.value.replace(/[^0-9]/g, "")

    if (newHours === "") {
      setHours("")
    } else {
      const numericValue = Number.parseInt(newHours, 10)
      if (numericValue >= 0 && numericValue <= 23) {
        newHours = numericValue.toString().padStart(2, "0")
        setHours(newHours)
        onChange(`${newHours}:${minutes}`)
      }
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinutes = e.target.value.replace(/[^0-9]/g, "")

    if (newMinutes === "") {
      setMinutes("")
    } else {
      const numericValue = Number.parseInt(newMinutes, 10)
      if (numericValue >= 0 && numericValue <= 59) {
        newMinutes = numericValue.toString().padStart(2, "0")
        setMinutes(newMinutes)
        onChange(`${hours}:${newMinutes}`)
      }
    }
  }

  return (
    <div className="flex items-center">
      <Input
        type="text"
        value={hours}
        onChange={handleHoursChange}
        placeholder="HH"
        className="w-12 text-center"
        maxLength={2}
      />
      <span className="mx-1">:</span>
      <Input
        type="text"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="MM"
        className="w-12 text-center"
        maxLength={2}
      />
    </div>
  )
}
