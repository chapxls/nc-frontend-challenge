export function calculateTimeDifference(endDate: Date): number {
  return endDate.getTime() - Date.now()
}

export function formatTimeDifference(timeDiff: number): string {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
}
