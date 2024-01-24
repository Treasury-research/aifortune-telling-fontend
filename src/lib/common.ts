export const isProduction =
    typeof window !== "undefined" &&
        (window.location.href.includes("localhost") ||
            window.location.href.includes("staging"))
        ? false
        : true;

export const getTimeRange = (hour: string) => {
    const hourNum = Number(hour)
    if (hourNum == 0) {
        return '0-3'
    } else if (hourNum == 23) {
        return '21-23'
    } else {
        return `${hourNum - 1}-${hourNum + 1}`
    }
};

export const getCnDate = (typeUtc: string,date: string) => {
    const symble = typeUtc.substring(3, 4)
    const hourN = typeUtc.substring(4, 6)
    // const time1 = timeRange.split('~')[0]
    // const time2 = timeRange.split('~')[1]

    let dateS: any = new Date(date + ' 00:00');
    let utcPlus8: any

    if (symble == '+') {
        utcPlus8 = new Date(dateS.getTime() - Number(hourN) * 60 * 60 * 1000 + 8 * 60 * 60 * 1000);
    } else {
        utcPlus8 = new Date(dateS.getTime() + Number(hourN) * 60 * 60 * 1000 + 8 * 60 * 60 * 1000);
    }

    const month = utcPlus8.getMonth() + 1 < 10 ? `0${utcPlus8.getMonth() + 1}` : utcPlus8.getMonth() + 1

    const day = utcPlus8.getDate() < 10 ? `0${utcPlus8.getDate()}` : utcPlus8.getDate()

    let formattedDate = utcPlus8.getFullYear() + '/' + month + '/' + day;

    return formattedDate
};

