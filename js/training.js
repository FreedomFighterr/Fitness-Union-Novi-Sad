// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []
var trainings_key = {}
var trainings_list = []
var trainings_string_list = []
var url_split = document.location.href.split("?=")
var gym_name = url_split[1]
var root_id = url_split[2]
var id = url_split[3]
var active_training

var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200) {
            trainings_key = JSON.parse(request.responseText)
            for (let i in trainings_key) {
                if (i == root_id) {
                    for (let m in trainings_key[i]) {
                        if (id != m) {
                            trainings_string_list.push(m) // list of all strings which are not same as in URL(for making other training cards)
                            trainings_list.push(trainings_key[i][m])
                        }
                    }

                }
            }
            for (let j in trainings_key) {
                if (j == root_id) {
                    for (let k in trainings_key[j]) {
                        if (id == k) {
                            active_training = trainings_key[j][k]
                            training_load() // line 51
                            other_training_cards() // line 65
                        }
                    }
                }
            }
        }

        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/trainings.json')
request.send()

// function that loads all training info
function training_load() {
    document.querySelector('#title').textContent = active_training.name
    document.querySelector('#p-training-name').textContent = "Name: " + active_training.name
    document.querySelector('#p-training-type').textContent = "Type: " + active_training.type
    document.querySelector('#p-training-max').textContent = "Max. number of people: " + active_training.max_person
    document.querySelector('#p-training-duration').textContent = "Duration: " + active_training.duration + " min"
    document.querySelector('#h3-training-name').textContent = "Description of " + active_training.name
    document.querySelector('#p-training-description').textContent = active_training.description
    document.querySelector('#h3-training-meaning').textContent = "Meaning of " + active_training.name
    document.querySelector('#p-training-meaning').textContent = active_training.short_desc
}

// function that creates OTHER-TRAINING -training cards on gym pages.
function other_training_cards() {
    for (let i in trainings_list) {
        let div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-6')

        let card = document.createElement('card')
        card.classList.add('card', 'bg-dark')

        let img = document.createElement('img')
        img.classList.add('training-card')
        img.src = "../images/trainings/template_1.jpg"
        img.alt = trainings_list[i].name + "pic"

        let card_body = document.createElement('div')
        card_body.classList.add('card-body', 'text-center')

        let h4 = document.createElement('h4')
        h4.classList.add('card-title')
        h4.textContent = trainings_list[i].name

        let paragraph = document.createElement('p')
        paragraph.classList.add('card-text', 'same-size')
        paragraph.innerHTML =
            `Type: ${trainings_list[i].type}<br>
        Duration: ${trainings_list[i].duration}<br>
        Max. number of people: ${trainings_list[i].max_person}<br>
        Description: ${trainings_list[i].short_desc}`

        let a = document.createElement('a')
        a.classList.add('btn', 'btn-outline-light', 'px-3')
        a.textContent = 'More info'
        a.addEventListener('click', () => {
            document.location.href = "../html/training.html" + "?=" + gym_name + "?=" + root_id + "?=" + trainings_string_list[i]
        })

        div.appendChild(card)
        card.appendChild(img)
        card.appendChild(card_body)
        card_body.appendChild(h4)
        card_body.appendChild(paragraph)
        card_body.appendChild(a)

        document.querySelector('#other-training-row').append(div)
    }
}