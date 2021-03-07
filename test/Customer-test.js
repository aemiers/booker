import { expect } from 'chai';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe('Customer', () => {
  const customerData = [
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },
    {
      "id": 2,
      "name": "Rocio Schuster"
    },
  ]

  const roomsData = [
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    },
  ]

  const bookingsData = [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 1,
      "date": "2020/04/22",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6ab",
      "userID": 1,
      "date": "2020/04/23",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 1,
      "date": "2020/01/24",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
  ]

  const customerOne = new Customer(customerData[0]);
  const customerTwo = new Customer(customerData[1]);

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Customer).to.be.a('function');
    });

    it('should be an instance of Customer', () => {
      expect(customerOne).to.be.an.instanceof(Customer);
    });

    it('should have an id and a name', () => {
      expect(customerOne.id).to.equal(1);
      expect(customerOne.name).to.equal("Leatha Ullrich");
      expect(customerTwo.id).to.equal(2);
      expect(customerTwo.name).to.equal("Rocio Schuster");

    });

    it('should start off with no bookings or future bookings', () => {
      expect(customerOne.previousBookings.length).to.equal(0);
      expect(customerOne.futureBookings.length).to.equal(0);
    })

  });

  describe('Methods', () => {
    it('should return a customers first name', () => {
      expect(customerOne.getCustomerFirstName()).to.equal("Leatha");
      expect(customerTwo.getCustomerFirstName()).to.equal("Rocio");
    });

    it('should be able to view previous bookings', () => {
      customerOne.getPreviousBookings(bookingsData, "2020/04/22");
      expect(customerOne.previousBookings[0].id).to.deep.equal('5fwrgu4i7k55hl6t5');
    });

    it('should be able to view future bookings', () => {
      customerOne.getFutureBookings(bookingsData, "2020/04/22");
      expect(customerOne.futureBookings[0].id).to.deep.equal("5fwrgu4i7k55hl6sz");
      expect(customerOne.futureBookings[1].id).to.deep.equal("5fwrgu4i7k55hl6ab");
    });

    it('should be able to calculate the total spent on future and past bookings', () => {
      customerOne.getPreviousBookings(bookingsData, "2020/04/22");
      customerOne.getFutureBookings(bookingsData, "2020/04/22");
      expect(customerOne.calculateTotalSpent(roomsData)).to.equal(1326.92);
    });

  });
});