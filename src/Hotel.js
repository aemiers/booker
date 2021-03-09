class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
    this.selectedSearchDate = "";
  }

  findCustomerById(searchNumber) {
    return this.customers.filter(customer => customer.id === searchNumber)
  }

  findRoomByRoomType(searchWord) {
    const foundRooms = this.rooms.filter(room => room.roomType === searchWord);
    return foundRooms;
  }

  findAvailableRoomsOnDate(searchDate) {
    const bookedRooms = this.bookings.filter(booking => booking.date === searchDate)
    const bookedRoomNumbers = bookedRooms.map(booking => booking.roomNumber)
    const availableRooms = this.rooms.filter(room => {
      return !bookedRoomNumbers.includes(room.number)
    });
    console.log('inside hotel class', availableRooms.length)
    return availableRooms;
  }

  filterByRoomType(searchDate, filterType) {
    this.findAvailableRoomsOnDate(searchDate);
    const filteredRooms = this.rooms.filter(room => {
      return room.roomType === filterType;
    })
    return filteredRooms;
  }
}

export default Hotel;
