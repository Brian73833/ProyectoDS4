import React from "react";
import { useAuth } from "../context/AuthContext";
import { ICON_STYLE } from "../lib/utils";

const IMG_HOME_CATALOG = "/src/assets/auth-hero.png";
const IMG_HOME_TERRA = "/src/assets/auth-hero.png";

interface StatItemProps {
  label: string;
  value: string;
  last?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, last = false }) => (
  <div className={`py-6 ${!last ? "border-b md:border-b-0" : ""} border-slate-200`}>
    <p className="font-label-caps text-xs text-stone-500 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="font-headline-md text-2xl font-semibold">{value}</p>
  </div>
);

const Home: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name || "Usuario";


  return (
    <main className="min-h-screen bg-background text-on-background font-body-md flex flex-col">
      <div className="flex-grow">
        <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20 bg-stone-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto">
            <p className="font-label-caps text-xs text-[#E2725B] mb-3 uppercase tracking-widest font-bold">
              CLIENT PORTAL
            </p>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-on-surface mb-4 sm:mb-6">
              Bienvenido, {userName}
            </h2>
            <p className="font-body-lg text-base sm:text-xl text-stone-500 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
              Access your personalized architectural resource hub. Track your
              ongoing projects, browse technical specifications, and manage your
              inventory with precision.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <button
                className="bg-[#E2725B] text-white px-8 sm:px-12 py-3 font-label-caps text-xs uppercase tracking-widest active:translate-y-0.5 transition-transform font-bold cursor-pointer hover:bg-[#c95d47]"
              >
                Catalog Access
              </button>
              <button
                className="border-2 border-stone-800 text-stone-800 px-8 sm:px-12 py-3 font-label-caps text-xs uppercase tracking-widest hover:bg-stone-800 hover:text-white transition-all active:translate-y-0.5 font-bold cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-label-caps text-xs text-stone-500 mb-8 sm:mb-12 uppercase tracking-widest font-bold">
              QUICK NAVIGATION
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-stone-100 border border-slate-300 border-b-[4px] border-b-stone-800 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] md:min-h-[400px] relative overflow-hidden group">
                <img
                  alt="Premium terracotta bricks"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  src={IMG_HOME_CATALOG}
                />
                <div className="relative z-10">
                  <span
                    className="material-symbols-outlined text-4xl text-[#E2725B] mb-2 block"
                    style={ICON_STYLE}
                  >
                    grid_view
                  </span>
                  <h4 className="font-headline-lg text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">
                    Product Catalog
                  </h4>
                  <p className="font-body-md text-base text-stone-500 mt-3 max-w-md">
                    Explore over 400 unique ceramic finishes and dimensions
                    tailored for modern structural requirements.
                  </p>
                </div>
                <div
                  className="relative z-10 font-label-caps text-xs text-[#E2725B] flex items-center gap-2 uppercase tracking-widest mt-6 md:mt-0 font-bold"
                >
                  VIEW COLLECTION
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 bg-stone-50 border border-slate-300 border-b-[4px] border-b-stone-600 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <span
                    className="material-symbols-outlined text-4xl text-stone-600 mb-2 block"
                    style={ICON_STYLE}
                  >
                    mail
                  </span>
                  <h4 className="font-headline-md text-xl sm:text-2xl font-bold text-stone-800">
                    Expert Consultation
                  </h4>
                  <p className="font-body-md text-base text-stone-500 mt-3">
                    Schedule a technical review with our ceramic engineers for
                    your current project.
                  </p>
                </div>
                <button
                  className="bg-stone-800 text-white py-3 font-label-caps text-xs uppercase tracking-widest active:translate-y-0.5 transition-transform w-full mt-8 sm:mt-12 font-bold cursor-pointer hover:bg-stone-900"
                >
                  Request Call
                </button>
              </div>

              <div className="md:col-span-4 bg-stone-100 border border-slate-300 border-b-[4px] border-b-slate-500 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <span
                    className="material-symbols-outlined text-4xl text-stone-500 mb-2 block"
                    style={ICON_STYLE}
                  >
                    history
                  </span>
                  <h4 className="font-headline-md text-xl sm:text-2xl font-bold text-stone-800">
                    Recent Specs
                  </h4>
                  <p className="font-body-md text-base text-stone-500 mt-3">
                    Quick access to your most viewed technical data sheets and CAD
                    files.
                  </p>
                </div>
                <span className="font-label-caps text-xs text-stone-500 mt-8 sm:mt-12 uppercase tracking-widest font-bold">
                  OPEN PROFILE
                </span>
              </div>

              <div className="md:col-span-8 bg-stone-900 text-stone-100 p-6 sm:p-10 md:p-12 border-b-[4px] border-b-orange-850">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  <div className="flex-1">
                    <h4 className="font-headline-lg text-xl sm:text-2xl md:text-3xl font-extrabold mb-3">
                      Featured: Terra Mater
                    </h4>
                    <p className="font-body-md text-base text-stone-400 mb-6">
                      Our new high-fire collection inspired by raw geological
                      formations. Limited availability for Q3 projects.
                    </p>
                    <button
                      className="bg-orange-800 text-white px-6 py-3 font-label-caps text-xs uppercase tracking-widest active:translate-y-0.5 transition-transform font-bold cursor-pointer hover:bg-orange-900"
                    >
                      Explore Series
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square overflow-hidden bg-stone-800 flex-shrink-0">
                    <img
                      alt="Raw clay texture"
                      className="w-full h-full object-cover"
                      src={IMG_HOME_TERRA}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20 bg-stone-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
              <div>
                <p className="font-label-caps text-xs text-[#E2725B] uppercase tracking-widest mb-1 font-bold">
                  MANUFACTURING STANDARDS
                </p>
                <h3 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Active Inventory Stats
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-slate-300">
              <StatItem label="KILN TEMPERATURE" value="1,250°C" />
              <StatItem label="COMPRESSION STRENGTH" value="55 N/mm²" />
              <StatItem label="AVAILABLE SKU'S" value="1,420" />
              <StatItem label="LEAD TIME" value="12 Wks" last />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
