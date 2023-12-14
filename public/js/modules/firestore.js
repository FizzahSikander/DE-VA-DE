// all functions of get ,post,update ,delete etc that are related to firestore db are posted here
import { db } from './firebaseConfig.js';
import {
    addDoc, collection, getDocs,
    where, query, deleteDoc,
    doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { movieNotes } from '../index.js';
// function to post movie in database
async function postMovie(movie) {
    try {
        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
// function to get all movies from db

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
        //console.log(formatedMovies);
        return formatedMovies;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
// function to get a movie with given title in db
async function getMovie(title) {
    try {
        const queryName = query(collection(db, 'movies'), where('title', '==', title));
        const movies = await getDocs(queryName);

        const formatedMovies = [];
        // console.log(movies);
        movies.forEach((movie) => {
            const newMovie = {
                id: movie.id,
                movie: movie.data()
            }

            formatedMovies.push(newMovie);
        });
        //console.log(formatedMovies);

        movieNotes.innerHTML = formatedMovies.map((movie) => {
            return `<p>${JSON.stringify("Name: " + movie.movie.title)},<br>
            ${JSON.stringify("Genre: " + movie.movie.genre)},<br>
            ${JSON.stringify("Watched: " + movie.movie.watchedMovievalue)},<br>
            ${JSON.stringify("Release date: " + movie.movie.releaseDate)}</p>`;
        }).join('');

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
// function to delete movie from db
async function deleteMovie(id) {
    try {
        await deleteDoc(doc(db, 'movies', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }

}
// function to update movie in db
async function updateMovie(watchedMovieBox, id, watchedMovievalue) {
    // console.log(watchedMovieBox);
    // console.log(watchedMovievalue);
    try {
        await updateDoc(doc(db, 'movies', id), {
            watchedMovievalue: watchedMovieBox
        });
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
// function to check if the movie with a title already exist in db
async function checkIfMovieExists(title) {
    try {
        const queryName = query(collection(db, 'movies'), where('title', '==', title));
        const movies = await getDocs(queryName);
        // console.log(queryName);
        //console.log(movies);
        return !movies.empty;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
export { postMovie, getAllMovies, getMovie, deleteMovie, updateMovie, checkIfMovieExists }