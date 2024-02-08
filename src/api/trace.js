
export default function trace(eventName, params){
    window.gtag("event", eventName, params);
    // console.log(eventName)
}