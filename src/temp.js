(() => {
  const LOCALHOST_URL = 'http://localhost:3000/index.js';
  const PROD_URL = 'https://cdn.jsdelivr.net/gh/ramp-development/repo@version/dist/index.js';

  let jsURLs;
  fetch(LOCALHOST_URL, {})
    .then(() => {
      console.log('LOCALHOST');
      jsURLs = createScripts(LOCALHOST_URL);
    })
    .catch(() => {
      jsURLs = createScripts(PROD_URL);
    })
    .finally(() => {
      insertScripts(jsURLs);
    });

  function createScripts(URL) {
    const script = document.createElement('script');
    script.defer = true;
    script.src = URL;

    return script;
  }

  function insertScripts(script) {
    document.head.appendChild(script);
  }
})();
