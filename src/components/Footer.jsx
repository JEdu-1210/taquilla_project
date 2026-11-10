
import { LuTicket } from "react-icons/lu";

export default function Footer({textos}) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-main text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Parte superior */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black">
                <LuTicket size={20} />
              </div>

              <span className="text-lg font-bold">
                taquilla
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {textos?.lema ?? "Conciertos, teatro, deportes y festivales en un solo lugar. Explora eventos y consulta sus detalles."}
            </p>
          </div>

          {/* Explora */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-400">
            {textos?.columnas?.explora?.titulo??"Explora"}
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a href="#inicio" className="hover:text-neutral-400">
                {textos?.columnas?.explora?.enlaces?.inicio?? "Inicio"}
              </a>

              <a href="#explorar" className="hover:text-neutral-400">
                {textos?.columnas?.explora?.enlaces?.explorar?? "Explorar eventos"}
              </a>
            </div>
          </div>

          {/* Tu cuenta */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-400">
              {textos?.columnas?.cuenta?.titulo??"Tu cuenta"}
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a href="#iniciar-sesion" className="hover:text-neutral-400">
                {textos?.columnas?.cuenta?.enlaces?.ingresar??"Iniciar sesión"}
              </a>

              <a href="#crear-cuenta" className="hover:text-neutral-400">
                {textos?.columnas?.cuenta?.enlaces?.crearCuenta ?? "Crear cuenta"}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-400">
              {textos?.columnas?.legal?.titulo??"Legal"}
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a href="#terminos" className="hover:text-neutral-400">
              {textos?.columnas?.legal?.enlaces?.terminos ?? "Términos de uso"}
              </a>

              <a href="#accesibilidad" className="hover:text-neutral-400">
                {textos?.columnas?.legal?.enlaces?.accesibilidad??"Accesibilidad"}
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-10 border-t border-neutral-800 pt-6">

          {/* Parte inferior */}
          <div className="flex flex-col justify-between gap-3 text-xs text-neutral-500 sm:flex-row">
          {textos?.legal?.derechos.replace("{anio}",year) ?? `© ${year} Taquilla · Proyecto académico`}

           <p>{textos?.legal?.nota?? "Datos de ejemplo con fines académicos."}</p> 
          </div>
        </div>

      </div>
    </footer>
  );
}
