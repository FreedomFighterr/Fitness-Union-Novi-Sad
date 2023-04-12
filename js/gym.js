// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []
var trainings_key = {}
var trainings_list = []
var trainings_str_list = []
var id = document.location.href.slice(-1)
var string_counter = 0
var gym_string_key = ""
var new_grades = []
var reload_count = 0

var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) { // 4 = done
        if (request.status == 200) { // 200 = request sucess
            gym_key = JSON.parse(request.responseText)
            for (let i in gym_key) {
                gym_list.push(gym_key[i])
                if (id == string_counter) {
                    gym_string_key = i
                }
                string_counter += 1
            }
            gym_load() // line 51
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/gyms.json')
request.send()


function gym_load() {
    let training_id = gym_list[id].training_id
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                trainings_key = JSON.parse(request.responseText)
                for (let i in trainings_key) {
                    if (i == training_id) {
                        let training = trainings_key[i]
                        let root = i
                        gym_training_cards(root, training) // calling function to create training cards 
                        trainings_list.push(training) // trainings array that contains training objects on index 0.
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

    //info
    document.querySelector('#title').textContent = gym_list[id].name
    document.querySelector('#p-gym-name').textContent = "Name: " + gym_list[id].name
    document.querySelector('#p-gym-address').textContent = "Address: " + gym_list[id].address
    document.querySelector('#p-gym-year').textContent = "Year of opening: " + gym_list[id].year
    document.querySelector('#gym-logo').src = `${gym_list[id].logo}`
    document.querySelector('#gym-logo').alt = `${gym_list[id].name}`
    document.querySelector('#p-gym-available').textContent = "Number of available trainings: " + gym_list[id].number_of_trainings
    document.querySelector('#p-gym-average').textContent = "Average grade: " + gym_list[id].average_grade
    document.querySelector('#p-gym-monthly').textContent = "Monthly: " + gym_list[id].monthly + " RSD"

    // gallery
    let img_1 = document.createElement('img')
    img_1.classList.add('w-100')
    img_1.src = gym_list[id].image
    img_1.alt = gym_list[id].name + "1st image"
    let img_2 = document.createElement('img')
    img_2.classList.add('w-100')
    img_2.src = gym_list[id].image
    img_2.style.opacity = "0.5"
    img_2.alt = gym_list[id].name + "2nd image"
    

    document.querySelector('#carousel-item-1').appendChild(img_1)
    document.querySelector('#carousel-item-2').appendChild(img_2)

    // votes
    vote_load()
}


// function that is called from get_treninzi and creates training cards on gym pages. 
function gym_training_cards(root, training) {
    let counter = 0 // counter for training key, used for training_load
    for (let i in training) {
        let div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-6')

        let card = document.createElement('div')
        card.classList.add('card', 'bg-dark')

        let img = document.createElement('img')
        img.classList.add('training-card')
        img.src = "../images/trainings/template_1.jpg"
        img.alt = training[i].name

        let card_body = document.createElement('div')
        card_body.classList.add('card-body', 'min-body')

        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.textContent = training[i].name

        let paragraph = document.createElement('p')
        paragraph.classList.add('card-text', 'same-size')
        paragraph.innerHTML =
            `Type: ${training[i].type}<br>
        Duration: ${training[i].duration}<br>
        Max. number of people: ${training[i].max_person}<br>
        Short description: ${training[i].short_desc}`

        let a = document.createElement('a')
        a.classList.add('btn', 'btn-outline-light', 'px-5')
        a.textContent = "More info"
        a.style = "margin: 0px auto;"
        a.addEventListener('click', () => {
            window.document.location.href = "../html/training.html" + "?=" + gym_list[id].name.replaceAll(" ", "") + "?=" + root + "?=" + i
        })

        div.appendChild(card)
        card.appendChild(img)
        card.appendChild(card_body)
        card_body.appendChild(h5)
        card_body.appendChild(paragraph)
        card_body.appendChild(a)

        document.querySelector('#training-row').appendChild(div)  // container of cards 
        counter += 1
    }
}

function vote_load() {
    document.querySelector('#paragraph-gym-rating').textContent = "Average grade: " + gym_list[id].average_grade
    let number_of_grades = [] // list of all grades 
    let grades_1 = []
    let grades_2 = []
    let grades_3 = []
    let grades_4 = []
    let grades_5 = []
    let progress_1_grades = 0
    let progress_2_grades = 0
    let progress_3_grades = 0
    let progress_4_grades = 0
    let progress_5_grades = 0

    let progress_width = 100 // maximum width for progress bar 
    let progress_1_width = 0 // progress bar 1
    let progress_2_width = 0 // progress bar 2
    let progress_3_width = 0 // progress bar 3 
    let progress_4_width = 0 // progress bar 4
    let progress_5_width = 0 // progress bar 5 

    // number of votes counter 
    for (let i in gym_list[id].grades) {
        number_of_grades.push(i)
        if (gym_list[id].grades[i] == 1) {
            grades_1.push(gym_list[id].grades[i])
            progress_1_grades += 1
        }
        if (gym_list[id].grades[i] == 2) {
            grades_2.push(gym_list[id].grades[i])
            progress_2_grades += 1
        }
        if (gym_list[id].grades[i] == 3) {
            grades_3.push(gym_list[id].grades[i])
            progress_3_grades += 1
        }
        if (gym_list[id].grades[i] == 4) {
            grades_4.push(gym_list[id].grades[i])
            progress_4_grades += 1
        }
        if (gym_list[id].grades[i] == 5) {
            grades_5.push(gym_list[id].grades[i])
            progress_5_grades += 1
        }
    }

    /* width in progress bar counter - first combined all grades and progress of 100 divided by number of grades...
    example: 100 / 5(grades) is 20, so if my progress_bar_1 have 3 grad my barr will go 60% because 3 of 5 is 60% */
    let all_grades_number = progress_1_grades + progress_2_grades + progress_3_grades + progress_4_grades + progress_5_grades
    progress_width = progress_width / all_grades_number
    progress_1_width = progress_width * progress_1_grades
    progress_2_width = progress_width * progress_2_grades
    progress_3_width = progress_width * progress_3_grades
    progress_4_width = progress_width * progress_4_grades
    progress_5_width = progress_width * progress_5_grades

    document.querySelector('#progress-1').style.width = progress_1_width + "%"
    document.querySelector('#progress-2').style.width = progress_2_width + "%"
    document.querySelector('#progress-3').style.width = progress_3_width + "%"
    document.querySelector('#progress-4').style.width = progress_4_width + "%"
    document.querySelector('#progress-5').style.width = progress_5_width + "%"

    document.querySelector('#p-one-star').textContent = "1 STAR - Number of votes: " + progress_1_grades
    document.querySelector('#p-two-star').textContent = "2 STAR - Number of votes: " + progress_2_grades
    document.querySelector('#p-three-star').textContent = "3 STAR - Number of votes: " + progress_3_grades
    document.querySelector('#p-four-star').textContent = "4 STAR - Number of votes: " + progress_4_grades
    document.querySelector('#p-five-star').textContent = "5 STAR - Number of votes: " + progress_5_grades

    if (reload_count == 0) { // if its reloaded, this will not happen.
        for (let j = 1; j <= 5; j++) {
            let btn = document.createElement('button')
            btn.classList.add('vote-btn')
            btn.setAttribute = ('id', `vote-btn-${j}`)
            btn.innerHTML = `<span class="fa fa-star">${j}</span>`
            btn.addEventListener('click', () => {
                vote(j, id) // j=grade, id=GYM ID
            })
            document.querySelector('#paragraph-rate-us').appendChild(btn)
        }
    }
    reload_count = 1
}

function vote(grade, id) { // function used for sending new grades to firebase
    let grades_combined = grade
    let counter = 1
    for (let i in gym_list[id].grades) { // taking all grades from firebase and store them in new_grades array
        new_grades.push(gym_list[id].grades[i])
        grades_combined += gym_list[id].grades[i]
        counter += 1
    }
    new_grades.push(grade) // also pushing new grade to that array and do math for new average grade
    new_average_grade = grades_combined / counter
    new_average_grade = new_average_grade.toFixed(2)

    var request = new XMLHttpRequest()
    request.open('PUT', firebase_URL + '/gyms/' + gym_string_key + '/grades.json')
    request.send(JSON.stringify(new_grades))
    new_average_rating()

    var btn2 = document.createElement('button')
    btn2.textContent = "Refresh results"
    btn2.classList.add('btn', 'btn-dark', 'p-3', 'm-0')
    btn2.setAttribute('id', 'btn-reload')

    btn2.addEventListener('click', () => { // incase of refreshing, this function will happen
        btn2.disabled = true //after refresh button will be disabled
        var request2 = new XMLHttpRequest()
        request2.onreadystatechange = function () {
            if (request2.readyState == 4) {
                if (request2.status == 200) {
                    gym_key = JSON.parse(request2.responseText)
                    gym_list = []
                    for (let i in gym_key) {
                        gym_list.push(gym_key[i])
                    }
                    vote_load(id)
                }
                document.querySelector('#paragraph-rate-us').textContent = "Thank you for rating us!"
                document.querySelector('#paragraph-gym-rating').textContent = "Average grade: " + gym_list[id].average_grade
            }
        }
        request2.open('GET', firebase_URL + '/gyms.json')
        request2.send()
    })
    document.querySelector('#vote-holder').appendChild(btn2)

}
function new_average_rating() { // function for making new average grade before reload
    var request = new XMLHttpRequest()
    request.open('PUT', firebase_URL + '/gyms/' + gym_string_key + '/average_grade.json')
    request.send(JSON.stringify(new_average_grade))
}
