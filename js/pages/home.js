// home.js — lógica del listado de publicaciones
import { getPosts } from "../api/dummyjson.js";
import { showLoading, showError } from "../utils/dom.js";

// Run this code when the HTML is fully loaded.
document.addEventListener("DOMContentLoaded", async() => {

    const container = document.getElementById("posts-container");

    try {
        const data = await getPosts();

        // Loop through each post and create its HTML block.
        data.posts.forEach(post => {
            const div = document.createElement("div");

            div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body.substring(0,100)}...</p> 
            <button onclick="goToDetail(${post.id})">Ver más</button>
            `;

            // (Always put this) Put this post block inside the main container.
            container.appendChild(div);
        });
    } catch (err) {
      container.innerHTML = "<p>Error al cargar posts</p>";
    }
});

//Function to navigate to the detail page of a post, passing the post ID as a query parameter.
window.goToDetail = function (id) {
    window.location.href = `detail.html?id=${id}`;
};
