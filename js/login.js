// implementation of login - NOTE: IT IS JUST SIMULATION THAT'S REASON WHY YOU CAN LOGIN AGAIN AND AGAIN
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var users_key = {}
var users_list = []
var max_count = 3
var log_count = 0

// request for getting users from firebase 
var request2 = new XMLHttpRequest()
request2.onreadystatechange = function () {
    if (request2.readyState == 4) { // 4 = done
        if (request2.status == 200) { // 200 = request2 sucess
            users_key = JSON.parse(request2.responseText)
            for (let i in users_key) {
                users_list.push(users_key[i])
            }
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request2.open('GET', firebase_URL + '/users.json')
request2.send()

function login() {
    let more = max_count - log_count
    if (log_count >= 3) {
        document.querySelector("#log-msg").innerHTML = `<small>Please try again later.</small>`
        document.querySelector("#login-confirm").disabled = true
    }
    else {
        let username = document.querySelector('#login-username').value
        let password = document.querySelector('#login-password').value
        for (let user in users_list) {
            if (username == users_list[user].username && password == users_list[user].password) {
                document.querySelector('#login-modal').innerHTML = `
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="login-modalLabel">Login</h5>
                                <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close" onclick="default_login_form()"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container py-4">
                                    <form id="login-form">
                                        <div class="row">
                                            <div class="col py-0 px-4">
                                                <h4>Logged in!</h4>
                                            </div>
                                        </div>                                                                                                   
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>`
                return
            }
            else if (username != users_list[user].username || password != users_list[user].password) {
                document.querySelector("#log-msg").innerHTML = `<small>Username and password combination is incorrect!<br> You can try ${more} times!</small>`
            }
        }
        log_count += 1
    }
}

function default_login_form() { // makes process same again
    document.querySelector('#login-modal').innerHTML =
        `<!-- akcija 'login' buttona -->
                           
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="login-modalLabel"><span>Login</span></h5>
                    <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="login-form">
                        <div class="py-3 mb-3 mx-4">
                            <label for="login-username" class="form-label"><span>Username: </span></label>
                            <input type="text" class="form-control" id="login-username" placeholder="Username" required>
                        </div>
                        <div class="mb-4 mx-4">
                            <label for="login-password" class="form-label"><span>Password: </span></label>
                            <input type="password" class="form-control" id="login-password" placeholder="Password" required>
                        </div>
                        <div class="red-center py-2" id="log-msg"></div>
                        <button type="button" class="btn btn-dark my-2 px-4" onclick="login()">Log in</button>
                    </form>
                </div>
                <div class="modal-footer justify-content-center gap-1">You don't have account?
                <button class="btn" data-bs-target="#register-modal" data-bs-toggle="modal" 
                    data-bs-dismiss="modal"><span class="red" onclick="date_max()">Register</span>
                </button>
            </div>
        </div>
    </div>`
}

