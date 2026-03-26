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
