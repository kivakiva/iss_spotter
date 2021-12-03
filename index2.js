const { fetchMyIP, fetchCoordsByIP, fetchFlyoverByCoords, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchFlyoverByCoords)
.then(nextISSTimesForMyLocation)
.then(body => {
console.log(body)
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});