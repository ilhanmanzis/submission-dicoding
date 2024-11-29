require('dotenv').config();

const Hapi = require('@hapi/hapi');
const loadModel = require('../services/loadModel');
const routes = require('./routes');
const InputError = require('../exceptions/InputError');

(async()=>{
    const server = Hapi.server({
        port:process.env.PORT || 5000,
        host: process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost',
        routes:{
            cors:{
                origin:['*']
            }
        }
    })

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', function(request, h){
        const response = request.response;

        if(response instanceof InputError){
            const newResponse = h.response({
                status: 'fail',
                message: `${response.message}`
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if(response.isBoom){
            const error = response.output.payload;

            if(error.statusCode === 413){
                return h.response({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000',
                }).code(413);
            };

             // Penanganan error lainnya
             return h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            }).code(error.statusCode || 400);
        }
        return h.continue;
    })

    await server.start();
    console.log(`server run is ${server.info.uri}`);
})();