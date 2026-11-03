
export default function Ticket({ evento }) {
  const fecha = new Date(evento.fecha).toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const precio = evento.precioDesde.toLocaleString("es-CO");

  return (
    <div className="relative flex w-full max-w-[1000px] min-h-[290px] items-end overflow-hidden rounded-xl bg-linear-to-br from-[#a99dbd] via-[#a98c99] to-[#ad8179] p-4">
      {/* Círculo decorativo */}
      <div className="absolute -top-16 -right-14 h-64 w-64 rounded-full bg-white/10" />

      {/* Tarjeta blanca */}
      <div className="relative z-10 w-full rounded-xl bg-white p-5 text-black shadow-lg">
        <span className="rounded-md bg-neutral-100 px-3 py-1 text-xs">
          Destacado
        </span>

        <h2 className="mt-3 text-xl font-bold">
          {evento.titulo}
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          {fecha} · {evento.recinto.nombre}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">
            Desde ${precio}
          </p>

          <a
            href={`#evento/${evento.slug}`}
            className="rounded-lg bg-[#141414] px-5 py-3 text-sm !text-white transition hover:bg-neutral-700"
          >
            Ver evento
          </a>
        </div>
      </div>
    </div>
  );
}
