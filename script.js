'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

// const getCountryData = function (country) {
//   // Creating new AJAX request
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // Listening for data to arrive
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Generating HTML to present data about country
//     const html = `<article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[Object.keys(data.languages)[0]]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[Object.keys(data.currencies)[0]].name
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//   });
// };

const renderCountryHTML = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img " src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[Object.keys(data.languages)[0]]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const getCountryAndNeighbour = function (country) {
//   // Creating new AJAX request
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // Listening for data to arrive
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Generating HTML to present data about country
//     renderCountryHTML(data);

//     // Get neighbour country
//     const neighbour = data.borders?.[0];
//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);

//       renderCountryHTML(data, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('Poland');

// How it used to be - HTTPRequest
// Creating new AJAX request
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// Modern way

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountryHTML(data[0]));
};

getCountryData('Poland');
