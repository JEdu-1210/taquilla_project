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

export default function Categorias({ textos, textosCarga, textosEventos }) {
  const { categorias, cargando, error } = useCategorias();

  return (
    <section className="bg-[#f7f7f7] px-4 py-5 lg:px-6 lg:py-12">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:pb-0">
        {cargando && <p>{textosCarga?.titulo}</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!cargando &&
          !error &&
          categorias.map((categoria) => {
            const Icono = iconos[categoria.id] || LuStar;

            return (
              <a
                key={categoria.id}
                href={`#explorar?categoria=${categoria.id}`}
                className="flex shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-center transition hover:bg-neutral-100 lg:flex-col lg:gap-3 lg:rounded-xl lg:p-6 lg:hover:-translate-y-1 lg:hover:shadow-md"
              >
                <Icono size={22} className="hidden lg:block" />

                <h3 className="whitespace-nowrap text-sm font-medium text-neutral-900 lg:text-base lg:font-semibold">
                  {textos?.[categoria.id] ?? categoria.nombre}
                </h3>

                <p className="hidden text-sm text-neutral-500 lg:block">
                  {(categoria.eventos === 1
                    ? textosEventos?.uno
                    : textosEventos?.otro
                  )?.replace("{cantidad}", categoria.eventos)}
                </p>
              </a>
            );
          })}
      </div>
    </section>
  );
}
