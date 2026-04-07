import { getUserById } from "../api/dummyjson.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("profile-container");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || 1;

  try {
    const user = await getUserById(id);

    // ── Obtener posts creados ─────────────────────────────
    const customPosts = JSON.parse(localStorage.getItem("customPosts") || []);

    const userPosts = customPosts.filter(p => p.userId == id);

    // ── Render ────────────────────────────────────────────
    container.innerHTML = `
      <div class="author-card">
        <img class="author-avatar" src="${user.image}" />
        <div class="author-info">
          <div class="author-name">${user.firstName} ${user.lastName}</div>
          <div class="author-username">@${user.username}</div>
          <div class="author-email">${user.email}</div>
        </div>
      </div>

      <h2 style="margin-top:2rem;">Publicaciones del usuario</h2>

      <div id="user-posts"></div>
    `;

    const postsContainer = document.getElementById("user-posts");

    if (userPosts.length === 0) {
      postsContainer.innerHTML = "<p class='empty'>Este usuario no tiene publicaciones.</p>";
      return;
    }

    userPosts.forEach(post => {
      const div = document.createElement("article");
      div.className = "post-card";

      div.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body.slice(0, 100)}...</p>
        <span class="tag">Nuevo</span>
        <a href="detail.html?id=${post.id}" class="btn-detail">Ver más</a>
      `;

      postsContainer.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = "<p class='error'>Error cargando perfil</p>";
  }
});