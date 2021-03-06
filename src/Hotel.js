class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  findCustomerById(searchNumber) {
    return this.customers.filter(customer => customer.id === searchNumber)
  }

  findRoomByRoomType(searchWord) {
    const foundRooms = this.rooms.filter(room => room.roomType === searchWord);
    return foundRooms;
  }

  findAvailableRoomsOnDate(searchDate) {
    const bookedRoomNumbers = this.bookings.filter(bookings => bookings.date === searchDate).map(bookings => bookings.roomNumber);
    const availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number));
    return availableRooms;
  }

}


export default Hotel;
