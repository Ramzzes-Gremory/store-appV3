export const useFormatter = () => {
    const formatDate = (isoString: string | Date | null | undefined) => {
        if (!isoString) return '-';

        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Kyiv'
        }).format(new Date(isoString))
    }

    return {
        formatDate
    }
}