
import { useEffect, useState } from "react";
import { obtenerEventosDestacados } from "../services/eventosService.js";

export function useEventosDestacados() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarEventos() {
      try {
        const datos = await obtenerEventosDestacados();

        if (activo) {
          setEventos(datos);
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

    cargarEventos();

    return () => {
      activo = false;
    };
  }, []);

  return { eventos, cargando, error };
}
