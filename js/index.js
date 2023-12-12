import { db } from './firebaseConfig.js';
import {
    addDoc, collection, getDocs,
    where, query, deleteDoc,
    doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const postMovieButton = document.querySelector('#postMoviesButton');
const getMovieButton = document.querySelector('#getMovieButton');
const getAllMoviesButton = document.querySelector('#getAllMoviesButton');

const moviesElem = document.querySelector('#moviesContainer');

async function postMovie(movie) {
    try {
        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}


async function getAllMovies() {
    try {
        const queryName = query(collection(db, 'movies'));
        const movies = await getDocs(queryName);

        const formatedMovies = [];
        movies.forEach((movie) => {
            const formatedMovie = {
                id: movie.id,
                movie: movie.data()
            }

            formatedMovies.push(formatedMovie);
        });
        console.log(formatedMovies);
        return formatedMovies;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function getMovie(title) {
    try {
        const queryName = query(collection(db, 'movies'), where('title', '==', title));
        const movies = await getDocs(queryName);

        const formatedMovies = [];
        console.log(movies);
        movies.forEach((movie) => {
            const newMovie = {
                id: movie.id,
                movie: movie.data()
            }

            formatedMovies.push(newMovie);
        });
        console.log(formatedMovies);

        movieNotes.innerHTML = formatedMovies.map((movie) => {
            return `<p>${JSON.stringify("Name: " + movie.movie.title)},
            ${JSON.stringify(movie.movie.genre)},
            ${JSON.stringify("watched: " + movie.movie.watchedMovievalue)},
            ${JSON.stringify(movie.movie.releaseDate)}</p>`;
        }).join('');
    
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
// console.log(await getMovie(title));

async function deleteMovie(id) {
    try {
        await deleteDoc(doc(db, 'movies', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }

} async function updateMovie(watchedMovieBox, id, watchedMovievalue) {
    console.log(watchedMovieBox);
    console.log(watchedMovievalue);
    try {
        await updateDoc(doc(db, 'movies', id), {
            watchedMovievalue: watchedMovieBox
        });
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}


function createMovieElement(movie, watchedMovievalue) {
    console.log(movie);
    console.log(watchedMovievalue);
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const textElem = document.createElement('p');
    const dateElem = document.createElement('p');
    const removeButton = document.createElement('button');
    const watchedCheckbox = document.createElement('input');
    const watchedLabel = document.createElement('label');
    const updateButton = document.createElement('button');

    headingElem.innerText = "Name: " + movie.movie.title;
    dateElem.innerText = "Genre: " + movie.movie.genre;
    textElem.innerText = "Release Date: " + movie.movie.releaseDate;
    removeButton.innerText = 'Ta bort';
    updateButton.innerText = 'Uppdatera';
    watchedLabel.innerText = 'Watched?';
    watchedCheckbox.type = 'checkbox';

    containerElem.append(headingElem);
    containerElem.append(textElem);
    containerElem.append(dateElem);

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
        const movieId = movie.id;
        updateMovie(watchedMovieBox, movieId, watchedMovievalue);
        containerElem.remove();
        movieNotes.remove();
        location.reload();
    });
}

const displayedMovies = new Set();

getMovieButton.addEventListener('click', async () => {
    const title = document.querySelector('#username').value;
       clearPreviousSearch();
        const movies = await getMovie(title);
        console.log(movies);
        displayedMovies.add(title);
    document.querySelector('#username').value = "";

});
const movieNotes = document.querySelector('#movie-notes');

function clearPreviousSearch() {
    movieNotes.innerHTML = '';
}
function displayMovies(movies) {
    for (const movie of movies) {
        const watchedMovievalue = movie.movie.watchedMovievalue;
        createMovieElement(movie, watchedMovievalue);
    }
}
getAllMoviesButton.addEventListener('click', async () => {
    console.log("click");
    const getmovies = await getAllMovies();
    displayMovies(getmovies);
    ;
});


postMovieButton.addEventListener('click', async () => {
    moviesContainer.innerHTML = "";
    const movie = {
        title: document.querySelector('#usernamePost').value,
        genre: document.querySelector('#title').value,
        releaseDate: document.querySelector('#selectedDate').value,
        watchedMovievalue: false,
        createdAt: new Date().toLocaleDateString()
    };

    await postMovie(movie);

    document.querySelector('#usernamePost').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#selectedDate').value = '';
});

