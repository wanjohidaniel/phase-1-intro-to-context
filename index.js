function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateStamp.slice(-4)),
      date: dateStamp.slice(0, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(dateStamp.slice(-4)),
      date: dateStamp.slice(0, 10)
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }