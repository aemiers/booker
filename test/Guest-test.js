import { expect } from 'chai';
import Guest from '../src/Guest';

describe('Guest', () => {

  const userData = {
    "customers": [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
    ]
  }
  const guestOne = new Guest(userData.customers[0]);
  const guestTwo = new Guest(userData.customers[1])

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Guest).to.be.a('function');
    });

    it('should be an instance of Guest', () => {
      expect(guestOne).to.be.an.instanceof(Guest);
    });

    it('should have an id and a name', () => {
      expect(guestOne.id).to.equal(1);
      expect(guestOne.name).to.equal("Leatha Ullrich");
      expect(guestTwo.id).to.equal(2);
      expect(guestTwo.name).to.equal("Rocio Schuster");

    });

    it('should start off with no bookings or future bookings', () => {
      expect(guestOne.previousBookings.length).to.equal(0);
      expect(guestOne.futureBookings.length).to.equal(0);
    })

  });

  describe('Methods', () => {
    it('should return a guests first name', () => {
      expect(guestOne.getFirstName()).to.equal("Leatha");
      expect(guestTwo.getFirstName()).to.equal("Rocio");
    });
  });
});