const request = require('request-promise-native');

const fetchMyIP = () => {
 return request('https://api.ipify.org?format=json')
}

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchFlyoverByCoords = function(body) {
  const data = JSON.parse(body)
  const lat = data.latitude;
  const lon = data.longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`);
}

const nextISSTimesForMyLocation = function(body) {
  const data = JSON.parse(body);
  const flyover = data.response;

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
  return readablePasses(flyover);
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchFlyoverByCoords, nextISSTimesForMyLocation };