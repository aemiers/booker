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

  // getPreviousBookings() {

  // }

  // getFutureBookings() {

  // }

  // calculateTotalSpent() {

  // }

}

export default Customer;
