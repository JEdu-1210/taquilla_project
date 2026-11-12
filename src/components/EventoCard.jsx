
import { LuCalendarDays, LuMapPin } from "react-icons/lu";

export default function EventoCard({ evento, textoEventoCardPrecio,verEventosBotones,textosCategorias,idioma }) {
  const fecha = new Date(evento.fecha);

  const fechaTexto = new Intl.DateTimeFormat(
  idioma === "en" ? "en-US" : "es-CO",
  {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Bogota",
  }
).format(fecha);

const precio = Number(evento.precioDesde).toLocaleString(
  idioma === "en" ? "en-US" : "es-CO"
);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white text-[#141414] w-[230px] shrink-0 lg:w-auto">
      {/* Afiche decorativo */}
     { <div
        className="relative h-40 overflow-hidden"
        style={{
          background: `linear-gradient( 135deg, ${evento.afiche?.color1 || "#777"}, ${evento.afiche?.color2 || "#aaa" })`
        }}
      >
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/15" />
        <div className="absolute -bottom-14 -left-8 h-28 w-28 rounded-full bg-black/15" />
      </div>}

      {/* Información */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 w-fit rounded bg-neutral-100 px-2 py-1 text-[10px]">
          {textosCategorias?.[evento.categoria] ?? evento.categoria}
        </span>

        <h3 className="text-base font-bold leading-snug">
          {evento.titulo}
        </h3>

        <div className="mt-3 space-y-2 text-xs text-neutral-500">
          <p className="flex items-center gap-2">
            <LuCalendarDays className="shrink-0" size={14} />
            <span>{fechaTexto}</span>
          </p>

          <p className="flex items-center gap-2">
            <LuMapPin className="shrink-0" size={14} />
            <span>
              {evento.recinto?.nombre}, {evento.recinto?.ciudad}
            </span>
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[10px] text-neutral-500">{textoEventoCardPrecio}</p>
            <p className="text-sm font-semibold">${precio}</p>
          </div>

          <a
            href={`#evento/${evento.slug}`}
            className="rounded-md border border-neutral-300 px-4 py-2 text-xs font-medium text-[#141414] transition hover:bg-neutral-100"
          >
            {verEventosBotones}
          </a>
        </div>
      </div>
    </article>
  );
}
