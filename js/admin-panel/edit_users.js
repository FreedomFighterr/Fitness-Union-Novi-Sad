// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var users_key = {}
var users_list = []
var users_string_list = []
var url_split = document.location.href.split("?=")
var index = url_split[1]
index = parseInt(index)
var user_obj = {}

// request for getting users from firebase 
var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) { // 4 = done
        if (request.status == 200) { // 200 = request sucess
            users_key = JSON.parse(request.responseText)
            for (let i in users_key) {
                users_list.push(users_key[i])
                users_string_list.push(i)
            }
            edit_users_load()
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/users.json')
request.send()

function edit_users_load() {
    document.querySelector('main').innerHTML =
        `<div class="container" id="profile-container">
        <div class="row">
            <div class="col-lg-12 my-4">
                <a href="../html/admin-panel.html"><p class="lead">Back</p></a>
            </div>
            <div class="col-lg-12">
                <h3 class="text-center my-3">User account:<br>ID # ${index + 1}</h3>  
            </div>
            <div class="col-lg-6 spacing-class-sm">
                <img class="profile img-fluid my-3" src="../images/main/profile.jpg" alt="Profile Logo"><br>
            </div>
            <div class="col-lg-6 spacing-class-sm spacing-footer">
                <form id="change-profile-form">
                    <div class="row">
                        <div class="col">
                            <label class="form-label" for="profile-name">Name: </label>
                            <input class="form-control" id="profile-name" type="text" value="${users_list[index].name}"><br>
                            <div class="red-center mb-2" id="div-edit-name"></div>

                            <label class="form-label" for="profile-surname">Surname: </label>
                            <input class="form-control" id="profile-surname" type="text" value="${users_list[index].surname}"><br>
                            <div class="red-center mb-2" id="div-edit-surname"></div>

                            <label class="form-label" for="profile-username">Username: </label>
                            <input class="form-control" id="profile-username" type="text" value="${users_list[index].username}"><br>
                            <div class="red-center mb-2" id="div-edit-username"></div>

                            <label class="form-label" for="profile-email">E-Mail: </label>
                            <input class="form-control" id="profile-email" type="email"
                                value="${users_list[index].email}"><br>
                            <div class="red-center mb-2" id="div-edit-email"></div>

                            <label class="form-label" for="profile-password">Password: </label>
                            <input class="form-control" id="profile-password" type="text" value="${users_list[index].password}"><br>
                            <div class="red-center mb-2" id="div-edit-password"></div>

                            <label class="form-label" for="profile-birth">Date of birth: </label>
                            <input class="form-control" id="profile-birth" type="text" value="${users_list[index].date}"><br>
                            <div class="red-center mb-2" id="div-edit-birth"></div>

                            <label class="form-label" for="profile-tel">Phone number: </label>
                            <input class="form-control" id="profile-tel" type="tel" value="${users_list[index].tel}"><br>
                            <div class="red-center mb-2" id="div-edit-tel"></div>

                            <label class="form-label" for="profile-address">Address: </label>
                            <input class="form-control" id="profile-address" type="text"
                                value="${users_list[index].address}"><br>
                            <div class="red-center mb-2" id="div-edit-address"></div>

                            <div class="col text-center my-3">
                                <button type="button" class="btn btn-outline-light px-5" id="save-user-btn" onclick="change_users_data(${index})">Save</button>
                                <p class="lead py-3" id="success-edit-paragraph"></p>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>`
}

function change_users_data(index) {
    document.querySelector('#success-edit-paragraph').textContent = " "

    let edit_username = document.querySelector('#profile-username').value
    let edit_name = document.querySelector('#profile-name').value
    let edit_surname = document.querySelector('#profile-surname').value
    let edit_email = document.querySelector('#profile-email').value
    let edit_password = document.querySelector('#profile-password').value
    let edit_birth = document.querySelector('#profile-birth').value
    let edit_tel = document.querySelector('#profile-tel').value
    let edit_address = document.querySelector('#profile-address').value

    if (validate_edit_username(edit_username) == false) {
        document.querySelector('#div-edit-username').innerHTML = `
         <small>Incorrect username format! Must contain between 2-25 characters (supports letters and numbers).</small>
         `
    }
    else if (validate_edit_name(edit_name) == false) {
        document.querySelector('#div-edit-name').innerHTML = `
         <small>Incorrect name format! It must contain between 2-25 letters, the first of which must be uppercase.</small>
         `
    }
    else if (validate_edit_surname(edit_surname) == false) {
        document.querySelector('#div-edit-surname').innerHTML = `
         <small>Incorrect last name format! It must contain between 2-25 letters, the first of which must be uppercase.</small>
         `
    }
    else if (validate_edit_email(edit_email) == false) {
        document.querySelector('#div-edit-email').innerHTML = `
         <small>Incorrect email address format! eg: "test@gmail.com"</small>
         `
    }
    else if (validate_edit_password(edit_password) == false) {
        document.querySelector('#div-edit-password').innerHTML = `
         <small>Incorrect password format! It must contain between 8-25 characters (at least one letter and at least one number).</small>
         `
    }
    else if (validate_edit_birth(edit_birth) == false) {
        document.querySelector('#div-edit-birth').innerHTML = `
         <small>Incorrect date of birth format! Please set the correct date of birth.</small>
         `
    }
    else if (validate_edit_tel(edit_tel) == false) {
        document.querySelector('#div-edit-tel').innerHTML = `
         <small>Incorrect phone number format! It must contain 9 or 10 numbers starting with '06' for the entry to be valid.</small>
         `
    }
    else if (validate_edit_address(edit_address) == false) {
        let city = document.querySelector('#div-edit-address')
        city.innerHTML = `
         <small>Incorrect address format! Please enter the address in the format "street and number, city" where the first letter of the name of the street and city must be a capital letter!</small>
         `
    }
    else {
        user_obj = { // person object that will be changed
            address: edit_address,
            date: edit_birth,
            email: edit_email,
            name: edit_name,
            username: edit_username,
            password: edit_password,
            surname: edit_surname,
            tel: edit_tel
        }
        document.querySelector('#success-edit-paragraph').textContent = "Changes made successfully!"
        // function used for sending new user data to firebase
        put_user(index, user_obj)
    }
}

// function for changing data of user 
function put_user(index, user_obj) {
    var request = new XMLHttpRequest()
    request.open('PUT', firebase_URL + '/users/' + users_string_list[index] + '.json', true)
    request.send(JSON.stringify(user_obj))
}
