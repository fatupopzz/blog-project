import { getPostById } from "../api/dummyjson.js";

document.addEventListener("DOMContentLoaded", async () => {
  
  const container = document.getElementById("post-detail");

  // Get post ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>ID no encontrado</p>";
    return;
  }

  try {
    const post = await getPostById(id);

    container.innerHTML = `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <p><strong>User ID:</strong> ${post.userId}</p>
    `;

  } catch (err) {
    container.innerHTML = "<p>Error cargando el post</p>";
  }
});