import { useState } from "react";

export default function Cookies({textos}) {
  const [decision, setDecision] = useState(() => {
    return sessionStorage.getItem("cookies") ?? "";
  });

  function aceptarCookies() {
    sessionStorage.setItem("cookies", "aceptadas");
    setDecision("Aceptadas");
  }
  function rechazarCookies() {
    sessionStorage.setItem("cookies", "rechazadas");
    setDecision("Rechazadas");
  }

  if (decision !== "") {
    return null;
  }
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg ">
      <h3 className="text-lg font-semibold text-neutral-900">
        {textos?.titulo ?? "Usamos cookies"}</h3>
      <p className="text-sm text-neutral-600 mt-2">
        {textos?.texto??"Usamos solo cookies necesarias para mantener tu sesion y recorder tu idioma. Puedes aceptar o rechazar"}
      </p>
      <div className="mt-4 flex justify-end gap-3 ">
        <button
          className="px-5 py-2 text-[var(--color-principal-texto)] rounded-lg border border-neutral-300 "
          onClick={rechazarCookies}
        >
          {textos?.botones?.rechazar ?? "Rechazar"}
        </button>
        <button
          className="bg-main px-5 py-2 rounded-lg text-white"
          onClick={aceptarCookies}
        >
          {textos?.botones?.aceptar ?? "Aceptar"}
        </button>
      </div>
    </div>
  );
}
