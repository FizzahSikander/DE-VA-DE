// all buttons and elements are created in index.js
import { postMovie, getAllMovies, getMovie, deleteMovie, updateMovie, checkIfMovieExists } from "./modules/firestore.js";

const postMovieButton = document.querySelector('#postMoviesButton');
const getMovieButton = document.querySelector('#getMovieButton');
const getAllMoviesButton = document.querySelector('#getAllMoviesButton');
export const movieNotes = document.querySelector('#movie-notes');
const moviesElem = document.querySelector('#moviesContainer');

//create the elements when you get all movies from database and update or remove it 
function createMovieElement(movie, watchedMovievalue) {
    // console.log(movie);
    //console.log(watchedMovievalue);
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const textElem = document.createElement('p');
    const dateElem = document.createElement('p');
    const watchedElem = document.createElement('p');
    const removeButton = document.createElement('button');
    const watchedCheckbox = document.createElement('input');
    const watchedLabel = document.createElement('label');
    const updateButton = document.createElement('button');

    headingElem.innerText = "Name: " + movie.movie.title;
    dateElem.innerText = "Genre: " + movie.movie.genre;
    textElem.innerText = "Release Date: " + movie.movie.releaseDate;
    watchedElem.innerText = "Watched?: " + movie.movie.watchedMovievalue;
    updateButton.innerText = 'Yes';
    removeButton.innerText = 'Delete';
    watchedLabel.innerText = 'Have you Watched it?';
    watchedCheckbox.type = 'checkbox';

    containerElem.append(headingElem);
    containerElem.append(textElem);
    containerElem.append(dateElem);
    containerElem.append(watchedElem);
    containerElem.append(removeButton);

    containerElem.append(watchedCheckbox);
    containerElem.append(watchedLabel);
    containerElem.append(updateButton);

    moviesElem.append(containerElem);
    removeButton.addEventListener('click', () => {
        const movieId = movie.id;
        deleteMovie(movieId);
        containerElem.remove();
    });

    updateButton.addEventListener('click', () => {
        const watchedMovieBox = watchedCheckbox.checked;
        //   console.log(watchedMovieBox);
        const movieId = movie.id;
        updateMovie(watchedMovieBox, movieId, watchedMovievalue);
        location.reload();
        alert(`Marked as Watched`);
    });
}
// a button to search the movie with given username
getMovieButton.addEventListener('click', async () => {
    const title = document.querySelector('#username').value;
    clearPreviousSearch();
    const movies = await getMovie(title);
    document.querySelector('#username').value = "";

});
// clear previous search when you get a movie
function clearPreviousSearch() {
    movieNotes.innerHTML = '';
}
// function to itterate movies
function displayMovies(movies) {
    for (const movie of movies) {
        //  console.log(movies);
        const watchedMovievalue = movie.movie.watchedMovievalue;
        //console.log(watchedMovievalue);
        createMovieElement(movie, watchedMovievalue);
    }
}
// button to get all movies 
getAllMoviesButton.addEventListener('click', async () => {
    const getmovies = await getAllMovies();
    displayMovies(getmovies);
    ;
});
// button to post movie in database
postMovieButton.addEventListener('click', async () => {
    moviesContainer.innerHTML = "";
    const movieTitle = document.querySelector('#usernamePost').value;
    const existingMovie = await checkIfMovieExists(movieTitle);

    if (!existingMovie) {
        const movie = {
            title: movieTitle,
            genre: document.querySelector('#title').value,
            releaseDate: document.querySelector('#selectedDate').value,
            watchedMovievalue: false,
            createdAt: new Date().toLocaleDateString()
        };
        await postMovie(movie);
        alert(`Successfully Posted`);
        document.querySelector('#usernamePost').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#selectedDate').value = '';
    } else {
        alert(`Movie with title '${movieTitle}' already exists in the database.`);
    }
});

