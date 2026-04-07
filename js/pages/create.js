import { createPost } from "../api/dummyjson.js";
import { validatePost } from "../utils/validation.js";

const form = document.getElementById("create-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const userId = document.getElementById("userId").value;

  // ── Validation ────────────────────────────────────────────
  const errors = validatePost({ title, body });

  document.getElementById("title-error").textContent = "";
  document.getElementById("body-error").textContent = "";

  if (errors.length > 0) {
    errors.forEach((err) => {
      if (err.includes("título"))
        document.getElementById("title-error").textContent = err;
      if (err.includes("contenido"))
        document.getElementById("body-error").textContent = err;
    });
    return;
  }

  try {
    // ── POST to API ───────────────────────────────────────────
    await createPost({ title, body, userId });

    // ── Visual feedback ───────────────────────────────────────
    showToast("Post creado correctamente");
    form.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } catch (err) {
    showToast("Error creando el post");
  }
});

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg) {
  const div = document.createElement("div");
  div.className = "toast success";
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

