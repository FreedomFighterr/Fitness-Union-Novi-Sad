// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []
var gym_string_list = []
var url_split = document.location.href.split("?=")
var index = url_split[1]
index = parseInt(index)
var gym_obj = {}

// request for getting gym from firebase 
var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) { // 4 = done
        if (request.status == 200) { // 200 = request sucess
            gym_key = JSON.parse(request.responseText)
            for (let i in gym_key) {
                gym_list.push(gym_key[i])
                gym_string_list.push(i)
            }
            edit_gym_page_load()
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/gyms.json')
request.send()

function edit_gym_page_load() {
    document.querySelector('main').innerHTML =
        `<div class="container" id="profile-container">
        <div class="row">
            <div class="col-lg-12 my-4">
                <a href="../html/admin-gyms.html"><p class="lead">Go back</p></a>
            </div>
            <div class="col-lg-12">
                <h3 class="text-center my-3">GYM # ${gym_list[index].name}</h1>  
            </div>
            <div class="col-lg-6 spacing-class-sm">
                <img class="edit-gym-logo my-3" src="${gym_list[index].logo}" alt="${gym_list[index].name} Logo"><br>
            </div>
            <div class="col-lg-6 spacing-class-sm spacing-footer">
                <form id="izmjena-fitness-form">
                    <div class="row">
                        <div class="col">
                            <label class="form-label" for="fitness-title">Name: </label>
                            <input class="form-control" id="fitness-title" type="text" value="${gym_list[index].name}"><br>  
                            <div class="red-center mb-2" id="div-edit-title"></div>

                            <label class="form-label" for="fitness-address">Address: </label>
                            <input class="form-control" id="fitness-address" type="text"
                                value="${gym_list[index].address}"><br>
                            <div class="red-center mb-2" id="div-edit-gym-address"></div>
                            
                            <label class="form-label" for="fitness-year">Year of opening: </label>
                            <input class="form-control" id="fitness-year" type="number" value="${gym_list[index].year}"><br>
                            <div class="red-center mb-2" id="div-edit-year"></div>

                            <label class="form-label" for="fitness-no-training">No. of available trainings: </label>
                            <input class="form-control" id="fitness-no-training" type="number" value="${gym_list[index].number_of_trainings}"><br>
                            <div class="red-center mb-2" id="div-edit-no-training"></div>
                            
                            <label class="form-label" for="fitness-id-training">Training ID: </label>
                            <input class="form-control" id="fitness-id-training" type="text" value="${gym_list[index].training_id}"><br>
                            <div class="red-center mb-2" id="div-edit-id-training"></div>

                            <label class="form-label" for="fitness-monthly">Monthly: </label>
                            <input class="form-control" id="fitness-monthly" type="number" value="${gym_list[index].monthly}"><br>
                            <div class="red-center mb-2" id="div-edit-monthly"></div>

                            <label class="form-label" for="fitness-average">Average grade: </label>
                            <input class="form-control" id="fitness-average" type="number" value="${gym_list[index].average_grade}"><br>
                            <div class="red-center mb-2" id="div-edit-average"></div>

                            <label class="form-label" for="fitness-picture">Image URL: </label>
                            <input class="form-control" id="fitness-picture" type="text" value="${gym_list[index].image}"><br>
                            <div class="red-center mb-2" id="div-edit-picture"></div>

                            <label class="form-label" for="fitness-logo">Logo URL: </label>
                            <input class="form-control" id="fitness-logo" type="text" value="${gym_list[index].logo}"><br>
                            <div class="red-center mb-2" id="div-edit-logo"></div>

                            <div class="col text-center my-3">
                                <button type="button" class="btn btn-outline-light px-5" id="save-gym-btn" onclick="change_gym_data(${index})">Save</button>
                                <p class="lead py-3" id="success-edit-paragraph"></p>
                            </div>
  
                        </div>
                    </div>
                </form>
  
            </div>
        </div>
    </div>           
    `
}

// CHANGE DATA ABOUT GYMS
function change_gym_data(index) {
    document.querySelector('#success-edit-paragraph').textContent = " "

    let edit_title = document.querySelector('#fitness-title').value
    let edit_address = document.querySelector('#fitness-address').value
    let edit_year = document.querySelector('#fitness-year').value
    let edit_no_training = document.querySelector('#fitness-no-training').value
    let edit_id_training = document.querySelector('#fitness-id-training').value
    let edit_monthly = document.querySelector('#fitness-monthly').value
    let edit_average = document.querySelector('#fitness-average').value
    let edit_picture = document.querySelector('#fitness-picture').value
    let edit_logo = document.querySelector('#fitness-logo').value

    if (validate_edit_title(edit_title) == false) {
        document.querySelector('#div-edit-title').innerHTML = `
         <small>Incorrect gym username format! It must contain between 2-50 letters.</small>
         `
    }
    else if (validate_edit_gym_address(edit_address) == false) {
        document.querySelector('#div-edit-gym-address').innerHTML = `
        <small>Incorrect address format! Please enter the address in the format "street and number, city zip code" where the first letter of the name of the street and city must be a capital letter!</small>
         `
    }
    else if (validate_edit_year(edit_year) == false) {
        document.querySelector('#div-edit-year').innerHTML = `
         <small>Opening year format incorrect! It must contain 4 numbers, the maximum of which is the current year.</small>`
    }
    else if (validate_edit_no_training(edit_no_training) == false) {
        document.querySelector('#div-edit-no-training').innerHTML = `
         <small>Incorrect format of the number of training sessions available! Must contain a number greater than 0.</small>
         `
    }
    else if (validate_edit_monthly(edit_monthly) == false) {
        document.querySelector('#div-edit-monthly').innerHTML = `
         <small>Incorrect monthly membership fee format! It must contain only numbers</small>
         `
    }
    else if (validate_edit_average(edit_average) == false) {
        document.querySelector('#div-edit-average').innerHTML = `
         <small>Incorrect format of the number of average marks! It must contain only a number greater than 0.</small>
         `
    }
    else {
        gym_obj = { // gym object that will be changed
            address: edit_address,
            average_grade: edit_average,
            grades: gym_list[index].grades,
            image: edit_picture,
            logo: edit_logo,
            monthly: edit_monthly,
            name: edit_title,
            number_of_trainings: edit_no_training,
            training_id: edit_id_training,
            url: gym_list[index].url,
            year: edit_year
        }
        document.querySelector('#success-edit-paragraph').textContent = "Changes made successfully!"
        // function used for sending new gym data to firebase
        put_gym_data(index, gym_obj)
    }
}

// function for changing data of user 
function put_gym_data(index, gym_obj) {
    var request = new XMLHttpRequest()
    request.open('PUT', firebase_URL + '/gyms/' + gym_string_list[index] + '.json', true)
    request.send(JSON.stringify(gym_obj))
}