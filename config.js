// Load environment variables from .env file if available
require('dotenv').load();

var config = {
  env:  'prod',

  host: '0.0.0.0',
  port: process.env.PORT || 5000,

  // Available themes:
  // + night-blue
  // + light-grey
  // + yellow
  // + light-yellow
  // + bordeau
  theme: 'night-blue',

  // clients configs
  api: {
    aws: {
      region: 'eu-west-1'
    },
  },

  // define duration between each dashboard rotation (ms)
  rotationDuration: 15000,

  dashboards: [

    // first dashboard
    {
      // 4 x 3 dashboard
      columns: 4,
      rows:  3,
      widgets: [
        {
          title: 'Klear production deploy',
          type: 'jenkins.job_status',
          job: 'klear-deploy-production',
          columns: 1, rows: 1,
          x: 0, y: 0
        },
        {
          title: 'Klear dev test',
          type: 'jenkins.job_builds_histogram',
          job: 'klear-dev-test',
          columns: 1, rows: 1,
          x: 1, y: 0
        },
        {
          title: 'Eris production deploy',
          type: 'jenkins.job_status',
          job: 'eris-deploy-production',
          columns: 1, rows: 1,
          x: 2, y: 0
        },
        {
          title: 'Eris dev test',
          type: 'jenkins.job_builds_histogram',
          job: 'eris-dev-test',
          columns: 1, rows: 1,
          x: 3, y: 0
        },
        {
          type: 'weather.weather',
          city: 'Stockholm',
          country: 'SE',
          lang: 'en',
          limit: 3,
          columns: 1, rows: 1,
          x: 0, y: 2
        },
        {
          type: 'time.clock',
          columns: 1, rows: 1,
          x: 3, y: 2
        },
      ]
    },

    // // second dashboard
    // {
    //   // 3 x 2 dashboard
    //   columns: 3,
    //   rows:  2,
    //   widgets: [
    //     {
    //       type: 'travis.build_history',
    //       owner: 'plouc',
    //       repository: 'mozaik',
    //       columns: 1, rows: 2,
    //       x: 0, y: 0
    //     },
    //     {
    //       type: 'github.user_badge',
    //       user: 'plouc',
    //       columns: 1, rows: 1,
    //       x: 2, y: 0
    //     },
    //     {
    //       type: 'travis.repository',
    //       owner: 'plouc',
    //       repository: 'mozaik',
    //       columns: 1, rows: 1,
    //       x: 1, y: 0
    //     },
    //     {
    //       type: 'travis.build_histogram',
    //       owner: 'plouc',
    //       repository: 'mozaik',
    //       columns: 2, rows: 1,
    //       x: 1, y: 1
    //     }
    //   ]
    // }
  ]
};

module.exports = config;
