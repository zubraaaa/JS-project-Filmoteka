
function addMovie() {
    var apiKey = 'b1c84fab';
    var title = document.getElementById('movie-title').value;
    var requestURL = 'http://www.omdbapi.com/?apikey=' + apiKey + '&t=' + title;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var data = xhr.response;
        if (data.Response === "True") {
            displayMovieInfo(data);
            saveMovieToLocalStorage(data);
            
        } else {
            const toastLiveExample = document.getElementById('liveToast');
            const toastBootstrap = new bootstrap.Toast(toastLiveExample);
            toastBootstrap.show();
        }
    };
    xhr.send();
}


function displayMovieInfo(movie) {
    var productsGrid = document.getElementById('products-grid');
    var movieCard = document.createElement('div');
    movieCard.classList.add('col');
    movieCard.innerHTML = `
    <div class="card h-100" style="width: 18rem;">
        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">Year: ${movie.Year}</p>
            <p class="card-text">Director: ${movie.Director}</p>
            <p class="card-text">Actors: ${movie.Actors}</p>
            <p class="card-text">Plot: ${movie.Plot}</p>

            
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center w-100">
            <button class="btn btn-primary delete-button">Delete</button>
            <div class="icons d-flex">
                <i class="bi bi-eye me-2"></i>
                <i class="bi bi-hand-thumbs-up me-2"></i>
                <i class="bi bi-hand-thumbs-down"></i>
            </div>
            
        </div>
    `;
    productsGrid.appendChild(movieCard);
    var eyeIcon = movieCard.querySelector('.bi-eye');
    eyeIcon.addEventListener('click', function() {
        eyeIcon.style.color = "red"; 
    });

    var thumbupIcon = movieCard.querySelector('.bi-hand-thumbs-up');
    thumbupIcon.addEventListener('click', function() {
        thumbupIcon.style.color = "yellow"; 
    });

    var thumbdownIcon = movieCard.querySelector('.bi-hand-thumbs-down');
    thumbdownIcon.addEventListener('click', function() {
        thumbdownIcon.style.color = "yellow"; 
    });

    
    var deleteButton = movieCard.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        deleteMovie(movie);
    });
}

function deleteMovie(movieToDelete) {
    var movies = JSON.parse(localStorage.getItem('movies')) || [];
    var index = movies.findIndex(function(movie) {
        return movie.Title === movieToDelete.Title;
    });
    if (index !== -1) {
        movies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
    }
    loadMovies();
}


function saveMovieToLocalStorage(movie) {
    var movies = JSON.parse(localStorage.getItem('movies')) || [];
    var isMovieAdded = movies.some(function(existingMovie) {
        return existingMovie.Title === movie.Title;
    });
    if (!isMovieAdded) {
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    }
}



function loadMovies() {
    var movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.forEach(function(movie) {
        displayMovieInfo(movie);
    });
}

// Call loadMovies function when the page loads to display previously saved movies
window.onload = loadMovies;




function sortMoviesByAlphabet() {
    var productsGrid = document.getElementById('products-grid');
    var movieCards = Array.from(productsGrid.querySelectorAll('.card'));

    movieCards.sort(function(a, b) {
        var titleA = a.querySelector('.card-title').textContent.toLowerCase();
        var titleB = b.querySelector('.card-title').textContent.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });

    productsGrid.innerHTML = '';
    movieCards.forEach(function(card) {
        productsGrid.appendChild(card);
    });
}
document.querySelector('.dropdown-menu li:nth-child(1) a').addEventListener('click', function() {
    sortMoviesByAlphabet();
});


function sortMoviesByYear() {
    var productsGrid = document.getElementById('products-grid');
    var movieCards = Array.from(productsGrid.querySelectorAll('.card'));

    movieCards.sort(function(a, b) {
        var yearA = parseInt(a.querySelector('.card-text:nth-child(2)').textContent.match(/\d+/)[0]);
        var yearB = parseInt(b.querySelector('.card-text:nth-child(2)').textContent.match(/\d+/)[0]);
        return yearA - yearB; 
    });

    productsGrid.innerHTML = '';
    movieCards.forEach(function(card) {
        productsGrid.appendChild(card);
    });
}
document.querySelector('.dropdown-menu li:nth-child(2) a').addEventListener('click', function() {
    sortMoviesByYear();
});

function sortByIconColor() {
    var productsGrid = document.getElementById('products-grid');
    var movieCards = Array.from(productsGrid.querySelectorAll('.col'));
    var blackIconCards = [];
    var redIconCards = [];
    movieCards.forEach(function(card) {
        var eyeIcon = card.querySelector('.bi-eye');
        if (eyeIcon.style.color === "black") {
            blackIconCards.push(card);
        } else if (eyeIcon.style.color === "red") {
            redIconCards.push(card);
        }
    });

    productsGrid.innerHTML = '';
    blackIconCards.forEach(function(card) {
        productsGrid.appendChild(card);
    });
    redIconCards.forEach(function(card) {
        productsGrid.appendChild(card);
    });
}

document.querySelector('.dropdown-menu li:nth-child(3) a').addEventListener('click', function() {
    sortByIconColor();
});