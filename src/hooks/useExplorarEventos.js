import { buscarEventos } from "../services/eventosService.js";
import { useEffect, useState } from "react";

export function useExplorarEventos(){
    const [eventos, setEventos]= useState([]);
    const [error, setError]= useState("");
    const [cargando, setCargando]= useState(true);


  useEffect(() => {
  async function cargarEvento() {
    try {
      const datos = await buscarEventos();
      setEventos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  cargarEvento();
}, []);
return{ eventos,cargando,error}
}