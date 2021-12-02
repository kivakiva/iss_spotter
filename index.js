const { fetchMyIP, fetchCoordsByIP, fetchFlyoverByCoords } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// let ipHome = '24.138.85.65'


// fetchCoordsByIP(ipHome, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coords:' , coords);
// });

let coordsHome = {
  latitude: 45.4869,
  longitude: -75.6157
};

fetchFlyoverByCoords(coordsHome, (error, flyover) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover:' , flyover);
});