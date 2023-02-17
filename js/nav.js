// URL of firebase
var firebase_URL = 'https://test-5ff89-default-rtdb.firebaseio.com';
var gym_key = {}
var gym_list = []

// Function that creates nav_menu with modals and settings load also
function nav_load() {
    let nav = document.createElement('nav')
    let login = document.createElement('div')
    let register = document.createElement('div')

    nav.innerHTML =
        `<nav class="navbar navbar-expand-xl navbar-dark text-center"> <!-- fixed-top (razmotriti da li ubaciti)-->
        <div class="container">
            <a class="navbar-brand" href="../html/index.html">
                <img class="fu-logo" src="../images/main/logo.png" alt="Fitness-Union Logo">
            </a>

            <!-- hamburger menu that appears under 1200px -->
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#hamburger-menu" aria-controls="hamburger-menu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="offcanvas offcanvas-end text-bg-dark" id="hamburger-menu">
                <div class="offcanvas-header justify-content-end">                         
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav ms-auto m-2" id="nav-ul">
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="../html/index.html">Homepage</a>
                        </li>
                        <li class="nav-item mx-3 dropdown" id="fitness-dropdown-list">
                            <a href="#" class="nav-link dropdown-toggle" href="#" id="fitness-dropdown" role="button" 
                                data-bs-toggle="dropdown" aria-expanded="false">Fitness Centres
                            </a>
                            
                            <!-- import code from nav_dropdown_menu function -->
                            <ul class="dropdown-menu dropdown-nav" aria-labelledby="fitness-dropdown">
                                
                            </ul>
                        </li> 
                        
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="../html/admin-panel.html">Admin Panel</a>
                        </li> 

                        <!-- login button -->
                        <button type="button" class="btn mx-3 px-5 btn-red" data-bs-toggle="modal"
                            data-bs-target="#login-modal">
                            Login
                        </button>   
                    </ul>
                </div>
            </div>
        </div>
    </nav>`;

    login.innerHTML =
        `<!-- login action button -->
                           
    <div class="modal" id="login-modal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="login-modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="login-modalLabel"><span>Login</span></h5>
                    <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="login-modal-body">
                    <form id="login-form">
                        <div class="py-3 mb-3 mx-4">
                            <label for="login-username" class="form-label"><span>Username: </span></label>
                            <input type="text" class="form-control" id="login-username" placeholder="Username" required>
                        </div>
                        <div class="mb-2 mx-4">
                            <label for="login-password" class="form-label"><span>Password: </span></label>
                            <input type="password" class="form-control" id="login-password" placeholder="Password" required>
                        </div>
                        <div class="red-center py-2" id="log-msg"></div>
                            <button type="button" class="btn btn-dark my-2 px-4" id="login-confirm" onclick="login()">Log in</button>
                    </form>
                </div>
                <div class="modal-footer justify-content-center gap-1">You don't have account? 
                <button class="btn" data-bs-target="#register-modal" data-bs-toggle="modal" 
                    data-bs-dismiss="modal"><span class="red" onclick="date_max()">Register</span>
                </button>
            </div>
        </div>
    </div>
    </div>`


    register.innerHTML =
        `<!-- register button action -->

    <div class="modal fade modal modal-lg" id="register-modal" data-bs-backdrop="static"
        aria-hidden="true" aria-labelledby="register-modalLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="register-modalLabel">Register</h5>
                    <button type="button" class="btn-close bg-light mx-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="container py-4">
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
    </div>
    `

    let nav_holder = document.querySelector('#nav-holder')
    nav_holder.appendChild(nav)
    nav_holder.appendChild(login)
    nav_holder.appendChild(register)

    // request for gym list
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState == 4) { // 4 = done
            if (request.status == 200) { // 200 = request sucess
                gym_key = JSON.parse(request.responseText)
                gym_list = []
                for (let i in gym_key) {
                    gym_list.push(gym_key[i])
                }
                nav_dropdown_menu(gym_list)
            }
            else {
                document.write("ERROR 404 PLEASE TRY AGAIN LATER!")
            }
        }
    }
    request.open('GET', firebase_URL + '/gyms.json')
    request.send()
}

// function that creates list of gyms in navigation dropdown-menu
function nav_dropdown_menu(list) {
    for (let i in list) {
        let child = document.createElement('li')
        child.classList.add('dropdown-item', 'bg-dark')
        child.innerHTML = `<a class="w-100" data-bs-dismiss="offcanvas">${list[i].name}</a>`
        child.addEventListener('click', () => {
            document.location.href = "../html/gym.html" + "?=" + list[i].name.replaceAll(" ", "") + "?=" + i
        })

        document.querySelector('.dropdown-nav').appendChild(child)
    }
}

function date_max() {
    // setting date - max today 
    var today = new Date();
    var days = today.getDate();
    var months = today.getMonth() + 1; // January is 0
    var years = today.getFullYear();

    if (days < 10) {
        days = '0' + days;
    }
    if (months < 10) {
        months = '0' + months;
    }
    today = years + '-' + months + '-' + days;
    document.querySelector("#reg-birth").setAttribute("max", today);
}

// function for footer load.
function footer_load() {
    let footer_child = document.createElement('div')
    footer_child.innerHTML = `
    <div class="container text-center">
        
        <div class="row d-flex justify-content-center pb-4">
            <div class="col-lg-12 pt-4">
                <a href="../html/index.html">Homepage</a><br>
            </div>
            
            <div class="col-lg-12 pt-4">
                <a href="../html/admin-panel.html">Admin Panel</a>
            </div>
        </div>
        <hr>
        <div class="row d-flex justify-content-center pb-4">
            <div class="col-lg-12"><p class="lead">Sponsored by: Nike</p></div>
            <div class="col-lg-12">
                <img class="img-fluid" src="../images/main/nike-sponsored.png">
            </div>
        </div>

    </div>
    <div class="text-center p-3" id="footer-lower" ><span>©Copyright: All rights reserved by Freedom Fighterr</span>
    </div>
    `
    document.querySelector("footer").appendChild(footer_child)
}

// WINDOW EVENT LISTENERS
window.addEventListener('scroll', () => { // arrow back to top function manipulate
    let arrow_to_top = document.querySelector('.to-top')
    if (window.pageYOffset > 200) {
        arrow_to_top.classList.add('active')
    }
    else {
        arrow_to_top.classList.remove('active')
    }
})

window.addEventListener('load', nav_load)
window.addEventListener('load', footer_load)