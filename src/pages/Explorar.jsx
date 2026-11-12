import FiltrosEventos from "../components/FiltrosEventos.jsx";
import EventoCard from "../components/EventoCard.jsx";
import { useExplorarEventos } from "../hooks/useExplorarEventos.js";
import { useState } from "react";

export default function Explorar({ textos }) {
  const textosExplorar = textos?.paginas?.explorar;
  const [orden, setOrden] = useState("fecha");
  const { eventos, cargando, error } = useExplorarEventos();
  const ciudades = [
    ...new Set(
      eventos.map((evento) => evento?.recinto?.ciudad).filter(Boolean),
    ),
  ];
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState(null);
  const precios = eventos
    .map((evento) => Number(evento.precioDesde))
    .filter((precio) => Number.isFinite(precio));

  const limiteMinimo = precios.length ? Math.min(...precios) : 0;

  const limiteMaximo = precios.length ? Math.max(...precios) : 0;
  const eventoFiltrados = eventos.filter((evento) => {
    const coincideCategoria =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(evento.categoria);

    const coincideCiudad =
      ciudadSeleccionada === "" ||
      evento.recinto?.ciudad === ciudadSeleccionada;
    const precioEvento = Number(evento.precioDesde);

    const coincidePrecio =
      rangoPrecio === null ||
      (precioEvento >= rangoPrecio.min && precioEvento <= rangoPrecio.max);
    return coincideCategoria && coincideCiudad && coincidePrecio;
  });
  const eventoOrdenados = [...eventoFiltrados].sort((a, b) => {
    if (orden === "menor") {
      return a.precioDesde - b.precioDesde;
    }
    if (orden === "mayor") {
      return b.precioDesde - a.precioDesde;
    }
    return new Date(a.fecha) - new Date(b.fecha);
  });

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      {/* Encabezado */}
      <section className="border-b-2 border-sky-500 bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500">
            {" "}
            {textos?.navbar?.enlaces?.inicio} ›{" "}
            {textos?.navbar?.enlaces?.explorar}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {textos?.paginas?.explorar?.seo?.titulo}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {textos?.paginas?.explorar?.seo?.descripcion}
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        {/* Columna izquierda */}
        <aside>
          <FiltrosEventos
            categoriasSeleccionadas={categoriasSeleccionadas}
            setCategoriasSeleccionadas={setCategoriasSeleccionadas}
            limiteMinimo={limiteMinimo}
            limiteMaximo={limiteMaximo}
            ciudades={ciudades}
            textosFiltrados={textosExplorar?.filtros}
            ciudadSeleccionada={ciudadSeleccionada}
            setCiudadSeleccionada={setCiudadSeleccionada}
            rangoPrecio={rangoPrecio}
            setRangoPrecio={setRangoPrecio}
          />
        </aside>

        {/* Columna derecha */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              
                {(eventoFiltrados.length === 1
                  ? textosExplorar?.resultadosCorto?.uno
                  : textosExplorar?.resultadosCorto?.otro
                )?.replace("{cantidad}", eventoFiltrados.length)}
              </p>
            

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="rounded-lg border bg-white px-3 py-2 text-sm"
            >
              <option value="fecha">
                {" "}
                {textosExplorar?.orden?.opciones?.fecha}
              </option>
              <option value="menor">
                {textosExplorar?.orden?.opciones?.precio}
              </option>
              <option value="mayor">
                {textosExplorar?.orden?.opciones?.popularidad}
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {eventoOrdenados.slice(0, 9).map((evento) => (
              <EventoCard key={evento.id} evento={evento}
              textoEventoCardPrecio={textos?.componentes?.precio?.desde} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
