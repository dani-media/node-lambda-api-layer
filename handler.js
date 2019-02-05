"use strict";
const axios = require("axios");

//CREATRE AN INSTANCE OF AXIOS
const instance = axios.create({
  baseURL: "https://rest.gadventures.com",
  timeout: 20000,
  headers: {
    "X-Application-Key": "test_f4246ecb4f3f60e432a86674877d2e4ae528443a"
  }
});

module.exports.hello = (event, context, callback) => {
  //TO GET THE API GATEWAY CALL OBJECT
  console.log(JSON.stringify(event));

  //THE GET PARAMETERS
  let params = event.queryStringParameters;

  //MAKE A CALL TO GET TOURS
  instance
    .get(
      "/tour_dossiers?departures_start_date=" +
        params.date +
        "&name=" +
        params.name,
      {}
    )
    .then(function(tours) {
      let promises = [];

      //MAKE AN ARRAY OF PROMISE REQUESTS FOR TOUR DETAILS TO FETCH
      tours.data.results.forEach(tour => {
        promises.push(instance.get("/tour_dossiers/" + tour.id, {}));
      });

      axios
        .all(promises)
        .then(
          axios.spread((...args) => {
            // CONSOLIDATE THE RESPONSES
            const data = args.map(data => {
              return data.data;
            });

            //RETURN LAMBDA RESPONSE
            let response = {
              statusCode: 200,
              body: JSON.stringify({
                message: "stringify",
                input: data
              })
            };

            callback(null, response);
          })
        )
        .then(/* use the data */);
    })
    .catch(function(error) {
      //HANDLE ERRORS
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
      //console.log("done");
    });
};
