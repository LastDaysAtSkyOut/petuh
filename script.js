function addRedirect() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const redirectUrl = "https://shikimori.one" + urlParams.get('url');
  console.log(redirectUrl);
  let $container = document.querySelector('.pusechka529');
  if (!$container) {
    window.location.href = redirectUrl;
  }
}

addRedirect();
