const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
// Handling the active class for the sidebar links
sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');

        // Close the sidebar when a link is clicked
        sideBar.classList.add('close');
    });
});

// Toggle the sidebar on menu bar click
const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

// Open and close sidebar on menu bar click
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

// Close the sidebar when clicking outside of it
document.addEventListener('click', (event) => {
    if (!sideBar.contains(event.target) && !menuBar.contains(event.target)) {
        sideBar.classList.add('close');
    }
});

// Ensure the sidebar is always closed on mobile unless menu bar is clicked
const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust for mobile screens

// Watch for changes in the media query
mediaQuery.addEventListener('change', () => {
    if (mediaQuery.matches) {
        // If on mobile, ensure sidebar is closed
        sideBar.classList.add('close');
    }
});

// Initialize for current screen size
if (mediaQuery.matches) {
    sideBar.classList.add('close');
}


const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// Function to fetch the project list and display it in the container
function fetchProjects(event) {
    event.preventDefault(); // Prevent the default link behavior (page navigation)

    // Get the URL from the clicked link
    var url = event.target.href;

    // Perform AJAX request to fetch the project list
    fetch(url, {
        method: 'GET',  // Make a GET request to the provided URL
        headers: {
            'X-Requested-With': 'XMLHttpRequest',  // Indicate that it's an AJAX request
            'X-CSRFToken': getCookie('csrftoken')  // CSRF token for security (if needed)
        }
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // Inject the HTML content returned by the server into the projects-container
        document.getElementById('projects-container').innerHTML = data.html;
        // Optionally, you can also show the section after content is loaded
        showSection('projects-container');
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        // Show an error message if the request fails
        document.getElementById('projects-container').innerHTML =
            '<p>Failed to load projects. Please try again later.</p>';
    });
}

// Function to display the container section
function showSection(sectionId) {
    // Make sure the section is visible
    document.getElementById(sectionId).style.display = 'block';
}

// Utility function to get the CSRF token from the cookies (for security)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



