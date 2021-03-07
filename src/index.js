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





// STOP TRYING TO MAKE FETCH WORK
const customerData = getData('customers', 'customers');
const bookingsData = getData('bookings', 'bookings');
const roomsData = getData('rooms', 'rooms');

const getData (endOfURL, name) {
  return fetch(`http://localhost:3001/api/v1/${endOfUrl}`)
    .then(response => response.json())
    .then(data => data[name])
    .catch(error => displayErrorMessage(error))
}

Promise.all([customerData, bookingsData, roomsData])
  .then(data => createHotel(data))


}
export default fetchAPIData;