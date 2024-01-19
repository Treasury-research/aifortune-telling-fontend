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
    } else if(hourNum == 23){
        return '21-23'
    }else {
        return `${hourNum - 1}-${hourNum + 1}`
    }
};
