// validateSearch and search
export function validatePost({ title, body }) {
  const errors = [];
  if (!title || title.trim().length < 5)
    errors.push("El título debe tener al menos 5 caracteres.");
  if (!body || body.trim().length < 20)
    errors.push("El contenido debe tener al menos 20 caracteres.");
  return errors;
}

export function validateSearch(query) {
  const errors = [];
  if (!query || query.trim().length === 0)
    errors.push("Escribe algo para buscar.");
  if (query.trim().length < 2)
    errors.push("La búsqueda debe tener al menos 2 caracteres.");
  return errors;
}
