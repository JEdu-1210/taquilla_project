import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar.jsx";
import Ticket from "../components/ticket.jsx";
import SeccionEventos from "../components/SeccionEventos.jsx";

import {
  obtenerEventosDestacados,
  buscarEventos,
} from "../services/eventosService.js";
import Categorias from "../components/Categorias.jsx";
import Footer from "../components/Footer.jsx";
export default function HomePage() {
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [eventoDestacado, setEventoDestacado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eventosPopulares, setEventosPopulares] = useState([]);
  const [eventosProximos, setEventosProximos] = useState([]);

  useEffect(() => {
    async function cargarEventos() {
      try {
        const eventos = await obtenerEventosDestacados();

        console.log("Eventos destacados:", eventos);

        // Evento principal del Figma
        const festival = eventos.find(
          (evento) => evento.slug === "festival-niebla-2026",
        );

        setEventoDestacado(festival || eventos[0] || null);

        // Tarjetas de destacados
        setEventosPopulares(eventos.slice(0, 4));
      } catch (err) {
        console.error("Error cargando destacados:", err);
        setError(err.message);
      } finally {
        setCargando(false);
      }

      // Cargar eventos de Manizales por separado
      try {
        const proximos = await buscarEventos({
          ciudad: "Manizales",
        });

        console.log("Eventos de Manizales:", proximos);

        setEventosProximos(proximos.slice(0, 4));
      } catch (err) {
        console.error("Error cargando eventos de Manizales:", err);
      }
    }

    cargarEventos();
  }, []);

  async function realizarBusqueda(filtros) {
    setBuscando(true);
    setBusquedaRealizada(true);
    setErrorBusqueda("");

    try {
      const eventos = await buscarEventos(filtros);
      setResultados(eventos);
    } catch (err) {
      setErrorBusqueda(err.message);
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  }

  return (
    <>
      <main>
        <section className="bg-main text-white h-146">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:px-8">
            {/* Columna izquierda */}
            <div>
              <span className="inline-block rounded-md bg-white px-3 py-1 text-xs font-medium text-black">
                Temporada nov – dic 2026
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight lg:text-[42px]">
                Tu próxima noche empieza aquí
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400">
                Conciertos, teatro, deportes y festivales. Busca por categoría,
                fecha o ciudad y consulta todos los detalles de cada evento.
              </p>

              <Searchbar onBuscar={realizarBusqueda} />
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                <span className="text-neutral-500">Populares:</span>
                <span>Salsa</span>
                <span>Stand-up</span>
                <span>Fútbol</span>
                <span>Festivales de fin de año</span>
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              {cargando && (
                <p className="text-neutral-400">Cargando evento destacado...</p>
              )}

              {error && <p className="text-red-400">{error}</p>}

              {!cargando && !error && eventoDestacado && (
                <Ticket evento={eventoDestacado} />
              )}

              {!cargando && !error && !eventoDestacado && (
                <p>No hay eventos destacados disponibles.</p>
              )}
            </div>
          </div>
        </section>

        {busquedaRealizada && (
          <section className="bg-white px-6 py-12 text-black">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-6 text-2xl font-bold">
                Resultados de búsqueda
              </h2>

              {buscando && <p>Buscando eventos...</p>}

              {errorBusqueda && <p className="text-red-600">{errorBusqueda}</p>}

              {!buscando && !errorBusqueda && resultados.length === 0 && (
                <p>No se encontraron eventos.</p>
              )}

              {!buscando &&
                !errorBusqueda &&
                resultados.map((evento) => (
                  <div key={evento.id} className="mt-4 rounded-lg border p-4">
                    <h3 className="font-bold">{evento.titulo}</h3>
                    <p>{evento.recinto?.ciudad}</p>
                    <p>Desde ${evento.precioDesde?.toLocaleString("es-CO")}</p>
                  </div>
                ))}
            </div>
          </section>
        )}
        <Categorias />
        <SeccionEventos
          titulo="Destacados de la semana"
          descripcion="Los eventos con más entradas vendidas"
          eventos={eventosPopulares}
        />
        <SeccionEventos
          titulo="Próximamente en Manizales"
          descripcion="Cambia la ciudad desde el buscador"
          eventos={eventosProximos}
        />
      </main>
      <Footer />
    </>
  );
}
