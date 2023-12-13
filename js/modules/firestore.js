import { db } from './firebaseConfig.js';
import {
    addDoc, collection, getDocs,
    where, query, deleteDoc,
    doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
const movieNotes = document.querySelector('#movie-notes');

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

async function deleteMovie(id) {
    try {
        await deleteDoc(doc(db, 'movies', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }

} 

async function updateMovie(watchedMovieBox, id, watchedMovievalue) {
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
async function checkIfMovieExists(title) {
    try {
        const queryName = query(collection(db, 'movies'), where('title', '==', title));
        const movies = await getDocs(queryName);
        console.log(queryName);
        console.log(movies);
        return !movies.empty;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
export { postMovie, getAllMovies, getMovie, deleteMovie, updateMovie ,checkIfMovieExists }