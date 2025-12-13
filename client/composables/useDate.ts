export const useDate = () => {
  
  const parseDate = (isoString: string): Date => {
    return new Date(isoString)
  }

  const formatDateTime = (date: Date, locale = 'en-US'): string => {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    }).format(date)
  }

  const formatRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    
    const units = [
      { name: 'year', seconds: 31536000 },
      { name: 'month', seconds: 2592000 },
      { name: 'day', seconds: 86400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 }
    ]

    for (const unit of units) {
      const quotient = Math.floor(diffInSeconds / unit.seconds)
      if (Math.abs(quotient) >= 1) {
        return rtf.format(quotient, unit.name as Intl.RelativeTimeFormatUnit)
      }
    }

    return 'just now'
  }

  const toUnix = (date: Date): number => {
    return date.getTime()
  }

  return {
    parseDate,
    formatDateTime,
    formatRelativeTime,
    toUnix
  }
}
