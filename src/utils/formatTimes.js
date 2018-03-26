const formatTimes = (thisTime) => {
    var time = thisTime.slice(0,5);
    var hour = time.slice(0,2);
    var minutes = time.slice(3,5);
    var dd = "AM";
  
    if (hour > 12) {
      hour = hour - 12;
      dd = "PM";
    } else if (Number(hour) === 12) {
      dd = "PM"
    }
    
    return hour + ':' + minutes + ' ' + dd

};

export default formatTimes;