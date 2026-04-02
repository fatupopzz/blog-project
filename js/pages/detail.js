import { getPostById, getUserById } from "../api/dummyjson.js";
import { showLoading, showError } from "../utils/dom.js";

const postContainer = document.getElementById("post-detail");
const authorContainer = document.getElementById("author-card");

// ── Get post ID from URL ───────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// ── Render post ───────────────────────────────────────────────────────────────
function renderPost(post) {
  postContainer.innerHTML = `
    <article class="post-full">
      <div class="post-full-tags">
        ${post.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <h1 class="post-full-title">${post.title}</h1>
      <div class="post-full-meta">
        <span>${post.reactions?.likes ?? 0} likes</span>
        <span>${post.views ?? 0} vistas</span>
      </div>
      <p class="post-full-body">${post.body}</p>
      <div class="post-full-actions">
        <button class="btn-danger" id="delete-btn">Eliminar publicación</button>
      </div>
    </article>
  `;

  // Simulate delete
  document.getElementById("delete-btn").addEventListener("click", handleDelete);
}

// ── Render author card ────────────────────────────────────────────────────────
function renderAuthor(user) {
  authorContainer.innerHTML = `
    <div class="author-card">
      <img 
        src="${user.image}" 
        alt="${user.firstName}" 
        class="author-avatar"
        onerror="this.style.display='none'"
      />
      <div class="author-info">
        <p class="author-name">${user.firstName} ${user.lastName}</p>
        <p class="author-username">@${user.username}</p>
        <p class="author-email">${user.email}</p>
        <a href="profile.html?id=${user.id}" class="btn-detail">Ver perfil →</a>
      </div>
    </div>
  `;
}

// ── Simulate delete ───────────────────────────────────────────────────────────
function handleDelete() {
  const article = document.querySelector(".post-full");
  article.style.opacity = "0.4";
  article.style.pointerEvents = "none";

  const msg = document.createElement("p");
  msg.className = "empty";
  msg.textContent = "Publicación eliminada.";
  postContainer.appendChild(msg);

  document.getElementById("delete-btn").remove();
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  if (!postId) {
    showError(postContainer, "No se encontró el post.");
    return;
  }

  showLoading(postContainer);

  try {
    const post = await getPostById(postId);
    renderPost(post);

    // Load author in parallel
    showLoading(authorContainer);
    const user = await getUserById(post.userId);
    renderAuthor(user);
  } catch (err) {
    showError(postContainer, "Error al cargar el post.");
    authorContainer.innerHTML = "";
  }
}

init();

