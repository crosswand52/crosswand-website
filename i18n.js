const path = require('path');
const i18next = require('i18next');
const Backend = require('i18next-chained-backend');
const FsBackend = require('i18next-fs-backend');
const LocalStorageBackend = require('i18next-localstorage-backend');

const i18n = i18next.createInstance();

i18n
  .use(Backend)
  .init({
    interpolation: {
      escape: (str) => str
    },
    fallbackLng: 'en',
    preload: ['en', 'ko'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      backends: [
        LocalStorageBackend,
        FsBackend
      ],
      backendOptions: [{
        // expirationTime: 3 * 24 * 60 * 60 * 1000, // 3 days
        expirationTime: 10,
        versions: {
          en: 'v1.0',
          ko: 'v1.0'
        }
      }, {
        loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      }]
    },
  }, (err, t) => {
    console.log(err);
  });

module.exports = i18n;