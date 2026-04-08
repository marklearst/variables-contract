// Vercel Web Analytics initialization
// https://vercel.com/docs/analytics
window.va =
  window.va ||
  function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

// Dynamically load the Vercel Analytics script
(function () {
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
