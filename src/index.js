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
import './images/ninja.svg';

// QUERY SELECTORS
const searchSubmitBtn = document.querySelector('#searchSubmit');
const searchDateInput = document.querySelector('#searchDate');
const searchResultsBtn = document.querySelector('#searchResults');
const upcomingBookingsBtn = document.querySelector('#upcomingBookings');
const pastBookingsBtn = document.querySelector('#pastBookings');
const myAccountBtn = document.querySelector('#myAccount');
const reserveRoomBtn = document.querySelector('#reserveBtn');
const roomCardSection = document.querySelector('#main');


// EVENT LISTENERS
searchSubmitBtn.addEventListener('click', updateSearchResults);
searchDateInput.addEventListener('keydown', preventInvalidKeys);
// upcomingBookingsBtn.addEventListener('click', displayUpcomingBookings);
// pastBookingsBtn.addEventListener('click', displayPreviousBookings);

upcomingBookingsBtn.addEventListener('click', function () {
  displayBookings(customer.futureBookings)
});
pastBookingsBtn.addEventListener('click', function () {
  displayBookings(customer.previousBookings)
});

// GLOBAL VARIABLES
let hotel, customer;

// FUNCTIONS

function preventInvalidKeys(event) {
  var invalidCharacters = ['e', '+', '-'];
  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
}
function updateSearchResults() {
  let userInputDate = searchDateInput.value.replace(/-/g, '/');
  return userInputDate;
}

function createHotel(data) {
  hotel = new Hotel(data[0], data[1], data[2]);
  createCustomer(data)
}

function createCustomer(data) {
  customer = new Customer(data[0][0])
  customer.getPreviousBookings(data[2], "2020/02/19");
  customer.getFutureBookings(data[2], "2020/02/19");
  // populatePage();
}

function addClass(element, className) {
  element.classList.add(className || 'hidden');
}

function removeClass(element, className) {
  element.classList.remove(className || 'hidden');
}

function populatePage() {
  updateWelcome();
}

function updateWelcome() {
  let welcomeSaying = document.getElementById('welcome');
  const firstName = customer.getCustomerFirstName();
  welcomeSaying.insertAdjacentHTML('beforeend', `${firstName}!`);
}

function resetHtml() {
  roomCardSection.innerHTML = '';
}

function checkForEmptyState(bookingArray) {
  let emptyState = document.getElementById('empty');
  if (bookingArray.length === 0) {
    removeClass(emptyState, 'hidden');
  } else {
    addClass(emptyState, 'hidden');
  }
}

function displayBookings(bookingArray) {
  resetHtml();
  // checkForEmptyState(bookingArray);
  bookingArray.forEach(booking => {
    const matchingRoom = hotel.rooms.find(room => {
      if (room.bidet === true) {
        room.bidet = 'Bidet Included';
      } else {
        room.bidet = 'No Bidet Included';
      }
      return room.number === booking.roomNumber
    })
    roomCardSection.insertAdjacentHTML('beforeend', `
    <section class="room-card">
      <img alt="room picture" src="./images/bedroom1.jpg" class="room-image">
      <section class="middle-column-container">
        <h2 class="room-type-card-header">${matchingRoom.roomType}</h2 >
    <div class="room-specs">
      <img alt="bed icon" src="./images/bed.svg" class="small-icon">
        <p>${matchingRoom.numBeds} ${matchingRoom.bedSize} size bed</p>
        </div>
      <div class="room-specs">
        <img alt="people icon" src="./images/users.svg" class="small-icon">
          <p>Sleeps 2</p>
        </div>
        <div class="room-specs">
          <img alt="shower icon" src="./images/shower.svg" class="small-icon">
            <p>1 Bathroom</p>
        </div>
          <div class="room-specs">
            <img alt="toilet icon" src="./images/toilet.svg" class="small-icon">
              <p>${matchingRoom.bidet}</p>
        </div>
      </section>
          <section class="end-column-container ">
            <div class="expense-details">
              <h2 class="expense">Expense Details:</h2>
              <p class="expense">${booking.date}</p>
              <h2 class="expense">$${matchingRoom.costPerNight}<span class="span-per-night"> total</span></h2>
            </div>
          </section>
    </section>
    `)
  })
}

function displaySearchResults() {
  resetHtml();

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