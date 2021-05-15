const axios = require('axios');
const { TOKEN } = require('../../config.js');

module.exports = {
  getAll: (endpoint) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo${endpoint}`;

    return axios({
      url,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Authorization: `${TOKEN}`,
      },
    });
  },

  add: (endpoint, data) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo${endpoint}`;

    return axios({
      url,
      method: 'post',
      headers: {
        Authorization: `${TOKEN}`,
      },
      data,
    });
  },

  update: (endpoint) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo${endpoint}`;
    return axios({
      url,
      method: 'put',
      headers: {
        Authorization: `${TOKEN}`,
      },
    });
  },
};
