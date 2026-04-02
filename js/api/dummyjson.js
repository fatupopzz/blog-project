const BASE_URL = "https://dummyjson.com";
const POSTS_URL = `${BASE_URL}/posts`;

export async function getPosts(limit = 10, skip = 0) {
  const res = await fetch(`${POSTS_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Error al cargar posts");
  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${POSTS_URL}/${id}`);
  if (!res.ok) throw new Error("Post no encontrado");
  return res.json();
}

export async function searchPosts(query) {
  const res = await fetch(`${POSTS_URL}/search?q=${query}`);
  if (!res.ok) throw new Error("Error en búsqueda");
  return res.json();
}

export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${POSTS_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear post");
  return res.json();
}

export async function getPostsByTag(tag) {
  const res = await fetch(`${POSTS_URL}/tag/${tag}`); // ← fix
  if (!res.ok) throw new Error("Error al filtrar por tag");
  return res.json();
}

export async function getTags() {
  const res = await fetch(`${POSTS_URL}/tags`); // ← fix
  if (!res.ok) throw new Error("Error al cargar tags");
  return res.json();
}
