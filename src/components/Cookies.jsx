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
    <div className="fixed bottom-4 left-4 right-4 z-50 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[420px] sm:max-w-[calc(100vw-3rem)] sm:-translate-x-1/2 sm:p-6">
      <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">
        {textos?.titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {textos?.texto}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          cclassName="min-w-0 rounded-lg border border-neutral-300 px-3 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
          onClick={rechazarCookies}
        >
          {textos?.botones?.rechazar}
        </button>
        <button
          className="min-w-0 rounded-lg bg-main px-3 py-3 text-sm font-medium text-white transition hover:opacity-90"
          onClick={aceptarCookies}
        >
          {textos?.botones?.aceptar}
        </button>
      </div>
    </div>
  );
}
