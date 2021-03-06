import { expect } from 'chai';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe('Hotel', () => {
  const customerData = {
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

  const roomsData = {
    "rooms": [
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
  }

  const bookingData = {
    "bookings": [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2020/04/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 1,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
    ]
  }

  const customerOne = new Customer(customerData.customers[0]);
  const customerTwo = new Customer(customerData.customers[1]);
  const hotel = new Hotel(customerData, roomsData, bookingData);

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
      expect(hotel).to.be.an.instanceof(Hotel);
    });

    it('should have customers, rooms, and bookings', () => {
      expect(hotel.customer).to.deep.equal(customerData);
      expect(hotel.rooms).to.deep.equal(roomsData);
      expect(hotel.bookings).to.deep.equal(bookingData);
    });
  });

  describe('Methods', () => {
    it('should be able to find a customer by id', () => {
      expect(hotel.findCustomerById(1)).to.deep.equal({
        "id": 1,
        "name": "Leatha Ullrich"
      });
    });

  });
});