import { useEffect, useRef, useState } from "react";
import Icono from "./Icono.jsx";
import "../styles/Navbar.css";
import Accesibilidad from "./Accesibilidad.jsx";
import { LuUserRound } from "react-icons/lu";

const DESTINOS = {
  inicio: "#inicio",
  explorar: "#explorar",
};

export default function Navbar({
  textos,
  cargando,
  error,
  recargar,
  idioma,
  cambiarIdioma,
  activo,
  onBuscar,
  textoGrande,
  alternarTexto,
}) {
  const menuMovil = textos?.menuMovil;
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const botonMenu = useRef(null);
  const campoBusqueda = useRef(null);
  const nav = textos?.navbar;
  const ingles = idioma === "en";
  const abrir = menuMovil?.abrir;
  const cerrar = menuMovil?.cerrar;
  const enlaces = Object.entries(nav?.enlaces ?? {}).filter(
    ([clave]) => DESTINOS[clave],
  );

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key === "Escape" && abierto) {
        setAbierto(false);
        botonMenu.current?.focus();
      }
    }
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

  function abrirBusqueda() {
    setAbierto(true);
    requestAnimationFrame(() => campoBusqueda.current?.focus());
  }

  function buscar(evento) {
    evento.preventDefault();
    const consulta = busqueda.trim();
    if (!consulta) return;
    onBuscar(consulta);
    setAbierto(false);
  }

  return (
    <header className="navbar">
      <nav
        className="navbar-interior"
        aria-label={nav?.aria.menu}
      >
        <a
          className="navbar-marca"
          href="#inicio"
          aria-label={nav?.logo.aria}
          onClick={() => setAbierto(false)}
        >
          <span className="navbar-simbolo" aria-hidden="true">
            <Icono nombre="ticket" />
          </span>
          <span>{nav?.logo.texto}</span>
        </a>

        <div className="navbar-movil-acciones">
          <button
            type="button"
            className="navbar-icono"
            aria-label={nav?.buscador.aria}
            disabled={!nav}
            onClick={abrirBusqueda}
          >
            <Icono nombre="buscar" />
          </button>
          {nav && (
            <a
              className="navbar-icono"
              href="#ingresar"
              aria-label={nav.botones.ingresar}
              onClick={() => setAbierto(false)}
            >
              <LuUserRound size={20} />
            </a>
          )}
          <button
            ref={botonMenu}
            type="button"
            className="navbar-icono"
            aria-label={abierto ? cerrar : abrir}
            aria-expanded={abierto}
            aria-controls="navbar-panel"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? "cerrar" : "menu"} />
          </button>
        </div>

        <div
          id="navbar-panel"
          className={`navbar-panel${abierto ? " is-abierto" : ""}`}
          aria-busy={cargando}
        >
          {cargando && (
            <p className="navbar-estado" role="status">
              {textos?.estados?.cargando?.indicador}
            </p>
          )}
          {error && (
            <div className="navbar-estado" role="alert">
              <button type="button" onClick={recargar}>
                
                {textos?.general?.acciones?.reintentar}
              </button>
            </div>
          )}
          {nav && (
            <>
              <ul className="navbar-enlaces">
                {enlaces.map(([clave, etiqueta]) => (
                  <li key={clave}>
                    <a
                      href={DESTINOS[clave]}
                      aria-current={activo === clave ? "page" : undefined}
                      onClick={() => setAbierto(false)}
                    >
                      {etiqueta}
                    </a>
                  </li>
                ))}
              </ul>
              <form
                className="navbar-buscador"
                role="search"
                aria-label={nav.buscador.aria}
                onSubmit={buscar}
              >
                <button type="submit" aria-label={nav.buscador.boton}>
                  <Icono nombre="buscar" />
                </button>
                <input
                  ref={campoBusqueda}
                  type="search"
                  value={busqueda}
                  onChange={(evento) => setBusqueda(evento.target.value)}
                  placeholder={nav?.buscador?.placeholder}
                  aria-label={nav?.buscador?.aria}
                  required
                />
              </form>
              {nav?.enlaces?.venderEventos && (
                <a
                  href="#vender"
                  className="navbar-vende"
                  onClick={() => setAbierto(false)}
                >
                  {nav?.enlaces?.venderEventos}
                </a>
              )}
            </>
          )}
         
            <Accesibilidad
              icono={<Icono nombre="accesibilidad" />}
              textos={textos}/>
          <div className="navbar-utilidades">
            <label className="navbar-idioma">
              <Icono nombre="idioma" />
              <select
                value={idioma}
                onChange={(evento) => cambiarIdioma(evento.target.value)}
                aria-label={nav?.aria?.idioma}
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
            </label>
            
            {nav && (
              <a
                className="navbar-accion"
                href="#ingresar"
                onClick={() => setAbierto(false)}
              >
                {nav?.botones?.ingresar}
              </a>
            )}
          </div>
          <button
            type="button"
            className="Navbar-Crear-Cuenta"
            onClick={() => setAbierto(false)}
          >
            {nav?.botones?.crearCuenta}
          </button>
        </div>
      </nav>
    </header>
  );
}
