// main admin.js file

// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var users_key = {}
var users_list = []
var users_string_list = []

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
            users_container(users_list.length)
            table_of_users(users_list)
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/users.json')
request.send()

// creates table body for list of users
function users_container(list) {
    for (let i = 0; i < list; i++) {
        let table_row = document.createElement('tr')
        table_row.setAttribute('id', `row-${i}`)
        document.querySelector('#users-tbody').appendChild(table_row)
    }
}

function table_of_users(list) {
    let table_rows = document.querySelector('#users-tbody').childNodes
    for (let i = 0; i < list.length; i++) {
        let no = document.createElement('td')
        no.textContent = i + 1
        let name = document.createElement('td')
        name.textContent = list[i].name
        let surname = document.createElement('td')
        surname.textContent = list[i].surname
        let username = document.createElement('td')
        username.textContent = list[i].username
        let email = document.createElement('td')
        email.textContent = list[i].email
        let password = document.createElement('td')
        password.textContent = list[i].password
        let date = document.createElement('td')
        date.textContent = list[i].date
        let tel = document.createElement('td')
        tel.textContent = list[i].tel
        let address = document.createElement('td')
        address.textContent = list[i].address

        let edit_and_del = document.createElement('td')
        let edit = document.createElement('a')
        let edit_btn = document.createElement('button')
        edit_btn.classList.add('bg-dark')
        edit_btn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        edit_btn.addEventListener('click', () => { // relocate to users profile with id(i) to cut from URL
            window.document.location.href = "../html/admin-users-profile.html" + "?=" + i
        })
        edit.appendChild(edit_btn)

        let delete_ = document.createElement('a')
        delete_.innerHTML = `<button class="bg-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" onclick="delete_user_modal(${i})"><i class="fa-solid fa-trash-can"></i></button>`

        edit_and_del.appendChild(edit)
        edit_and_del.appendChild(delete_)

        table_rows[i + 1].appendChild(no)
        table_rows[i + 1].appendChild(name)
        table_rows[i + 1].appendChild(surname)
        table_rows[i + 1].appendChild(username)
        table_rows[i + 1].appendChild(email)
        table_rows[i + 1].appendChild(password)
        table_rows[i + 1].appendChild(date)
        table_rows[i + 1].appendChild(tel)
        table_rows[i + 1].appendChild(address)
        table_rows[i + 1].appendChild(edit_and_del)
    }
}

// DELETE USER
function delete_user_modal(index) { // modal for possibility of deleting user
    document.querySelector("#span-add-text").textContent = users_list[index].username
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
                        <p class="lead">You have successfully deleted ${users_list[index].username}.<br>
                        </p>
                    </div>
                </div>
            </div>
        </div>`
    document.querySelector('main').appendChild(after_del)

    document.querySelector("#delete-trigger").addEventListener('click', () => {
        // DELETE METHOD - DELETE/DEACTIVATE USER //
        var request = new XMLHttpRequest()
        request.open('DELETE', firebase_URL + '/users/' + users_string_list[index] + '.json', true)
        request.send()
        // delete row
        let removed = document.querySelector(`#row-${index}`)
        removed.remove()
    }
    )
}