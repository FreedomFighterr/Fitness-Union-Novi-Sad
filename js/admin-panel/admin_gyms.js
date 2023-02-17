// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []
var gym_string_list = []

// request for getting gyms from firebase 
var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) { // 4 = done
        if (request.status == 200) { // 200 = request sucess
            gym_key = JSON.parse(request.responseText)
            for (let i in gym_key) {
                gym_list.push(gym_key[i])
                gym_string_list.push(i)
            }
            admin_gym_container(gym_list.length)
            table_of_gyms(gym_list)
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/gyms.json')
request.send()

// creates table body for list of fitness centres(gyms) 
function admin_gym_container(list) {
    for (let i = 0; i < list; i++) {
        let gym_table_row = document.createElement('tr')
        gym_table_row.setAttribute('id', `row-${i}`)
        document.querySelector('#admin-gym-tbody').appendChild(gym_table_row)
    }
}

// gym data from request 
function table_of_gyms(list) {
    let table_rows = document.querySelector('#admin-gym-tbody').childNodes
    for (let i = 0; i < list.length; i++) {
        let no = document.createElement('td')
        no.textContent = i + 1
        let name = document.createElement('td')
        name.textContent = list[i].name
        let address = document.createElement('td')
        address.textContent = list[i].address
        let year = document.createElement('td')
        year.textContent = list[i].year
        let number_of_trainings = document.createElement('td')
        number_of_trainings.textContent = list[i].number_of_trainings
        let training_id = document.createElement('td')
        training_id.textContent = list[i].training_id
        let monthly = document.createElement('td')
        monthly.textContent = list[i].monthly + " RSD"
        let average_grade = document.createElement('td')
        average_grade.textContent = list[i].average_grade
        let image = document.createElement('td')
        image.textContent = list[i].image
        let logo = document.createElement('td')
        logo.textContent = list[i].logo

        let edit_and_del = document.createElement('td')
        let edit = document.createElement('a')
        let edit_btn = document.createElement('button')
        edit_btn.classList.add('bg-dark')
        edit_btn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        edit_btn.addEventListener('click', () => { // relocate to gym profile with id(i) to cut from URL
            window.document.location.href = "../html/admin-gyms-profile.html" + "?=" + i
        })
        edit.appendChild(edit_btn)

        let delete_ = document.createElement('a')
        delete_.innerHTML = `<button class="bg-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" onclick="delete_gym_modal(${i})"><i class="fa-solid fa-trash-can"></i></button>`

        edit_and_del.appendChild(edit)
        edit_and_del.appendChild(delete_)

        table_rows[i + 1].appendChild(no)
        table_rows[i + 1].appendChild(name)
        table_rows[i + 1].appendChild(address)
        table_rows[i + 1].appendChild(year)
        table_rows[i + 1].appendChild(number_of_trainings)
        table_rows[i + 1].appendChild(training_id)
        table_rows[i + 1].appendChild(monthly)
        table_rows[i + 1].appendChild(average_grade)
        table_rows[i + 1].appendChild(image)
        table_rows[i + 1].appendChild(logo)
        table_rows[i + 1].appendChild(edit_and_del)
    }
}

// DELETE GYM
function delete_gym_modal(index) { // modal for possibility of deleting gym
    document.querySelector("#span-add-text").textContent = gym_list[index].name
    document.querySelector("#delete-trigger-footer").innerHTML = `   
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleted${index}" id="delete-trigger">Delete</button>`

    let after_del = document.createElement('div')
    after_del.innerHTML = `
        <div class="modal fade" id="deleted${index}" tabindex="-1" aria-labelledby="deleted${index}Label" data-bs-backdrop="static" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleted${index}Label">Brisanje</h5>
                        <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="lead">You have successfully deleted ${gym_list[index].name}.<br>
                        </p>
                    </div>
                </div>
            </div>
        </div>`
    document.querySelector('main').appendChild(after_del)

    document.querySelector("#delete-trigger").addEventListener('click', () => {
        // DELETE METHOD - DELETE/DEACTIVATE USER //
        var request = new XMLHttpRequest()
        request.open('DELETE', firebase_URL + '/gyms/' + gym_string_list[index] + '.json', true)
        request.send()
        // delete row
        let removed = document.querySelector(`#row-${index}`)
        removed.remove()
    }
    )
}