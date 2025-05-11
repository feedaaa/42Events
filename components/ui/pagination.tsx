"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Generate page numbers to display
  const generatePagination = () => {
    // If there are 7 or fewer pages, display all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages]
    }

    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    // If current page is somewhere in the middle
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
  }

  const pages = generatePagination()

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
        {currentPage > 1 ? (
          <Link href={createPageURL(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </>
        )}
      </Button>

      {pages.map((page, i) => (
        <div key={i}>
          {page === "ellipsis" ? (
            <Button variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          ) : (
            <Button variant={currentPage === page ? "default" : "outline"} size="icon" asChild={currentPage !== page}>
              {currentPage !== page ? (
                <Link href={createPageURL(page)}>
                  {page}
                  <span className="sr-only">Page {page}</span>
                </Link>
              ) : (
                <>
                  {page}
                  <span className="sr-only">Page {page}</span>
                </>
              )}
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
        {currentPage < totalPages ? (
          <Link href={createPageURL(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        ) : (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </>
        )}
      </Button>
    </div>
  )
}

export const PaginationContent = () => null
export const PaginationItem = () => null
export const PaginationLink = () => null
export const PaginationEllipsis = () => null
export const PaginationPrevious = () => null
export const PaginationNext = () => null
