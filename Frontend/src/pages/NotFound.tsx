import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGoHome = () => {
    navigate(isLoggedIn ? "/" : "/welcome");
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 py-16 font-body-md text-on-background animate-fade-in">
      <div className="max-w-md w-full text-center">

        <p className="font-headline-lg text-[7rem] sm:text-[9rem] leading-none font-extrabold text-primary/15 select-none">
          404
        </p>

        <h1 className="font-headline-lg text-3xl font-extrabold text-stone-900 tracking-tight -mt-2 sm:-mt-4 mb-3">
          Página no encontrada
        </h1>

        <p className="font-body-md text-stone-500 mb-8 leading-relaxed">
          Esta página no forma parte de nuestro catálogo. Puede que el enlace esté roto o que se haya movido.
        </p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-on-primary font-label-caps text-xs rounded-xl shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-200 uppercase tracking-widest cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Volver al inicio
        </button>
      </div>
    </main>
  );
};

export default NotFound;