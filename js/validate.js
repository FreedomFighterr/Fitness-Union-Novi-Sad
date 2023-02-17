/* functions for validating inputs
    -line 3 for registration
    -line 95 for users
    -line 185 for gyms
*/

// FOR REGISTRATION

function validate_username(username) {
    // only letters and numbers between 2 and 25 characters 
    let expression = /^[a-zA-Z0-9]{2,25}$/
    if (expression.test(username) == true) {
        document.querySelector('#div-reg-username').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_name(name) {
    // only letters, first uppercase and length between 2 and 25 characters 
    let expression = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,25}$/
    if (expression.test(name) == true) {
        document.querySelector('#div-reg-name').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_surname(surname) {
    // only letters, first uppercase and length between 2 and 25 characters 
    let expression = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,25}$/
    if (expression.test(surname) == true) {
        document.querySelector('#div-reg-surname').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_email(email) {
    let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (expression.test(email) == true) {
        document.querySelector('#div-reg-email').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    // between 8 and 25 characters, at least one letter and one number 
    let expression = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,25}$/
    if (expression.test(password) == true) {
        document.querySelector('#div-reg-password').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_birth(birth) {
    // yyyy/mm/dd, maximum day of today 
    let expression = /^(19\d\d|20\d\d|21\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    if (expression.test(birth) == true) {
        document.querySelector('#div-reg-birth').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_tel(tel) {
    // between 9 to 10 digits 
    let expression = /^06[0-9]{7,8}$/
    if (expression.test(tel) == true) {
        document.querySelector('#div-reg-tel').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_address(address) {
    // street name and number, then optional white space and city name
    let expression = /^([A-ZŠĐŽČĆ][a-zšđžćč]*\s){1,}[0-9a-zA-Z]+(,\s)?[A-ZŠĐŽČĆ][a-zšđžćč]*(\s[A-ZŠĐŽČĆ][a-zšđžćč]*)*$/
    if (expression.test(address) == true) {
        document.querySelector('#div-reg-address').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}


// FOR EDITING USERS / KORISNICI: 

function validate_edit_username(username) {
    // only letters and numbers between 2 and 25 characters 
    let expression = /^[a-zA-Z0-9]{2,25}$/
    if (expression.test(username) == true) {
        document.querySelector('#div-edit-username').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_name(name) {
    // only letters, first uppercase and length between 2 and 25 characters 
    let expression = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,25}$/
    if (expression.test(name) == true) {
        document.querySelector('#div-edit-name').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_surname(surname) {
    // only letters, first uppercase and length between 2 and 25 characters 
    let expression = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,25}$/
    if (expression.test(surname) == true) {
        document.querySelector('#div-edit-surname').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_email(email) {
    let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (expression.test(email) == true) {
        document.querySelector('#div-edit-email').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_password(password) {
    // between 8 and 25 characters, at least one letter and one number 
    let expression = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,25}$/
    if (expression.test(password) == true) {
        document.querySelector('#div-edit-password').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_birth(birth) {
    // yyyy/mm/dd, maximum day of today 
    let expression = /^(19\d\d|20\d\d|21\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    if (expression.test(birth) == true) {
        document.querySelector('#div-edit-birth').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_tel(tel) {
    // between 9 to 10 digits 
    let expression = /^06[0-9]{7,8}$/
    if (expression.test(tel) == true) {
        document.querySelector('#div-edit-tel').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_address(address) {
    // street name and number, then optional white space and city name
    let expression = /^([A-ZŠĐŽČĆ][a-zšđžćč]*\s){1,}[0-9a-zA-Z]+(,\s)?[A-ZŠĐŽČĆ][a-zšđžćč]*(\s[A-ZŠĐŽČĆ][a-zšđžćč]*)*$/
    if (expression.test(address) == true) {
        document.querySelector('#div-edit-address').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}


// FOR GYMS

function validate_edit_title(title) {
    // between 2 to 70 letters allowed "-" and white space
    let expression = /^[a-zA-Z\s-]{2,70}$/
    if (expression.test(title) == true) {
        document.querySelector('#div-edit-title').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_gym_address(address) {
    // street name and number, then optional white space and city name
    let expression = /^([A-ZŠĐŽČĆ][a-zšđžćč]*\s){1,}[0-9a-zA-Z]+(,\s)?[A-ZŠĐŽČĆ][a-zšđžćč]*(\s[A-ZŠĐŽČĆ][a-zšđžćč]*)*(\s\d{0,5})?$/
    if (expression.test(address) == true) {
        document.querySelector('#div-edit-gym-address').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_year(year) {
    // at least 4 numbers with max number of currently year.
    let expression = /^\d{4}$/
    if (expression.test(year) == true) {
        document.querySelector('#div-edit-year').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_no_training(no_training) {
    // number above 0. also auto-round on two decimals.
    let expression = /[1-9]\d*(\.\d{1,2})?/
    if (expression.test(no_training) == true) {
        document.querySelector('#div-edit-year').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_monthly(monthly) {
    // number above 0.
    let expression = /^[0-9]\d*$/
    if (expression.test(monthly) == true) {
        document.querySelector('#div-edit-monthly').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}

function validate_edit_average(average) {
    // number between 0 and 10.
    let expression = /^[1-9]\d*(\.\d{1,2})?$|^10(\.00)?$/
    if (expression.test(average) == true) {
        document.querySelector('#div-edit-average').innerHTML = `` // clear text if error message is initialized earlier
        return true
    } else {
        return false
    }
}