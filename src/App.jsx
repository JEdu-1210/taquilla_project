
import { useTextos } from "./hooks/useTextos.js";
import "./styles/App.css";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState } from "react";
import HomePage from "./pages/home.page.jsx";
import Cookies from "./components/Cookies.jsx";

function leerSeleccion() {
  return window.location.hash.slice(1) || "inicio";
}

function App() {
  // Idioma por defecto: español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeleccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);

const datos = useTextos(idioma);

  // Detectar cambios en la navegación
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeleccion());
      setConsulta("");
    }

    window.addEventListener("hashchange", actualizar);

    return () => {
      window.removeEventListener("hashchange", actualizar);
    };
  }, []);

  // Actualizar idioma del documento
  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  // Ajustar tamaño del texto
  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";

    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

  // Función de búsqueda
  function buscar(valor) {
    setConsulta(valor);
    setActivo("heroes");
    window.history.replaceState(null, "", "#heroes");
  }

  return (
    <>
      <Navbar
        {...datos}
        idioma={idioma}
        cambiarIdioma={setIdioma}
        activo={activo}
        onBuscar={buscar}
        textoGrande={textoGrande}
        alternarTexto={() => setTextoGrande(valor => !valor)}
      />
  
      {activo === "inicio" && <HomePage 
      idioma = {idioma}
      textos= {datos.textos} 
      />}

      
    </>
  );
}

export default App;
