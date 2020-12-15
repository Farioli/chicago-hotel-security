"use strict";

const URL_GET_DATASET_CRIMES = "https://data.cityofchicago.org/resource/x2n5-8w5q.json";

// main function to do backend calls
// @Param loader: boolean to specify to handle the loader or not
const call = (callback) => {

    

    $.ajax( {
        
        type:       "GET",
        url:        URL_GET_DATASET_CRIMES,
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        async:false,
        
        success: function(response){ 

            callback(response) 
        },

        error: function(response) {
            
            if(response.status === 202){
                callback(response); 
            } else {

                console.error("Errore");
            }
        }
    });
}