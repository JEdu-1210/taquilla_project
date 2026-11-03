
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/eventosService.js";
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

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const datos = await obtenerCategorias();
        setCategorias(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarCategorias();
  }, []);

  return (
    <section className="bg-[#f7f7f7] px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {cargando && <p>Cargando categorías...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!cargando &&
  !error &&
  categorias.map((categoria) => {
    const Icono = iconos[categoria.id] || LuStar;

    return (
      <a
        key={categoria.id}
        href={`#explorar?categoria=${categoria.id}`}
        className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-[#141414] transition hover:shadow-md"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
          <Icono size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold capitalize">
            {categoria.nombre}
          </h3>

          <p className="text-xs text-neutral-500">
            {categoria.eventos} eventos
          </p>
        </div>
      </a>
    );
  })}
      </div>
    </section>
  );
}
