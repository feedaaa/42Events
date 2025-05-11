"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
        isScrolled ? "shadow-sm shadow-primary/10" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="pixel-font text-2xl font-bold">
            <span className="text-primary">&lt;</span>
            <span className="text-white">university events</span>
            <span className="text-primary">/&gt;</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <Link href="/login" className="flex items-center">
            <div className="pixel-button text-sm flex items-center gap-2">
              <span className="hidden sm:inline">Admin</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <rect x="6" y="2" width="4" height="4" fill="currentColor" />
                <rect x="4" y="8" width="8" height="2" fill="currentColor" />
                <rect x="4" y="12" width="8" height="2" fill="currentColor" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
