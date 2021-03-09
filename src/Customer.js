class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.previousBookings = [];
    this.futureBookings = [];
  }

  getCustomerFirstName() {
    return this.name.split(' ', 1).join();
  }

  getRoomNumbers(bookingData) {
    return bookingData.map(booking => booking.roomNumber);
  }

  getPreviousBookings(bookingsData, todaysDate) {
    let unorganizedPreviousBookings = bookingsData.filter(booking => booking.date < todaysDate && booking.userID === this.id);
    this.previousBookings = this.sortByMostRecent(unorganizedPreviousBookings);
  }

  getFutureBookings(bookingsData, todaysDate) {
    let unorganizedFutureBookings = bookingsData.filter(booking => booking.date >= todaysDate && booking.userID === this.id);
    this.futureBookings = this.sortByMostRecent(unorganizedFutureBookings);
  }

  sortByMostRecent(array) {
    let organizedData = array.sort((a, b) => {
      return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
    })
    return organizedData;
  }


  calculateTotalSpent(roomsData) {
    let roomCost = 0;
    const allBookings = this.previousBookings.concat(this.futureBookings);
    const foundRoomNumbers = this.getRoomNumbers(allBookings);
    roomsData.forEach(room => {
      if (foundRoomNumbers.includes(room.number)) {
        roomCost += room.costPerNight;
      }
    })
    return roomCost.toFixed(2);
  }
}

export default Customer;
