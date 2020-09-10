const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

/* add for tracing */
/*
var initTracer = require('jaeger-client').initTracer;

// See schema https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js#L37

var config = {
  serviceName: 'my-awesome-service',
};
var options = {
  tags: {
    'my-awesome-service.version': '1.1.2',
  },
  metrics: metrics,
  logger: logger,
};
var tracer = initTracer(config, options);
*/
/* end of add for tracing */


const routes = require('./api/routes');
routes(app);
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});
