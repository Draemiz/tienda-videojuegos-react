import './TablaVideojuegos.css';
import { useState } from 'react';
import {
  Gamepad2, Menu, X, Home, MonitorPlay,
  Calendar, Activity, Trophy,
  ChevronRight, ShoppingCart, Sparkles
} from 'lucide-react';

const colorPorId = {
  1: "from-emerald-500 to-teal-700",
  2: "from-green-500 to-emerald-800",
  3: "from-yellow-500 to-orange-700",
  4: "from-slate-500 to-slate-900",
  5: "from-amber-600 to-orange-900",
};

export default function TablaVideojuegos({ videojuegos }) {
  const [activeView, setActiveView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeGame = videojuegos.find(g => g.id === activeView);

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-200 font-sans overflow-hidden">

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-[#111827] border-r border-slate-800/50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-cyan-400">
            <div className="p-2 bg-cyan-400/10 rounded-xl">
              <Gamepad2 size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white">
                Gamer<span className="text-cyan-400">Store</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Biblioteca Premium</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Principal</p>

          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'home'
                ? 'bg-cyan-500/10 text-cyan-400 font-medium'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <Home size={20} /> Inicio
          </button>

          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Mis Videojuegos</p>

          {videojuegos.map((juego) => (
            <button
              key={juego.id}
              onClick={() => handleNavClick(juego.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                activeView === juego.id
                  ? 'bg-slate-800 border border-slate-700/50'
                  : 'hover:bg-slate-800/30 border border-transparent'
              }`}
            >
              <img
                src={juego.imagen}
                alt={juego.titulo}
                className="w-10 h-10 rounded-lg object-cover border border-slate-700/50"
              />
              <span className={`text-sm text-left line-clamp-2 leading-tight ${
                activeView === juego.id ? 'text-white font-medium' : 'text-slate-400'
              }`}>
                {juego.titulo}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header móvil */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800/50 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-cyan-400">
            <Gamepad2 size={24} />
            <h1 className="font-bold text-lg text-white">GamerStore</h1>
          </div>
          <button className="p-2 text-slate-300 bg-slate-800 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">

          {/* VISTA INICIO */}
          {activeView === 'home' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
                  Tienda de Videojuegos
                  <Sparkles className="text-cyan-400" size={28} />
                </h2>
                <p className="text-slate-400">
                  {videojuegos.length} juegos en tu biblioteca
                </p>
              </div>

              <div className="bg-[#111827]/80 rounded-3xl border border-slate-800/50 overflow-hidden shadow-2xl">
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-4">Juego</div>
                  <div className="col-span-2">Género / Plataforma</div>
                  <div className="col-span-2">Precio</div>
                  <div className="col-span-2">Estado</div>
                  <div className="col-span-2">Progreso</div>
                </div>

                <div className="divide-y divide-slate-800/50">
                  {videojuegos.map((juego) => (
                    <div
                      key={juego.id}
                      onClick={() => handleNavClick(juego.id)}
                      className="group flex flex-col md:grid md:grid-cols-12 gap-4 p-4 md:p-6 items-center hover:bg-slate-800/30 transition-colors cursor-pointer"
                    >
                      <div className="col-span-4 flex items-center gap-4 w-full">
                        <img src={juego.imagen} alt={juego.titulo} className="w-16 h-16 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
                        <div>
                          <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors line-clamp-1">{juego.titulo}</h3>
                          <p className="text-sm text-slate-500">{juego.lanzamiento}</p>
                        </div>
                      </div>

                      <div className="col-span-2 w-full md:w-auto flex justify-between md:block text-sm">
                        <span className="md:hidden text-slate-500">Info:</span>
                        <div>
                          <p className="text-slate-300">{juego.genero}</p>
                          <p className="text-slate-500 text-xs">{juego.plataforma}</p>
                        </div>
                      </div>

                      <div className="col-span-2 w-full md:w-auto flex justify-between md:block font-medium">
                        <span className="md:hidden text-slate-500">Precio:</span>
                        <span className="text-white">${juego.precio}</span>
                      </div>

                      <div className="col-span-2 w-full md:w-auto flex justify-between md:block">
                        <span className="md:hidden text-slate-500">Estado:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          juego.disponible
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {juego.disponible ? 'ONLINE' : 'AGOTADO'}
                        </span>
                      </div>

                      <div className="col-span-2 w-full flex items-center gap-3">
                        <span className="md:hidden text-slate-500 text-sm">Progreso:</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${Math.round(juego.progreso * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-300 w-8">
                          {Math.round(juego.progreso * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VISTA DETALLE */}
          {activeGame && (
            <div className="max-w-6xl mx-auto space-y-6">

              {/* Breadcrumb */}
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <span className="bg-slate-800 p-1 rounded-md"><Home size={14} /></span>
                Inicio <ChevronRight size={14} />
                <span className="text-cyan-400">{activeGame.titulo}</span>
              </button>

              {/* Banner */}
              <div className={`relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${colorPorId[activeGame.id]} p-8 flex flex-col justify-end`}>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${activeGame.imagen})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white mb-3 border border-white/20">
                      {activeGame.genero}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                      {activeGame.titulo}
                    </h2>
                  </div>
                  <div className="bg-[#111827]/80 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl flex flex-col items-center min-w-[160px]">
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Precio Actual</span>
                    <span className="text-3xl font-bold text-white">${activeGame.precio}</span>
                    <button className="mt-3 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <ShoppingCart size={16} /> Comprar
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards de detalle */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#111827] border border-slate-800/60 p-6 rounded-2xl flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <MonitorPlay size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Plataforma</p>
                    <p className="text-lg font-semibold text-white">{activeGame.plataforma}</p>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/60 p-6 rounded-2xl flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Año de Lanzamiento</p>
                    <p className="text-lg font-semibold text-white">{activeGame.lanzamiento}</p>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/60 p-6 rounded-2xl flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                      activeGame.disponible
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {activeGame.disponible ? 'ONLINE' : 'AGOTADO'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between gap-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Trophy size={20} />
                    </div>
                    <span className="text-2xl font-bold text-white">{Math.round(activeGame.progreso * 100)}%</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Progreso del Juego</p>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${Math.round(activeGame.progreso * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* TRAILER + DESCRIPCION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#111827] border border-slate-800/60 rounded-2xl overflow-hidden">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider px-5 pt-5 mb-3">
                    🎬 Trailer Oficial
                  </p>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={activeGame.trailer}
                      title={`Trailer de ${activeGame.titulo}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center gap-4">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    📖 Descripción
                  </p>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {activeGame.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold">
                      {activeGame.genero}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
                      {activeGame.plataforma}
                    </span>
                    <span className="px-3 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full text-xs font-bold">
                      {activeGame.lanzamiento}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}