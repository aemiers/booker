class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  findCustomerById(searchNumber) {
    console.log(this.customers)

    this.customers.filter(customers => {
      console.log(customer)
      customer.id === searchNumber
    })
  }


}

export default Hotel;
