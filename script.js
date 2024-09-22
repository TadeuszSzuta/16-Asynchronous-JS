'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

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

// const getJSON = function (url, errMsg = 'Something went wrong') {
//   return fetch(`${url}`).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errMsg} (${response.status})`);
//     }
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountryHTML(data[0]);

//       // Country 2
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) throw new Error('No neighbour found');
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountryHTML(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`😡😡😡 ${err.message}`);
//       renderError(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('Australia');
// });

// btn.addEventListener('click', function () {
//   getCountryData('Poland');
// });

// Coding Challenge 1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.city === 'Throttled! See geocode.xyz/pricing')
//         throw new Error('Throttled');
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return data.country;
//     })
//     .ren)
//     .catch(err => console.error(err));
// };

// Displaying country information
const getCountryData = function (country) {
  // Main country
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found [${response.status}]`);
      return response.json();
    })
    .then(data => {
      renderCountryHTML(data[0]);

      // neighbouring country
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountryHTML(data[0], 'neighbour'))
    .catch(err => {
      console.error(`😡😡😡 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Reverse geolocation
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding [${response.status}]`);
      return response.json();
    })
    .then(data => {
      if (data.country) console.log(`You are in ${data.city}, ${data.country}`);
      return data.country;
    })
    .then(country => getCountryData(country))
    .catch(err => console.error(err.message));
};

btn.addEventListener('click', function () {
  whereAmI(-33.933, 18.474);
});

console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Promise resolved 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

console.log('test end');
