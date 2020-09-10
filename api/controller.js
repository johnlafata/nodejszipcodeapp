'use strict';

var properties = require('../package.json')
var distance = require('../service/distance');
/* add for tracing */
var initTracer = require('jaeger-client').initTracer;

const config = {
  serviceName: 'my-awesome-zipcode-servicei',
  sampler: {
  type: 'const',
   param: 1,
  },
  reporter: {
    collectorEndpoint: 'http://localhost:30080/api/traces',
    logSpans: true, // this logs whenever we send a span
  },
};

const options = {
 logger: {
  info: function logInfo(msg) {
  console.log('INFO  ', msg);
  },
  error: function logError(msg) {
  console.log('ERROR ', msg);
  },
 },
};
var tracer = initTracer(config, options);

/* end of add for tracing */

var controllers = {
   about: function(req, res) {
       const span=tracer.startSpan('about');
       var aboutInfo = {
           name: properties.name,
           version: properties.version
       }
       res.json(aboutInfo);
       span.finish();
   },
   getDistance: function(req, res) {
           const span=tracer.startSpan('distance');
           distance.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
           span.finish();
       },
};

module.exports = controllers;
