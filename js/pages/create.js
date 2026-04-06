import { createPost } from "../api/dummyjson.js";

const form = document.getElementById("create-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const userId = document.getElementById("userId").value;

  let valid = true;

  // ── Validaciones ─────────────────────────────────────────
  if (title.length < 3) {
    document.getElementById("title-error").textContent = "Título muy corto";
    valid = false;
  } else {
    document.getElementById("title-error").textContent = "";
  }

  if (body.length < 10) {
    document.getElementById("body-error").textContent = "Contenido muy corto";
    valid = false;
  } else {
    document.getElementById("body-error").textContent = "";
  }

  if (!valid) return;

  try {
    // ── Llamada a la API (simulada) ────────────────────────
    await createPost({
      title,
      body,
      userId,
    });

    // ── Crear post REAL para tu app ────────────────────────
    const post = {
      id: Date.now(), // ID único para evitar conflictos
      title,
      body,
      userId,
      tags: [],
      reactions: 0,
      isCustom: true, // marca que es local
    };

    // ── Guardar en localStorage ────────────────────────────
    const savedPosts = JSON.parse(localStorage.getItem("customPosts") || "[]");
    savedPosts.push(post);
    localStorage.setItem("customPosts", JSON.stringify(savedPosts));

    // ── Debug requerido por proyecto ───────────────────────
    console.log("Post creado:", post);

    // ── Feedback visual ────────────────────────────────────
    showToast("Post creado correctamente");

    // ── Reset del formulario ───────────────────────────────
    form.reset();

    // ── Redirección automática al home ─────────────────────
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (err) {
    alert("Error creando el post");
  }
});

// ── Toast visual ───────────────────────────────────────────
function showToast(msg) {
  const div = document.createElement("div");
  div.className = "toast success";
  div.textContent = msg;
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}