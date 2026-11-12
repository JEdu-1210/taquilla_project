import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar.jsx";
import Ticket from "../components/ticket.jsx";
import SeccionEventos from "../components/SeccionEventos.jsx";
import Cookies from "../components/Cookies";
import { useEventosDestacados } from "../hooks/useEventosDestacados.js";
import { buscarEventos } from "../services/eventosService.js";
import Categorias from "../components/Categorias.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage({ idioma, textos }) {
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [eventosProximos, setEventosProximos] = useState([]);
  const [ciudadActual, setCiudadActual] = useState("Manizales");
  const { eventos, cargando, error } = useEventosDestacados();

  const ciudadReemplazada = textos?.paginas?.inicio?.proximos?.titulo?.replace(
    "{ciudad}",
    ciudadActual,
  );

  const eventoDestacado =
    eventos.find((evento) => evento.slug === "festival-niebla-2026") ||
    eventos[0] ||
    null;

  const eventosPopulares = eventos.slice(0, 4);
  console.log(
    textos?.paginas?.inicio?.proximos?.titulo?.replace(
      "{ciudad}",
      ciudadActual,
    ),
  );

  useEffect(() => {
    let activo = true;

    async function cargarEventosProximos() {
      try {
        const proximos = await buscarEventos({
          ciudad: "",
        });

        if (activo) {
          setEventosProximos(proximos.slice(0, 4));
        }
      } catch (err) {
        console.error("Error cargando eventos de Manizales:", err);
      }
    }

    cargarEventosProximos();

    return () => {
      activo = false;
    };
  }, []);

  async function realizarBusqueda(filtros) {
    setBuscando(true);
    setBusquedaRealizada(true);
    setErrorBusqueda("");
    if (filtros.ciudad?.trim()) {
      setCiudadActual(filtros.ciudad.trim());
    }

    try {
      const eventos = await buscarEventos(filtros);

      setResultados(eventos);

      if (filtros.ciudad?.trim()) {
        setEventosProximos(eventos.slice(0, 4));
        setCiudadActual(filtros.ciudad.trim());
      }
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
        <section className="bg-main text-white h-auto lg:min-h-146">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:px-8 lg:py-16">
            {/* Columna izquierda */}
            <div>
              <span className="hidden rounded-md bg-white px-3 py-1 text-xs font-medium text-black lg:inline-block">
                {textos?.paginas?.inicio?.hero?.etiquetas?.temporada}
              </span>

              <h1 className="mt-4 text-[32px] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:mt-5 lg:text-[42px]">
                {textos?.paginas?.inicio?.hero?.titulo}
              </h1>

              <p className="mt-5 hidden max-w-xl text-base leading-relaxed text-neutral-400 lg:block">
                {textos?.paginas?.inicio?.hero?.subtitulo}
              </p>

              <Searchbar
                onBuscar={realizarBusqueda}
                textos={textos?.paginas?.inicio?.hero?.buscador}
              />
              <div className="mt-5 hidden flex-wrap items-center gap-3 text-xs lg:flex">
                <span className="text-neutral-500">
                  {textos?.paginas?.inicio?.hero?.buscador?.populares}
                </span>
                <span>
                  {textos?.paginas?.conciertos?.filtros?.etiquetas?.salsa}
                </span>
                <span>Stand-up</span>
                <span>
                  {textos?.paginas?.deportes?.filtros?.etiquetas?.futbol}
                </span>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="hidden lg:block">
              {cargando && (
                <p className="text-neutral-400">
                  {textos?.estados?.cargando?.indicador}
                </p>
              )}

              {error && <p className="text-red-400">{error}</p>}

              {!cargando && !error && eventoDestacado && (
                <Ticket
                  evento={eventoDestacado}
                  textos={textos?.paginas?.inicio?.hero?.destacado}
                  idioma={idioma}
                />
              )}

              {!cargando && !error && !eventoDestacado && (
                <p>{textos?.errores?.no_encontrado}</p>
              )}
            </div>
          </div>
        </section>

        {busquedaRealizada && (
          <section className="bg-white px-6 py-12 text-black">
            <div className="mx-auto max-w-6xl">
              {buscando && <p>{textos?.estados?.cargando?.indicador}</p>}

              {errorBusqueda && <p className="text-red-600">{errorBusqueda}</p>}

              {!buscando && !errorBusqueda && resultados.length === 0 && (
                <p>{textos?.errores?.no_encontrado}</p>
              )}

              {!buscando &&
                !errorBusqueda &&
                resultados.map((evento) => (
                  <div key={evento.id} className="mt-4 rounded-lg border p-4">
                    <h3 className="font-bold">{evento.titulo}</h3>
                    <p>{evento.recinto?.ciudad}</p>
                    <p>
                      {textos?.componentes?.precio?.desde} $
                      {Number(evento.precioDesde).toLocaleString(
                        idioma === "en" ? "en-US" : "es-CO",
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
        <Categorias
          textos={textos?.general?.categorias}
          textosCarga={textos?.estados?.cargando}
          textosEventos={textos?.paginas?.inicio?.categorias?.eventos}
        />
        <Cookies textos={textos?.cookies?.banner} />
        <SeccionEventos
          titulo={textos?.paginas?.inicio?.destacados?.titulo}
          descripcion={textos?.paginas?.inicio?.destacados?.subtitulo}
          eventos={eventosPopulares}
          textos={textos?.paginas?.inicio?.destacados}
          verTodos={textos?.paginas?.inicio?.destacados?.enlaces?.verTodos}
          textoEventoCardPrecio={textos?.componentes?.precio?.desde}
          verEventosBotones={
            textos?.paginas?.inicio?.tarjeta?.botones?.verEvento
          }
          textosCategorias={textos?.general?.categorias}
          idioma={idioma}
          textosCarga={textos?.estados?.cargando}
          testoxSinEventos={textos?.errores}
        />
        <SeccionEventos
          titulo={ciudadReemplazada}
          descripcion={textos?.paginas?.inicio?.proximos?.subtitulo}
          textos={textos?.paginas?.inicio?.proximos}
          eventos={eventosProximos}
          verTodos={textos?.paginas?.inicio?.destacados?.enlaces?.verTodos}
          textoEventoCardPrecio={textos?.componentes?.precio?.desde}
          verEventosBotones={
            textos?.paginas?.inicio?.tarjeta?.botones?.verEvento
          }
          textosCategorias={textos?.general?.categorias}
          idioma={idioma}
          textosCarga={textos?.estados?.cargando}
          textosSinEventos={textos?.errores}
        />
      </main>
      <Footer textos={textos?.footer} taquilla={textos?.sitio?.nombre} />
    </>
  );
}
