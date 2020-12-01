"use strict";
var PRODUCTION_URL = '';

const URL_GET_DATASET_CRIMES = "https://data.cityofchicago.org/resource/x2n5-8w5q.json";
// const URL_GET_DATASET_HOTELS = "https://data.cityofchicago.org/resource/x2n5-8w5q.json";

const start = () => {

    showLoader();
}

const fail = () => {
    hideLoader();
}

// main function to do backend calls
// @Param loader: boolean to specify to handle the loader or not
const call = (callback) => {

    start();

    $.ajax( {
        
        type:       "GET",
        url:        URL_GET_DATASET_CRIMES,
        dataType: 'json',
        // data:       payload,
        contentType: "application/json",
        crossDomain: true,
        async:false,
        
        success: function(response){ 
            
            // if(loader){
            //     hideLoader();
            // }

            callback(response) 
        },

        error: function(response) {
            
            if(response.status === 202){
                callback(response); 
            } else {

                fail();
                console.error("Errore");
            }
        }
    });
}

const showLoader = () =>{

    $('#loader_container').show();
}

const hideLoader = () =>{

    $('#loader_container').hide();
}

