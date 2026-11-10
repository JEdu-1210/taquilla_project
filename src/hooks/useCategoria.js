
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/eventosService.js";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarCategorias() {
      try {
        const datos = await obtenerCategorias();

        if (activo) {
          setCategorias(datos);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarCategorias();

    return () => {
      activo = false;
    };
  }, []);

  return { categorias, cargando, error };
}
