
import EventoCard from "./EventoCard.jsx";

export default function SeccionEventos({
  titulo,
  descripcion,
  verTodos,
  textos,
  eventos = [],
  cargando = false,
  error = "",
  textoEventoCardPrecio,
  verEventosBotones,
  textosCategorias,
  idioma,
  textosCarga,
  textosSinEventos
}) {
  return (
    <section className="bg-[#f7f7f7] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Encabezado */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#141414]">
              {titulo}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {descripcion}
            </p>
          </div>

          <a
            href="#explorar"
            className="shrink-0 text-sm font-medium text-[#141414] hover:underline"
          >
            {verTodos}
          </a>
        </div>

        {/* Estado de carga */}
        {cargando && (
          <p className="text-neutral-500">
            {textosCarga?.indicador}
          </p>
        )}

        {/* Error de la API */}
        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {/* Tarjetas de eventos */}
        {!cargando && !error && (
          <>
            {eventos.length === 0 ? (
              <p className="text-neutral-500">
               {textosSinEventos?.no_encontrado}
              </p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
                {eventos.slice(0, 4).map((evento) => (
                  <EventoCard
                    key={evento.id}
                    evento={evento}
                    textoEventoCardPrecio={textoEventoCardPrecio}
                    verEventosBotones={verEventosBotones}
                    textosCategorias={textosCategorias}
                    idioma={idioma}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
