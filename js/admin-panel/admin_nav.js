// loading header on admin page 
function admin_header_load() {
    let child = document.createElement('div')
    child.setAttribute('id', 'admin-nav')
    child.innerHTML =
        `
    <nav class="navbar navbar-expand-xxl navbar-dark text-center">
        <div class="container-fluid d-flex align-items-center">
            <h1 class="my-3"><a href="../html/index.html">BACK TO SITE</h1></a>
            <!-- hamburger menu under 1200px -->
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#hamburger-menu"
                aria-controls="hamburger-menu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" id="hamburger-menu">
                <div class="offcanvas-header justify-content-end">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                </div>
                <div class="offcanvas-body" id="admin-nav-container">
                    <ul class="navbar-nav ms-auto m-2">
                        <li class="nav-item mx-2">
                            <a name="settings-k" href="../html/admin-panel.html" class="nav-link">User management system</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a name="settings-fc" href="../html/admin-gyms.html" class="nav-link">Gym management system</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    `
    document.querySelector('header').appendChild(child)
}


window.addEventListener('load', admin_header_load)