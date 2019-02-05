"use strict";
const axios = require("axios");
const instance = axios.create({
  baseURL: "https://rest.gadventures.com",
  timeout: 10000,
  headers: {
    "X-Application-Key": "test_f4246ecb4f3f60e432a86674877d2e4ae528443a"
  }
});

module.exports.hello = (event, context, callback) => {
  instance

    //.get("/country_dossiers/10382", {

    //will return dossier number
    //.get("/country_dossiers?name=canada", {
    //search for trips by name
    //.get("/tour_dossiers?departures_start_date=2019-01-01&name=Jamaica", {
    //get details of the trip
    .get("/tour_dossiers/24943", {
      //get details of the trip
      //.get("/activity_dossiers?name=bike", {
      //.get("/activity_dossiers/29780", {
      //search by place name
      //.get("/place_dossiers?name=tower", {
      //.get("/images/4321", {
      //.get("/places?name=toronto", {
      // params: {
      //   ID: 12345
      // }
    })
    .then(function(data) {
      console.log(data.data);
      let response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Success",
          input: data.data
        })
      };
      callback(null, response);
    })
    .catch(function(error) {
      console.log(error);
      let response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Failure",
          input: error
        })
      };
      callback(null, response);
    })
    .then(function() {
      console.log("done");
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
