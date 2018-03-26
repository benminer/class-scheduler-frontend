const formatDate = (thisDay) => {
    switch(thisDay) {
      case ('M'):
        return 'Monday'
      case ('T'):
        return 'Tuesday'
      case ('W'):
        return 'Wednesday'
      case('R'):
        return 'Thursday'
      case ('F'):
        return 'Friday'
      case ('S'):
        return 'Saturday'
      default:
        return 'Day Of Week'
    }
};

export default formatDate;