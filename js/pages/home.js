import {
  getPosts,
  searchPosts,
  getPostsByTag,
  getTags,
} from "../api/dummyjson.js";
import {
  showLoading,
  showError,
  showSuccess,
  createPostCard,
  createPagination,
} from "../utils/dom.js";

const container = document.getElementById("posts-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const tagFilter = document.getElementById("tag-filter");
const userFilter = document.getElementById("user-filter");

const LIMIT = 10;
let currentPage = 1;
let currentTag = "";
let currentUser = "";
let currentQuery = "";

// ── Load posts with pagination ────────────────────────────────────────────────
async function loadPosts(page = 1) {
  currentPage = page;
  const skip = (page - 1) * LIMIT;
  showLoading(container);

  try {
    const data = await getPosts(LIMIT, skip);
    renderPosts(data.posts, data.total);
  } catch (err) {
    showError(container, "No se pudieron cargar los posts.");
  }
}

// ── Search posts by text ──────────────────────────────────────────────────────
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  currentQuery = query;
  currentTag = "";
  currentUser = "";
  tagFilter.value = "";
  userFilter.value = "";

  showLoading(container);

  try {
    const data = await searchPosts(query);
    renderPosts(data.posts, data.total, false); // no pagination on search results
  } catch (err) {
    showError(container, "Error en la búsqueda.");
  }
}

// ── Filter posts by tag ───────────────────────────────────────────────────────
async function handleTagFilter() {
  const tag = tagFilter.value;
  if (!tag) return loadPosts(1);

  currentTag = tag;
  currentQuery = "";
  currentUser = "";
  searchInput.value = "";

  showLoading(container);

  try {
    const data = await getPostsByTag(tag);
    renderPosts(data.posts, data.total, false);
  } catch (err) {
    showError(container, "Error al filtrar por tag.");
  }
}

// ── Filter posts by user ID ───────────────────────────────────────────────────
function handleUserFilter() {
  const userId = userFilter.value.trim();
  if (!userId) return loadPosts(1);

  currentUser = userId;
  currentQuery = "";
  currentTag = "";
  searchInput.value = "";
  tagFilter.value = "";

  showLoading(container);

  fetch(`https://dummyjson.com/posts/user/${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((data) => renderPosts(data.posts, data.total, false))
    .catch(() => showError(container, "Usuario no encontrado."));
}

// ── Render post cards and pagination ─────────────────────────────────────────



function getCustomPosts() {
  return JSON.parse(localStorage.getItem("customPosts") || "[]");
}


function renderPosts(posts, total, paginar = true) {
  container.innerHTML = "";

  const customPosts = getCustomPosts();

  // 👇 Mezclar posts locales con los de la API
  const allPosts = [...customPosts, ...posts];

  if (!allPosts || allPosts.length === 0) {
    container.innerHTML =
      "<p class='empty'>No se encontraron publicaciones.</p>";
    return;
  }

  allPosts.forEach((post) => {
    const card = createPostCard(post);
    container.appendChild(card);
  });

  if (paginar) {
    const pagination = createPagination(total, LIMIT, currentPage, loadPosts);
    container.appendChild(pagination);
  }
}

// ── Populate tag dropdown from API ────────────────────────────────────────────
async function loadTags() {
  try {
    const tags = await getTags();
    tags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag.slug ?? tag;
      option.textContent = tag.name ?? tag;
      tagFilter.appendChild(option);
    });
  } catch (err) {
    console.warn("Could not load tags.");
  }
}

// ── Event listeners ───────────────────────────────────────────────────────────
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
tagFilter.addEventListener("change", handleTagFilter);
userFilter.addEventListener("change", handleUserFilter);

// ── Init ──────────────────────────────────────────────────────────────────────
loadTags();
loadPosts(1);
