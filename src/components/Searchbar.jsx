import { useState } from "react";

export default function Searchbar({ onBuscar, textos }) {
  const [evento, setEvento] = useState("");
  const [ciudad, setCiudad] = useState("Manizales");
  const [fecha, setFecha] = useState("");

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
      className="mt-6 flex w-full flex-col gap-2 rounded-xl bg-white p-2 text-[#141414] shadow-sm lg:flex-row lg:items-center lg:gap-0"
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
          <label htmlFor="evento" className="block text-xs text-neutral-500">
            {textos?.etiquetas?.que ?? "Qué"}
          </label>
          <input
            id="evento"
            type="search"
            value={evento}
            onChange={(e) => setEvento(e.target.value)}
            placeholder={textos?.placeholders?.que ?? "Evento o artista"}
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* CIUDAD */}
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
            {textos?.etiquetas?.donde ??
              "Dónde"}
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
            {textos?.etiquetas?.cuando ??"Cuándo"}
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
        className="shrink-0 rounded-lg bg-[#141414] px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-700"
      >
        {textos?.botones?.buscar ?? "Buscar"}
      </button>
    </form>
  );
}
