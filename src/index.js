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
const searchSpyglassBtn = document.querySelector('#searchSubmit');
const searchResultsBtn = document.querySelector('#searchResults');
const upcomingBookingsBtn = document.querySelector('#upcomingBookings');
const pastBookingsBtn = document.querySelector('#pastBookings');
const myAccountBtn = document.querySelector('#myAccount');

const reserveRoomBtns = document.querySelectorAll('.reserve-btn').forEach(btn => { btn.addEventListener('click', findButton) });

const roomCardSection = document.querySelector('#roomCardContainer');
const searchDateInput = document.querySelector('#searchDate');
const emptyStateMessage = document.querySelector('#emptyMessage');
const filterContainer = document.querySelector('#filterContainer');
const accountSummaryPage = document.getElementById('accountSummary');

// EVENT LISTENERS
searchSpyglassBtn.addEventListener('click', displaySearchResults);
searchResultsBtn.addEventListener('click', displaySearchPage);
searchDateInput.addEventListener('change', preventInvalidKeys);
searchDateInput.addEventListener('click', blockOldDates);
myAccountBtn.addEventListener('click', showMyAccountInfo);
filterContainer.addEventListener('click', filterResults);

// reserveRoomBtns.addEventListener('click', findButton);



upcomingBookingsBtn.addEventListener('click', function () {
  displayBookings(customer.futureBookings);
});
pastBookingsBtn.addEventListener('click', function () {
  displayBookings(customer.previousBookings);
});

// GLOBAL VARIABLES
let hotel, customer;

// FUNCTIONS
function findButton() {
  console.log('click')
}



function createHotel(data) {
  hotel = new Hotel(data[0], data[1], data[2]);
  createCustomer(data)
}

function createCustomer(data) {
  customer = new Customer(data[0][0])
  customer.getPreviousBookings(data[2], "2020/02/19");
  customer.getFutureBookings(data[2], "2020/02/19");
  updateWelcome();
}

function updateWelcome() {
  let welcomeSaying = document.getElementById('welcome');
  const firstName = customer.getCustomerFirstName();
  welcomeSaying.insertAdjacentHTML('beforeend', `${firstName}!`);
}

function resetHtml(location) {
  location.innerHTML = '';
}

function resetInput() {
  location.value = '';
}

function addClass(element, className) {
  element.classList.add(className || 'hidden');
}

function removeClass(element, className) {
  element.classList.remove(className || 'hidden');
}

function filterColorHandler() {
  addClass(element1, hidden);
  addClass(element1, hidden);
  addClass(element1, hidden);
  removeClass(element1, hidden);
}

function preventInvalidKeys(event) {
  var invalidCharacters = ['e', '+', '-'];
  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
  colorSearchButton();
}

function blockOldDates() {
  resetInput(searchDateInput);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month
  }
  today = year + '-' + month + '-' + day;
  document.getElementById("searchDate").setAttribute("min", today);
  colorSearchButton();
}

function colorSearchButton() {
  if (searchDateInput.value !== "") {
    removeClass(searchSpyglassBtn, "disabled");
  } else {
    addClass(searchSpyglassBtn, "disabled");
  }
}

function checkForEmptyState(bookingArray) {
  if (bookingArray.length === 0) {
    removeClass(emptyStateMessage, 'hidden');
  } else {
    addClass(emptyStateMessage, 'hidden');
  }
}

function updateBidetValues(roomElement) {
  if (roomElement.bidet === true) {
    roomElement.bidet = 'Bidet Included';
  } else {
    roomElement.bidet = 'No Bidet Included';
  }
}

function assignPicture(roomElement) {
  let picSrc = ""
  if (roomElement === "residential suite") {
    picSrc = "./images/bedroom1.jpg";
  } else if (roomElement === "suite") {
    picSrc = "./images/bedroom2.jpg";
  } else if (roomElement === "single room") {
    picSrc = "./images/bedroom3.jpg";
  } else {
    picSrc = "./images/bedroom4.jpg";
  }
  return picSrc;
}

function loadBookingsPages(bookingArray) {
  resetHtml(roomCardSection);
  addClass(filterContainer, 'hidden');
  addClass(accountSummaryPage, 'hidden');
  checkForEmptyState(bookingArray);
}

function displayBookings(bookingArray) {
  loadBookingsPages(bookingArray);
  bookingArray.forEach(booking => {
    let picSrc = "";
    const matchingRoom = hotel.rooms.find(room => {
      updateBidetValues(room);
      picSrc = assignPicture(room.roomType);
      return room.number === booking.roomNumber;
    })
    roomCardSection.insertAdjacentHTML('beforeend', `
    <section class="room-card">
      <img alt="room picture" src=${picSrc} class="room-image">
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

function displaySearchPage() {
  resetHtml(roomCardSection);
  addClass(accountSummaryPage, 'hidden');
  addClass(searchSpyglassBtn, "disabled");
  removeClass(emptyStateMessage, "hidden");
  removeClass(filterContainer, "hidden");
}

function displaySearchResults() {
  const searchDate = searchDateInput.value;
  displaySearchPage();
  generateSearchResultCards(searchDate);
}

function generateSearchResultCards(date, filterType) {
  console.log('filter type', filterType)
  let availableRooms;
  if (!filterType) {
    availableRooms = hotel.findAvailableRoomsOnDate(date);
    console.log('unfiltered', availableRooms)
  } else {
    availableRooms = hotel.filterByRoomType(searchDate, filterType);
    console.log('regular', availableRooms)
  }
  availableRooms.forEach(room => {
    updateBidetValues(room);
    let picSrc = assignPicture(room.roomType);
    roomCardSection.insertAdjacentHTML('beforeend', `
    <section class="room-card">
      <img alt="room picture" src=${picSrc} class="room-image">
      <section class="middle-column-container">
        <h2 class="room-type-card-header">${room.roomType}</h2 >
    <div class="room-specs">
      <img alt="bed icon" src="./images/bed.svg" class="small-icon">
        <p>${room.numBeds} ${room.bedSize} size bed</p>
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
              <p>${room.bidet}</p>
        </div>
      </section>
          <section class="end-column-container">
            <div class="reserve-options">
              <button id="reserveBtn ${room.number}" class="reserve-btn ">Reserve Room</button>
              <h1 class="room-cost">$${room.costPerNight}<span class="span-per-night"> /night</span></h1>
            </div>
          </section>
    </section>
    `)
  })
}

function filterResults(event) {
  const searchDate = searchDateInput.value;
  displaySearchPage();
  if (event.target.id === 'singleRoom') {
    generateSearchResultCards(searchDate, 'single room');
  } else if (event.target.id === 'resSuite') {
    generateSearchResultCards(searchDate, 'residential suite');
  } else if (event.target.id === 'jrSuite') {
    generateSearchResultCards(searchDate, 'junior suite');
  } else if (event.target.id === 'suite') {
    generateSearchResultCards(searchDate, 'suite');
  }
}

function showMyAccountInfo() {
  resetHtml(roomCardSection);
  const roomCostTotalLocation = document.getElementById('totalSpent');
  const roomCostTotal = customer.calculateTotalSpent(hotel.rooms);
  resetHtml(roomCostTotalLocation);
  addClass(emptyStateMessage, 'hidden');
  removeClass(accountSummaryPage, "hidden");
  roomCostTotalLocation.insertAdjacentHTML('afterbegin', `Total spent on rooms: $${roomCostTotal}`);
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

function insertData(data) {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data.console.log(data))
    .catch(error => displayErrorMessage(error))
}