const {postPredictHandler, historyhandler} = require("./handler");


const routes = [
    {
        method:'POST',
        path:'/predict',
        handler:postPredictHandler,
        options:{
            payload:{
                allow:'multipart/form-data',
                multipart:true,
                maxBytes:1000000,
                parse:true
            }
        }
    },
    {
        method:'GET',
        path:'/predict/history',
        handler:historyhandler
    }
];

module.exports =routes;
