import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function Accesibilidad({ icono, textos }) {
  const textosAccesibilidad = textos?.accesibilidad


  const [isOpen, setIsOpen] = useState(false);
  const [isLinkUnderline, setIsLinkUnderline] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reduccionVelocidad, setReduccionVelocidad] = useState(false);
  const [restablecer, setRestablecer] = useState(false);
  const [espaciadoLectura, setEspaciadoLectura] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const dropdownRef = useRef(null);

  const init = () => {
    actualizarTextSize();
    subrayarEnlaces();
  };

  const aumentarTexto = () => {
    // Here will go the maxium textSize value
    setTextSize((prev) => prev + 0.06);
  };
  const disminuirTexto = () => {
    if (textSize > 0.6) {
      setTextSize((prev) => prev - 0.06);
    }
  };
  const actualizarTextSize = () => {
    document.documentElement.style.setProperty(
      "--texto-normal",
      `${textSize}rem`,
    );
  };

  const subrayarEnlaces = () => {
    const bodyClasses = document.body.classList;
    if (bodyClasses.contains("subrayar-enlaces")) {
      document.body.classList.remove("subrayar-enlaces");
      setIsLinkUnderline(false);
    } else {
      document.body.classList.add("subrayar-enlaces");
      setIsLinkUnderline(true);
    }
  };

  const activarAltoContraste = () => {
    const bodyClasses = document.body.classList;
    if (bodyClasses.contains("alto-contraste")) {
      document.body.classList.remove("alto-contraste");
      setIsHighContrast(false);
    } else {
      document.body.classList.add("alto-contraste");
      setIsHighContrast(true);
    }
  };
  const activarReduccionVelocidad = () => {
    const bodyClasses = document.body.classList;
    if (bodyClasses.contains("reducir-movimiento")) {
      document.body.classList.remove("reducir-movimiento");
      setReduccionVelocidad(false);
    } else {
      document.body.classList.add("reducir-movimiento");
      setReduccionVelocidad(true);
    }
  };
  const activarEspaciadoLectura = () => {
    const bodyClasses = document.body.classList;
    if (bodyClasses.contains("espaciado-lectura")) {
      document.body.classList.remove("espaciado-lectura");
      setEspaciadoLectura(false);
    } else {
      document.body.classList.add("espaciado-lectura");
      setEspaciadoLectura(true);
    }
  };
  const activarBotonRestablecer=()=>{
    document.body.classList.remove("reducirMovimiento","espaciado-lectura","alto-contraste","subrayar-enlaces")
    setEspaciadoLectura(false)
    setIsHighContrast(false)
    setReduccionVelocidad(false)
    setIsLinkUnderline(false)  
  
  };
  useEffect(() => {
    actualizarTextSize();
  }, [textSize]);
  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    init();
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
        <div className="absolute right-0 z-50 mt-2 w-100 p-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 grid gap-3">
            {/* Accesibilidad "header" */}
            <div className="grid grid-cols-12 text-[20px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <div className="col-span-11">{textosAccesibilidad?.titulo}</div>
              <button onClick={() => setIsOpen(false)} className="col-span-1">
                <IoMdClose />
              </button>
            </div>

            {/* Text size div */}
            <div>
              <div className="w-full">{textosAccesibilidad?.tamanoTexto}</div>
              <div className="w-full grid grid-cols-12 p-1 rounded-xl outline outline-mist-200">
                <button
                  className="cursor-pointer col-span-2 flex items-center justify-center font-bold text-lg rounded-lg w-10 h-10  p-1 bg-gray-100 text-center"
                  onClick={disminuirTexto}
                >
                  -
                </button>
                <div
                  style={{ "--texto-normal": textSize }}
                  className={`col-span-8 flex items-center justify-center texto-normal`}
                >
                  {textosAccesibilidad?.muestraTamano}
                </div>
                <button
                  className="cursor-pointer col-span-2 flex items-center justify-center font-bold text-lg rounded-lg w-10 h-10  p-1 bg-gray-100 text-center"
                  onClick={aumentarTexto}
                >
                  +
                </button>
              </div>
            </div>

            {/* Toggles Buttons */}
            <div className="w-full">
              {/* Primer boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem]">{textosAccesibilidad?.altoContraste?.nombre}</div>
                  <div className="w-full text-[14px]">
                    {textosAccesibilidad?.altoContraste?.descripcion}
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
                      checked={isHighContrast}
                      onChange={activarAltoContraste}
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Segundo boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    {textosAccesibilidad?.reducirMovimiento?.nombre}
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    {textosAccesibilidad?.reducirMovimiento?.descripcion}
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
                      checked={reduccionVelocidad}
                      onChange={activarReduccionVelocidad}
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Tercer boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    {textosAccesibilidad?.subrayarEnlaces?.nombre}
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    {textosAccesibilidad?.subrayarEnlaces?.descripcion}
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
                      checked={isLinkUnderline}
                      onChange={subrayarEnlaces}
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
              {/* Cuarto boton toggle completo */}
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-10">
                  <div className="w-full text-[1rem] font-medium">
                    {textosAccesibilidad?.espaciadoLectura?.nombre}
                  </div>
                  <div className="w-full text-[14px] font-normal">
                    {textosAccesibilidad?.espaciadoLectura?.descripcion}
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
                      checked={espaciadoLectura}
                      onChange={activarEspaciadoLectura}
                    />

                    <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Texto nota */}
            <div className="w-full font-normal text-[12px]">
              {textosAccesibilidad?.nota}
            </div>

            {/* Elemento del footer de accesibilidad */}
            <div className="w-full flex items-center justify-between">
              <div className="underline">{textosAccesibilidad?.enlaces?.declaracion}</div>
              <button className="outline-1 outline-black rounded-lg py-2 w-28" onClick={activarBotonRestablecer}>
              
                {textosAccesibilidad?.botones?.restablecer}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
