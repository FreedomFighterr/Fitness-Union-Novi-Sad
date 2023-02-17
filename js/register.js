/*  register implementation
    function register() is called after click from "potvrdi" button in registration-modal
    Through whole register function are implemented validation functions
    If register is successfull, side functions will make innerHTML different*/

function register() {
    var reg_username = document.querySelector('#reg-username').value
    var reg_name = document.querySelector('#reg-name').value
    var reg_surname = document.querySelector('#reg-surname').value
    var reg_email = document.querySelector('#reg-email').value
    var reg_password = document.querySelector('#reg-password').value
    var reg_birth = document.querySelector('#reg-birth').value
    var reg_tel = document.querySelector('#reg-tel').value
    var reg_address = document.querySelector('#reg-address').value
    var reg_object = {}

    // red message error will happen if something isn't TRUE
    if (validate_username(reg_username) == false) {
        document.querySelector('#div-reg-username').innerHTML = `
             <small>Invalid username! Must be between 2-25 characters (letters and numbers allowed).</small>
             `
    }
    else if (validate_name(reg_name) == false) {
        document.querySelector('#div-reg-name').innerHTML = `
             <small>Invalid name! Must be between 2-25 letters and first must be uppercase.</small>
             `
    }
    else if (validate_surname(reg_surname) == false) {
        document.querySelector('#div-reg-surname').innerHTML = `
             <small>Invalid surname! Must be between 2-25 letters and first must be uppercase.</small>
             `
    }
    else if (validate_email(reg_email) == false) {
        document.querySelector('#div-reg-email').innerHTML = `
             <small>Invalid email! etc: "test@webd.com"</small>
             `
    }
    else if (validate_password(reg_password) == false) {
        document.querySelector('#div-reg-password').innerHTML = `
             <small>Invalid password! Must be between 8-25 characters(at least one letter and one number).</small>
             `
    }
    else if (validate_birth(reg_birth) == false) {
        document.querySelector('#div-reg-birth').innerHTML = `
             <small>Invalid date! Please set your date correctly.</small>
             `
    }
    else if (validate_tel(reg_tel) == false) {
        document.querySelector('#div-reg-tel').innerHTML = `
             <small>Invalid phone! Must be 9 or 10 numbers that start as '06' so input would be valid.</small>
             `
    }
    else if (validate_address(reg_address) == false) {
        let city = document.querySelector('#div-reg-address')
        city.innerHTML = `
             <small>Invalid address! Please use next format: "street and number, city" where first letter of street and city name must be uppercase! </small>
             `
    }
    else {
        let counter = 1 // used as trigger
        for (let user in users_list) { // if username already exist it will show this red msg and break function //
            if (reg_username == users_list[user].username) {
                document.querySelector('#div-reg-username').innerHTML = `
                    <small>Username already exist!</small>`
                counter = 0 //error
            }
            else if (reg_email == users_list[user].email) {
                document.querySelector('#div-reg-email').innerHTML = `
                    <small>Email already taken!</small>`
                counter = 0 // error
            }
        }

        if (counter == 1) { // if none of these from 'else' above is true, counter will remain '1' so next action will happen
            reg_object = { // person object that will be transfered to firebase with function post_registration 
                address: reg_address,
                date: reg_birth,
                email: reg_email,
                name: reg_name,
                password: reg_password,
                surname: reg_surname,
                tel: reg_tel,
                username: reg_username
            }
            // sending data to firebase
            var request = new XMLHttpRequest()
            request.open('POST', firebase_URL + '/users.json')
            request.send(JSON.stringify(reg_object))

            after_reg(counter)
        }
    }
}

// SIDE FUNCTIONS FOR REGISTRATION (design after and before reg is success) //

function after_reg(counter) { // called after registration is successfull
    /* whenever it comes to there, counter will always be '1' so always will do this innerHTML. (it happens after reg is success)
        thing that is actually changed(besides message) here is Close button, he was given function default_reg_form() that will make 
        this form default again after closing */
    if (counter == 1) {
        document.querySelector('#register-modal').innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="register-modalLabel">Register</h5>
                        <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close" onclick="default_reg_form()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container py-4">
                            <form id="register-form">
                                    <div class="row">
                                        <div class="col py-0 px-4 text-center">
                                            <h4>Registered successful!</h4>
                                        </div>
                                    </div>                                                                                                   
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
        counter = 0 //now makes counter 0 again so innerHTML will be DEFAULT when user click on registration again...
    }
}

function default_reg_form() { // make innerHTML default again
    document.querySelector('#register-modal').innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="register-modalLabel">Register</h5>
                        <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container py-4  text-center">
                            <form id="register-form">
                                <div class="row">
                                    <div class="col py-0 px-4">
                                        <label class="form-label" for="reg-username">Username: </label>
                                        <input class="form-control" id="reg-username" type="text" placeholder="Username">
                                        <div class="red-center py-1" id="div-reg-username"></div>
    
                                        <label class="form-label pt-3" for="reg-name">Name: </label>
                                        <input class="form-control" id="reg-name" type="text" placeholder="Name">
                                        <div class="red-center py-1" id="div-reg-name"></div>
    
                                        <label class="form-label pt-3" for="reg-surname">Surname: </label>
                                        <input class="form-control" id="reg-surname" type="text" placeholder="Surname">
                                        <div class="red-center py-1" id="div-reg-surname"></div>
                                
                                        <label class="form-label pt-3" for="reg-email">E-Mail: </label>
                                        <input class="form-control" id="reg-email" type="email" placeholder="E-Mail">
                                        <div class="red-center py-1" id="div-reg-email"></div>
                                    
                                        <label class="form-label pt-3" for="reg-password">Password: </label>
                                        <input class="form-control" id="reg-password" type="password" placeholder="Password">
                                        <div class="red-center py-1" id="div-reg-password"></div>
                                    
                                        <label class="form-label pt-3" for="reg-birth">Date: </label>
                                        <input class="form-control" id="reg-birth" type="date" min='1900-01-01'>
                                        <div class="red-center py-1" id="div-reg-birth"></div>
                                
                                        <label class="form-label pt-3" for="reg-tel">Tel: </label>
                                        <input class="form-control" id="reg-tel" type="tel" placeholder="Your phone number">
                                        <div class="red-center py-1" id="div-reg-tel"></div>
                                
                                        <label class="form-label pt-3" for="reg-address">Address: </label>
                                        <input class="form-control" id="reg-address" type="text" placeholder="Address">
                                        <div class="red-center py-1" id="div-reg-address"></div>
    
                                    </div>
                                </div> 
                            <button type="button" class="btn btn-dark my-2 px-4" onclick="register()">Confirm</button>                                                                                                                
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `
}