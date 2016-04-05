require('babel/register')({
    only: /node_modules\/mozaik[^/]*\/src/
});

var mozaik = new (require('mozaik'))(require('./config'));

mozaik.bus.registerApi('weather', require('mozaik-ext-weather/client'));
mozaik.bus.registerApi('jenkins', require('mozaik-ext-jenkins/client'));

mozaik.startServer();
