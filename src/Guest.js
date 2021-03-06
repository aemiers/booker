class Guest {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.previousBookings = [];
    this.futureBookings = [];
  }

  getFirstName() {
    return this.name.split(' ', 1).join();
  }

  // calculateTotalSpent() {

  // }

  ///this is here to make a changeeee


}

export default Guest;
