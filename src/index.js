import './css/index.scss';
import Customer from './Customer';
import Hotel from './Hotel';
import './images/bed.svg';
import './images/bedroom1.jpg';
import './images/bedroom2.jpg';
import './images/bedroom3.jpg';
import './images/bedroom4.jpg';
import './images/dollar-symbol.svg';
import './images/logo.png';
import './images/neuschwanstein.jpg';
import './images/toilet.svg';
import './images/search.svg';
import './images/users.svg';
import './images/shower.svg';
// QUERY SELECTORS

// GLOBAL VARIABLES
let hotel, customer;

// FUNCTIONS
const createHotel = (data) => {
  hotel = new Hotel(data[0], data[1], data[2]);
  console.log(data[2])
  createCustomer(data)
}

const createCustomer = (data) => {
  customer = new Customer(data[0][0])
  customer.getPreviousBookings(data[2], "2020/02/19");
  customer.getFutureBookings(data[2], "2020/02/19")
}








// STOP TRYING TO MAKE FETCH WORK

const displayErrorMessage = (error) => {
  console.log(error)
}

const customerData = getData('/customers', 'customers');
const roomsData = getData('/rooms', 'rooms');
const bookingsData = getData('/bookings', 'bookings');

function getData(endOfUrl, name) {
  return fetch(`http://localhost:3001/api/v1${endOfUrl}`)
    .then(response => response.json())
    .then(data => data[name])
    .catch(error => displayErrorMessage(error))
}

Promise.all([customerData, roomsData, bookingsData])
  .then(data => createHotel(data))


// export default fetchAPIData;