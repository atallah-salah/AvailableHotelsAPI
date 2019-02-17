const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios');

// checkRequest file used to check request if valid
const checkRequest= require( __dirname + '/checkRequest.js');

// Providers 
const providers = require('./providers.json'); // include providers file
const providersUrl=[] // create array to store providers url

// filter providers for active provider and push it into providersUrl array
Object.keys(providers).filter((provider)=>{ 
    if(provider["active"]){
        providersUrl.push(provider["route"]);
        return true;
    }
})

// AvailableHotels provider
app.get('/AvailableHotels',(request,response)=> {
    // check request
    let checkRequestResult=checkRequest.checkRequest(request);
    if(typeof checkRequestResult!=="string"){
        let result=[];
        // make request for each provider
        for(let key in providers){
            // make get request for each provider
            axios.get(providers[key].url)
            .then(res => {
                result.push(res)
            })
            .catch(err => {   
                result.push(err)
            });    
        }
        // sort result depend on rate
        arrayofobj.sort(function(a, b){
            if(a.rate > b.rate) { return -1; }
            if(a.rate < b.rate) { return 1; }
            return 0;
        })
        // send result array as json 
        response.json(result)
    }else{
        response.json(checkRequestResult)
    }
})


// Each provider route 
app.get([...providersUrl],(request,response)=> {
    // check request
    let checkRequestResult=checkRequest.checkRequest(request);
    if(typeof checkRequestResult!=="string"){
        // make get request for provider
        axios.get(providers[request.url].url)
        .then(res => {
            response.json(res)
        })
        .catch(err => {        
            response.json(err)
        });    
    }else{
        response.json(checkRequestResult)
    }
    
})

// start server
app.listen(process.env.PORT || 4000)
