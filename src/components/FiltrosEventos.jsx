import { useCategorias } from "../hooks/useCategoria.js";
import { useState } from "react";
export default function FiltrosEventos({
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  limiteMinimo,
  limiteMaximo,
  ciudades,
  textosFiltrados,
  ciudadSeleccionada,
  setCiudadSeleccionada,
  rangoPrecio,
  setRangoPrecio
}) {
  const { categorias, cargando, error } = useCategorias();
  
  const [fechaSeleccionada, setFechaSeleccionada] = useState("hoy");

  const precioMinimo = rangoPrecio?.min ?? limiteMinimo;
  const precioMaximo = rangoPrecio?.max ?? limiteMaximo;
  function cambiarCategoria(id) {
    setCategoriasSeleccionadas((anteriores) => {
      if (anteriores.includes(id)) {
        return anteriores.filter((categoria) => categoria !== id);
      }

      return [...anteriores, id];
    });
  }
  const opcionesFecha = [
  { id: "hoy", texto: textosFiltrados?.fecha?.hoy },
  { id: "finDeSemana", texto: textosFiltrados?.fecha?.finDeSemana },
  { id: "mes", texto: textosFiltrados?.fecha?.mes },
  { id: "elegir", texto: textosFiltrados?.fecha?.elegir },
];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold">{textosFiltrados?.titulo}</h2>

        <button className="text-xs text-gray-500">{textosFiltrados?.botones?.limpiar}</button>
      </div>

      <hr className="mb-5 border-gray-200" />

      <h3 className="mb-3 text-sm font-semibold">{textosFiltrados?.categoria}</h3>

      {cargando && <p>Cargando categorías...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!cargando && !error && (
        <div className="flex flex-col gap-3">
          {categorias.map((categoria) => (
            <label
              key={categoria.id}
              className="flex cursor-pointer items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-black"
                  checked={categoriasSeleccionadas.includes(categoria.id)}
                  onChange={() => cambiarCategoria(categoria.id)}
                />

                <span className="text-sm">{categoria.nombre}</span>
              </span>

              <span className="text-xs text-gray-400">{categoria.eventos}</span>
            </label>
          ))}
        </div>
      )}
      <hr className="my-5 border-gray-200" />

      <h3 className="mb-3 text-sm font-semibold">{textosFiltrados?.fecha?.titulo}</h3>
      <div className="flex flex-wrap gap-2">
  {opcionesFecha.map((opcion) => (
    <button
      key={opcion.id}
      type="button"
      onClick={() => setFechaSeleccionada(opcion.id)}
      className={`rounded-full border px-2 py-2 text-xs ${
        fechaSeleccionada === opcion.id
          ? "border-black bg-black text-white"
          : "border-gray-200 bg-white text-gray-700"
      }`}
    >
      {opcion.texto}
    </button>
  ))}
</div>
      <hr className="my-5 border-gray-200" />

      <h3 className="mb-3 text-sm font-semibold">{textosFiltrados?.ciudad}</h3>

      <select
        value={ciudadSeleccionada}
        onChange={(e) => setCiudadSeleccionada(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-sky-500"
      >
       {/* <option value="">Todas las ciudades</option> */}

{ciudades.map((ciudad) => (
  <option key={ciudad} value={ciudad}>
    {ciudad}
  </option>
))}
      </select>

      <hr className="my-5 border-gray-200" />

      <h3 className="mb-4 text-sm font-semibold">{textosFiltrados?.precio}</h3>

      <div className="relative h-6">
        <div className="absolute top-2.5 h-1 w-full rounded-full bg-gray-200" />

        <div
          className="absolute top-2.5 h-1 rounded-full bg-gray-800"
          style={{
            left: `${((precioMinimo - limiteMinimo) / (limiteMaximo - limiteMinimo || 1)) * 100}%`,
            right: `${100 - ((precioMaximo - limiteMinimo) / (limiteMaximo - limiteMinimo || 1)) * 100}%`,
          }}
        />

        <input
          type="range"
          min={limiteMinimo}
          max={limiteMaximo}
          step="1"
          value={precioMinimo}
          disabled={limiteMinimo === limiteMaximo}
          onChange={(e) =>
            setRangoPrecio({
              min: Math.min(Number(e.target.value), precioMaximo),
              max: precioMaximo,
            })
          }
          className="precio-rango precio-rango-min"
        />

        <input
          type="range"
          min={limiteMinimo}
          max={limiteMaximo}
          step="1"
          value={precioMaximo}
          disabled={limiteMinimo === limiteMaximo}
          onChange={(e) =>
            setRangoPrecio({
              min: precioMinimo,
              max: Math.max(Number(e.target.value), precioMinimo),
            })
          }
          className="precio-rango precio-rango-max"
        />
      </div>

      <div className="mt-2 flex justify-between text-xs">
        <span>${precioMinimo.toLocaleString("es-CO")}</span>
        <span>${precioMaximo.toLocaleString("es-CO")}</span>
      </div>
    </div>
  );
}
