import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsPE35wtGgFJkVAqgx4IU_VerLxlpttYs",
    authDomain: "madhu-s-recipe-book.firebaseapp.com",
    projectId: "madhu-s-recipe-book",
    storageBucket: "madhu-s-recipe-book.appspot.com",
    messagingSenderId: "891075880169",
    appId: "1:891075880169:web:83146f3008c50f73c17c78",
    measurementId: "G-SET6M97779"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const searchTitle = document.getElementById('search');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

function searchData() {
    var searchString = document.getElementById("search-input").value;

    db.collection("Recipes")
    .where("Title", "==", searchString)
    .get()
    .then((querySnapshot) => {
        var searchResults = document.getElementById("meal-result");
        searchResults.innerHTML = ""; 

        querySnapshot.forEach((doc) => {
            var data = doc.data();
            console.log(data);

            let html = `
            <h2 class = "recipe-title">${data.Title}</h2>
            <p class = "recipe-category">${data.Category}</p>
            <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${data.Instructions}</p>
            </div>
            <div class = "recipe-meal-img">
                <img src = "${data.ImageUrl}" alt = ""></img>
            </div>
            <div class = "recipe-link">
                <a href = "${data.YouTubeUrl}" target = "_blank">Watch Video</a>
            </div> `;

            searchResults.innerHTML += html;

        });
    })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    }

searchBtn.addEventListener('click', searchData);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});