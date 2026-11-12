

const API_URL = import.meta.env.VITE_API_URL

export async function obtenerEventosDestacados() {
  const respuesta = await fetch(`${API_URL}/eventos/destacados`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los eventos destacados");
  }

  const resultado = await respuesta.json();
  return resultado.datos;
}
{/* ====================================================================================== */}
export async function buscarEventos(filtros = {}) {
  const parametros = new URLSearchParams();

  if (filtros.q?.trim()) {
    parametros.set("q", filtros.q.trim());
  }

  if (filtros.ciudad?.trim()) {
    parametros.set("ciudad", filtros.ciudad.trim());
  }

  if (filtros.desde) {
    parametros.set("desde", filtros.desde);
  }

  if (filtros.hasta) {
    parametros.set("hasta", filtros.hasta);
  }

  const url = `${API_URL}/eventos?${parametros.toString()}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se pudieron buscar los eventos");
  }

  const resultado = await respuesta.json();
  return resultado.datos;
}
{/* ====================================================================================== */}

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }

  const resultado = await respuesta.json();
  return resultado.datos;
}
