/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const requestPromise = require('request-promise');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', function(error, response, body) {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data.ip;

    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {


  requestPromise(`https://freegeoip.app/json/${ip}`, function(error, response, body) {

    if (response.statusCode !== 200) {
      const statError = `Status code error: ${response.statusCode}`;
      callback(statError, null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }


    const data = JSON.parse(body);
    const dataLatLong = {
      latitude : data.latitude,
      longitude : data.longitude
    };
    callback(error, dataLatLong);
  });

};

const fetchFlyoverByCoords = function(coords, callback) {

  const lat = coords.latitude;
  const lon = coords.longitude;

  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, function(error, response, body) {

    if (response.statusCode !== 200) {
      const statError = `Status code error: ${response.statusCode}`;
      callback(statError, null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(error, data);
  }

  );

};




module.exports = { fetchMyIP, fetchCoordsByIP, fetchFlyoverByCoords };
