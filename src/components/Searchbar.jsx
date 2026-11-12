import { useState } from "react";

export default function Searchbar({ onBuscar, textos }) {
  const [evento, setEvento] = useState("");
  const [ciudad, setCiudad] = useState("Manizales");
  const [fecha, setFecha] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  function buscar(e) {
    e.preventDefault();

    onBuscar({
      q: evento,
      ciudad: ciudad,
      desde: fecha || "",
      hasta: fecha || "",
    });
  }

  return (
    <form
      onSubmit={buscar}
      className="mt-6 flex w-full flex-wrap items-center gap-2 rounded-xl bg-white p-2 text-[#141414] shadow-sm lg:flex-nowrap lg:gap-0"
    >
      {/* EVENTO */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-0 py-2">
        <svg
          className="h-5 w-5 shrink-0 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 5 5" />
        </svg>

        <div className="min-w-0 flex-1">
          <label
            htmlFor="evento"
            className="hidden text-xs text-neutral-500 lg:block"
          >
            {textos?.etiquetas?.que}
          </label>

          <input
            id="evento"
            type="search"
            value={evento}
            onChange={(e) => setEvento(e.target.value)}
            placeholder={textos?.placeholders?.que}
            aria-label={textos?.etiquetas?.que}
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />

          <p className="mt-1 truncate text-xs text-neutral-500 lg:hidden">
            {ciudad}
            {fecha ? ` · ${fecha}` : ""}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        aria-expanded={mostrarFiltros}
        aria-controls="filtros-buscador-movil"
        aria-label={textos?.botones?.filtros}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[#141414] lg:hidden"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 17h16M9 4v6M15 14v6" />
        </svg>
      </button>
      {/* CIUDAD */}
      <div
        id="filtros-buscador-movil"
        className={`w-full flex-col gap-2 lg:contents ${
          mostrarFiltros ? "flex" : "hidden"
        }`}
      ></div>
      <div className="flex min-w-0 flex-1 items-center gap-3 border-t border-neutral-200 px-3 py-2 lg:border-t-0 lg:border-l">
        <svg
          className="h-5 w-5 shrink-0 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>

        <div className="min-w-0 flex-1">
          <label htmlFor="ciudad" className="block text-xs text-neutral-500">
            {textos?.etiquetas?.donde}
          </label>
          <input
            id="ciudad"
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* FECHA */}
      <div className="flex min-w-0 flex-1 items-center gap-3 border-t border-neutral-200 px-3 py-2 lg:border-t-0 lg:border-l">
        <svg
          className="h-5 w-5 shrink-0 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>

        <div className="min-w-0 flex-1">
          <label htmlFor="fecha" className="block text-xs text-neutral-500">
            {textos?.etiquetas?.cuando}
          </label>

          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className={`w-full shrink-0 rounded-lg bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 lg:w-auto lg:py-4 ${
          mostrarFiltros ? "block" : "hidden lg:block"
        }`}
      >
        {textos?.botones?.buscar}
      </button>
    </form>
  );
}
