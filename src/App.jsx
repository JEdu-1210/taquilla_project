import { useTextos } from "./hooks/useTextos.js";
import "./styles/App.css";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState } from "react";

function leerSeleccion() {
  return (window.location.hash.slice(1) || "inicio");
}
function App() {
  //Idioma por defecto español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeleccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);

  const datos = useTextos(idioma);
  console.log(datos);
  const ingles = idioma === "en";
  const titulo =
    activo === "favorito"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  useEffect(() => {
    function actualizar() {
      setActivo(leerSeleccion());
      setConsulta("");
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);
  useEffect(() => {
    document.documentElement.lang;
  }, [idioma]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

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
        texto={textoGrande}
        alternarTexto={()=> setTextoGrande((valor)=> !valor)}
      />
    </>
  );
}

export default App;
