import { getUserById } from "../api/dummyjson.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("profile-container");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || 1;

  try {
    const user = await getUserById(id);

    container.innerHTML = `
      <div class="author-card">
        <img class="author-avatar" src="${user.image}" />
        <div class="author-info">
          <div class="author-name">${user.firstName} ${user.lastName}</div>
          <div class="author-username">@${user.username}</div>
          <div class="author-email">${user.email}</div>
        </div>
      </div>
    `;

  } catch (err) {
    container.innerHTML = "<p class='error'>Error cargando usuario</p>";
  }
});