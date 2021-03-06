import { expect } from 'chai';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe('Hotel', () => {
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

  const bookingData = [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 1,
      "date": "2020/04/22",
      "roomNumber": 1,
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
      "roomNumber": 1,
      "roomServiceCharges": []
    },
  ]

  const customerOne = new Customer(customerData[0]);
  const customerTwo = new Customer(customerData[1]);
  const hotel = new Hotel(customerData, roomsData, bookingData);

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
      expect(hotel).to.be.an.instanceof(Hotel);
    });

    it('should have customers', () => {
      expect(hotel.customers).to.deep.equal(customerData);
    });

    it('should have rooms', () => {
      expect(hotel.rooms).to.deep.equal(roomsData);
    });

    it('should have bookings', () => {
      expect(hotel.bookings).to.deep.equal(bookingData);
    });

  });

  describe('Methods', () => {
    it('should be able to find a customer by id', () => {
      expect(hotel.findCustomerById(1)).to.deep.equal([{
        "id": 1,
        "name": "Leatha Ullrich"
      }]);
    });

    it('should be able to return a list of rooms by type', () => {
      expect(hotel.findRoomByRoomType("residential suite")).to.deep.equal([{
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }]);
    });

    it('should be able to return a list of rooms available on a date', () => {
      expect(hotel.findAvailableRoomsOnDate("2020/04/22")).to.deep.equal([{
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
      }]);
    });
  });
});