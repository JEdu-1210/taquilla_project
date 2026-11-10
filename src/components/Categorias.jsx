
import { useCategorias } from "../hooks/useCategoria.js";

import {
  LuMusic,
  LuStar,
  LuTrophy,
  LuFlag,
  LuSmile,
  LuUsersRound,
} from "react-icons/lu";

const iconos = {
  conciertos: LuMusic,
  teatro: LuStar,
  deportes: LuTrophy,
  festivales: LuFlag,
  comedia: LuSmile,
  familiares: LuUsersRound,
};

export default function Categorias({ textos }) {
  const { categorias, cargando, error } = useCategorias();

  return (
    <section className="bg-[#f7f7f7] px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

        {cargando && (
          <p>Cargando categorías...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!cargando &&
          !error &&
          categorias.map((categoria) => {
            const Icono = iconos[categoria.id] || LuStar;

            return (
              <a
                key={categoria.id}
                href={`#explorar?categoria=${categoria.id}`}
                className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <Icono size={22} />

                <h3 className="font-semibold text-neutral-900">
                  {textos?.[categoria.id] ?? categoria.nombre}
                </h3>

                <p className="text-sm text-neutral-500">
                  {categoria.eventos} eventos
                </p>
              </a>
            );
          })}

      </div>
    </section>
  );
}
