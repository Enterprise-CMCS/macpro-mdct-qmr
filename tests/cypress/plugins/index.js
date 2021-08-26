
module.exports = (on, config) => {

  config.baseUrl = process.env.APPLICATION_ENDPOINT || 'http://localhost:3000';


  return config;
}
