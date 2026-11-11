import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function Accesibilidad({ icono }) {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const dropdownRef = useRef(null);

  const aumentarTexto = () => {
    // Here will go the maxium textSize value
    setTextSize((prev) => prev + 0.06);
  };
  const disminuirTexto = () => {
    if (textSize > 0.6) {
      setTextSize((prev) => prev - 0.06);
    }
  };
  const actualizarCssClase = () => {
    document.documentElement.style.setProperty(
      "--texto-normal",
      `${textSize}rem`,
    );
  };

  useEffect(() => {
    actualizarCssClase();
  }, [textSize]);
  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón disparador */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="navbar-icono navbar-accesibilidad inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
      >
        {icono}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-90 p-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 grid gap-3">
            {/* Accesibilidad "header" */}
            <div className="grid grid-cols-12 text-[20px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <div className="col-span-11">Accesibilidad</div>
              <button onClick={() => setIsOpen(false)} className="col-span-1">
                <IoMdClose />
              </button>
            </div>

            {/* Text size div */}
            <div>
              <div className="w-full">Tamano del texto</div>
              <div className="w-full grid grid-cols-12 p-1 rounded-xl outline outline-mist-200">
                <buttons
                  className="cursor-pointer col-span-2 flex items-center justify-center font-bold text-lg rounded-lg w-10 h-10  p-1 bg-gray-100 text-center"
                  onClick={disminuirTexto}
                >
                  -
                </buttons>
                <div
                  style={{ "--texto-normal": textSize }}
                  className={`col-span-8 flex items-center justify-center texto-normal`}
                >
                  A
                </div>
                <buttons
                  className="cursor-pointer col-span-2 flex items-center justify-center font-bold text-lg rounded-lg w-10 h-10  p-1 bg-gray-100 text-center"
                  onClick={aumentarTexto}
                >
                  +
                </buttons>
              </div>
            </div>

            {/* Toggles Buttons */}
            <div className="w-full">
              {/* Primer boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem]">Alto contraste</div>
                  <div className="w-full text-[14px]">
                    Mas diferencia entre el texto y el fondo
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {/* Toggle button ... */}
                  <label
                    for="AceptarCondiciones"
                    class="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500"
                  >
                    <input
                      type="checkbox"
                      id="AceptarCondiciones"
                      class="peer sr-only"
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Segundo boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    Reducir movimiento
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    Sin animaciones ni transiciones
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {/* Toggle button ... */}
                  <label
                    for="ReducriMovimiento"
                    class="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500"
                  >
                    <input
                      type="checkbox"
                      id="ReducriMovimiento"
                      class="peer sr-only"
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Tercer boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    Subrayar enlaces
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    Los enlaces se distinguen sin depender del color
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {/* Toggle button ... */}
                  <label
                    for="SubrayarEnlace"
                    class="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500"
                  >
                    <input
                      type="checkbox"
                      id="SubrayarEnlace"
                      class="peer sr-only"
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Cuarto boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    Espaciado de lectura
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    Mas espacio entre lineas y entre letras
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {/* Toggle button ... */}
                  <label
                    for="EspaciadoLectura"
                    class="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500"
                  >
                    <input
                      type="checkbox"
                      id="EspaciadoLectura"
                      class="peer sr-only"
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Texto nota */}
            <div className="w-full font-normal text-[12px]">
              Se guarda en este dispositivo. Los valores iniciales salen de lo
              que ya definiste en tu sistema.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
