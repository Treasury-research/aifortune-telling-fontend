export const isProduction =
    typeof window !== "undefined" &&
        (window.location.href.includes("localhost") ||
            window.location.href.includes("staging"))
        ? false
        : true;

export const getTimeRangeFw = (hour: string) => {
    const hourNum = Number(hour)
    if (hourNum == 0) {
        return '0-3'
    } else if (hourNum == 23) {
        return '21-23'
    } else {
        return `${hourNum - 1}-${hourNum + 1}`
    }
}

export const toShortAddress = (address: string, maxLength = 16) => {
	if (!address) {
		address = "";
	}
	const tmpArr = address.split(".");
	const halfLength = Math.floor(maxLength / 2);
	const realAccount = tmpArr[0];
	if (realAccount.length <= maxLength) {
		return address;
	}
	return `${realAccount.substr(0, halfLength)}...${realAccount.substr(
		-halfLength
	)}${tmpArr[1] ? `.${tmpArr[1]}` : ""}`;
};

export const getTimeRange = (range: string) => {
    if (!range) return ''
    const rangeArray = range.split('~')
    let time1 = Number(rangeArray[0].split(':')[0])
    let time2 = Number(rangeArray[1].split(':')[0]) + 1
    return `${time1}-${time2 == 24 ? '0' : time2}`
};

export const getCnDate = (typeUtc: string, date: string, timeRange: string) => {
    const symble = typeUtc.substring(3, 4)
    const hourN = typeUtc.substring(4, 6)

    let formattedDate: any
    let formattedRange: any = []

    const forTimeRangeArray: any = timeRange.split('~')

    for (let i = 0; i < forTimeRangeArray.length; i++) {

        let dateS: any = new Date(date + ` ${forTimeRangeArray[i]}`);

        let utcPlus8: any

        if (symble == '+') {
            utcPlus8 = new Date(dateS.getTime() - (Number(hourN) - 8) * 60 * 60 * 1000);
        } else {
            utcPlus8 = new Date(dateS.getTime() + (Number(hourN) + 8) * 60 * 60 * 1000);
        }

        const month = utcPlus8.getMonth() + 1 < 10 ? `0${utcPlus8.getMonth() + 1}` : utcPlus8.getMonth() + 1

        const day = utcPlus8.getDate() < 10 ? `0${utcPlus8.getDate()}` : utcPlus8.getDate()

        const hour = utcPlus8.getHours() < 10 ? `0${utcPlus8.getHours()}` : utcPlus8.getHours()

        const minutes = utcPlus8.getMinutes() < 10 ? `0${utcPlus8.getMinutes()}` : utcPlus8.getMinutes()

        formattedRange.push(hour + ':' + minutes)

        if (i == 0) {
            formattedDate = utcPlus8.getFullYear() + '/' + month + '/' + day;
        }
    }

    return [formattedDate, `${formattedRange.join('~')}`]
};

