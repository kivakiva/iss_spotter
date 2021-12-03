const { nextISSTimesForMyLocation } = require('./iss');

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

// let coordsHome = {
//   latitude: 45.4869,
//   longitude: -75.6157
// };

// fetchFlyoverByCoords(coordsHome, (error, flyover) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover:' , flyover);
// });

const readablePasses = (flyover) => {
  const readableFlyover = []

  for (let key of flyover) {

    const datetime = new Date(0);
    datetime.setUTCSeconds(key.risetime)

    readableFlyover.push(
      `Next pass at ${new Date(datetime)} for ${key.duration} seconds!\n`
    )
  }
  return readableFlyover.reduce((sum, a) => sum + a)
}


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(readablePasses(passTimes));
});
