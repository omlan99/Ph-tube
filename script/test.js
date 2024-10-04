// getTimeString function
function getTimeString(time){
    const getHour = parseInt(time / 3600);
    let getSeconds = time % 3600;
    const getMinute = parseInt(getSeconds / 60);
    getSeconds = getSeconds % 60;
    return `${getHour} hr ${getMinute} min ${getSeconds} sec`
    
}

console.log(getTimeString(1672656000));
