function inject() {
  let injectScript = document.createElement('script');
  injectScript.src = "https://lastdaysatskyout.github.io/petuh_na_more_2/tooltip/inject.js";
  document.head.append(injectScript);

// let container = document.createElement('div');
// container.style.width = '100%';
// container.style.height = '100%';
// container.style.position = 'fixed';
// container.style.top = '0';
// container.style.left = '0';
//   container.style.zIndex = '9999';
//   container.style.pointerEvents = 'none';
// document.body.append(container);
// fireScript.onload = function() {
//   const fireworks = new Fireworks.default(container);
//   fireworks.start()
// }
}

function addRedirect() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const redirectUrl = urlParams.get('url');
  console.log(redirectUrl);
  let $container = document.querySelector('.pusechka529');
  if (!$container) {
    window.location.href = redirectUrl;
  }
}

inject();
document.addEventListener('turbolinks:load', inject);
document.addEventListener('turbolinks:load', addRedirect);
