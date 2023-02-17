// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []

var request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) { // 4 = done
        if (request.status == 200) { // 200 = request sucess
            gym_key = JSON.parse(request.responseText)
            for (let i in gym_key) {
                gym_list.push(gym_key[i])
            }
            index_container(gym_list) // line 24
        }
        else {
            document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
        }
    }
}
request.open('GET', firebase_URL + '/gyms.json')
request.send()

function index_container(list) { // create container for cards on homepage 
    for (let i = 0; i < list.length; i++) {
        let div = document.createElement('div')
        div.classList.add('col-xxl-4', 'col-md-6', 'index-gym')
        document.querySelector('#index-gyms-container').appendChild(div)

        let card = document.createElement('div')
        card.classList.add('card', 'bg-dark', 'text-center')

        let img = document.createElement('img')
        img.classList.add('index-gym-picture')
        img.src = list[i].image
        img.alt = list[i].name

        let card_body = document.createElement('div')
        card_body.classList.add('card-body', 'index-card-body')

        let card_h4 = document.createElement('h4')
        card_h4.classList.add('card-title')
        card_h4.textContent = list[i].name

        let card_text = document.createElement('p')
        card_text.classList.add('card-text')
        card_text.innerHTML = `Address: ${list[i].address}<br>Monthly: ${list[i].monthly} RSD<br>Rating: ${list[i].average_grade}`

        let a = document.createElement('a')
        a.classList.add('btn', 'btn-outline-light', 'px-5', 'mb-2')
        a.textContent = "More info"
        a.style = "margin: 0px auto;"
        a.addEventListener('click', () => {
            document.location.href = "../html/gym.html" + "?=" + list[i].name.replaceAll(" ", "") + "?=" + i
        })

        div.appendChild(card)
        card.appendChild(img)
        card.appendChild(card_body)
        card_body.appendChild(card_h4)
        card_body.appendChild(card_text)
        card_body.appendChild(a)
    }
}

