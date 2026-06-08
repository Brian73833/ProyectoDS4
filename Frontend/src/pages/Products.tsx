import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  return (
    <main className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-secondary hover:text-primary font-semibold transition-colors duration-200 group cursor-pointer"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform duration-200">
            arrow_back
          </span>
          Volver al inicio
        </button>
      </div>

      <header className="mb-10">
        <span className="font-label-caps text-xs text-[#E2725B] uppercase tracking-widest block font-bold mb-2">
          COLECCIÓN EXCLUSIVA
        </span>
        <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-on-surface">
          Catálogo de Productos
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-stone-500 mt-2 max-w-2xl leading-relaxed">
          Explore our range of high-performance architectural materials and ceramic items.
        </p>
      </header>

      <section className="mb-6">
        <p className="font-body-md text-sm text-stone-500 font-semibold">
          {products.length} productos disponibles
        </p>
      </section>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-primary font-body-md text-lg font-semibold animate-pulse">
            Cargando productos...
          </div>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-error font-body-md text-lg bg-red-50 border border-red-200 rounded-2xl p-6">
          <span className="material-symbols-outlined text-4xl mb-2 text-error block">
            error
          </span>
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.productResourceId} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-stone-400 font-body-md text-lg bg-stone-50 border border-slate-200 rounded-2xl p-6">
          <span className="material-symbols-outlined text-4xl mb-2 text-stone-450 block">
            info
          </span>
          No se encontraron productos disponibles.
        </div>
      )}

      <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t-2 border-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest block font-bold">
              Quality Standards
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-on-surface">
              Architectural Integrity
            </h2>
            <p className="font-body-lg text-lg sm:text-xl text-secondary leading-relaxed">
              Every ceramic component produced in our factory undergoes rigorous
              thermal stress testing and compression analysis to ensure
              structural longevity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-headline-md text-2xl font-semibold text-on-surface">
                  ISO 9001
                </h4>
                <p className="font-body-md text-base text-secondary mt-1">
                  Certified quality management in every kiln batch.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-headline-md text-2xl font-semibold text-on-surface">
                  100% Raw Clay
                </h4>
                <p className="font-body-md text-base text-secondary mt-1">
                  Locally sourced, sustainable mineral extraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
