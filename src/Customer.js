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

  getPreviousBookings(bookingsData, todaysDate) {
    this.previousBookings = bookingsData.filter(booking => booking.date < todaysDate && booking.userID === this.id);
  }

  getFutureBookings(bookingsData, todaysDate) {
    this.futureBookings = bookingsData.filter(booking => booking.date >= todaysDate && booking.userID === this.id);
  }

  getRoomNumbers(bookingData) {
    return bookingData.map(booking => booking.roomNumber);
  }

  calculateTotalSpent(roomsData) {
    let roomCost = 0;
    const allBookings = this.previousBookings.concat(this.futureBookings);
    const foundRoomNumbers = this.getRoomNumbers(allBookings);
    roomsData.forEach(room => {
      if (foundRoomNumbers.includes(room.number)) {
        roomCost += room.costPerNight
      }
    })
    return roomCost
  }
}

export default Customer;
