export function showLoading(container) {
  container.innerHTML = '<p class="loading">Cargando...</p>';
}

export function showError(container, msg = "Algo salió mal.") {
  container.innerHTML = `<p class="error">${msg}</p>`;
}

export function showSuccess(msg) {
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

export function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "post-card";

  const tags = post.tags || [];

  card.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body.slice(0, 100)}...</p>

    <div class="post-meta">
      <span class="post-tags">
        ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </span>
    </div>

    ${post.isCustom ? `<span class="tag">Nuevo</span>` : ""}

    <a href="detail.html?id=${post.id}" class="btn-detail">Ver más</a>
  `;

  return card;
}

export function createPagination(total, limit, currentPage, onPageChange) {
  const totalPages = Math.ceil(total / limit);
  const nav = document.createElement("nav");
  nav.className = "pagination";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "page-btn active" : "page-btn";
    btn.addEventListener("click", () => onPageChange(i));
    nav.appendChild(btn);
  }
  return nav;
}
