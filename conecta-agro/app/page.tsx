import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Conecta Agro | Inteligência Hídrica & Agricultura de Precisão",
  description:
    "Plataforma completa de IoT e Inteligência Artificial para irrigação de precisão, economia de água e energia e monitoramento em tempo real.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. NAVBAR INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo e Nome */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-2xl bg-white p-1 shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
              <Image
                src="/conecta-agro-logo.png"
                alt="Conecta Agro"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Conecta <span className="text-emerald-400">Agro</span>
              </span>
              <span className="block text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                Inteligência Hídrica
              </span>
            </div>
          </Link>

          {/* Links Centrais (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#tecnologia" className="hover:text-emerald-400 transition-colors">
              Tecnologia & IA
            </a>
            <a href="#beneficios" className="hover:text-emerald-400 transition-colors">
              Benefícios
            </a>
            <a href="#ambientes" className="hover:text-emerald-400 transition-colors">
              Plataformas
            </a>
            <a href="#esg" className="hover:text-emerald-400 transition-colors">
              Impacto ESG
            </a>
          </div>

          {/* Ações Rápidas de Acesso */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard-web"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-bold transition-all shadow-xs"
            >
              <span>🖥️</span> Dashboard Web
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              <span>📱</span> Abrir App Mobile
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION COM PROPOSTA DE VALOR & CALL TO ACTIONS                   */}
      {/* ========================================================================= */}
      <header className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Glows de Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Metodologia FAO-56 & Telemetria LoRaWAN 24/7
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            A Inteligência que a sua lavoura precisa para{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              economizar água e produzir mais
            </span>
            .
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Monitoramento de solo e clima em tempo real, detecção preditiva de vazamentos e prescrição precisa de irrigação através de algoritmos agronômicos avançados.
          </p>

          {/* CTAs Principais de Acesso */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard-web"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#16233b] hover:bg-[#1f3152] text-white border border-slate-700/80 font-bold text-sm shadow-xl shadow-slate-950/50 hover:border-amber-400/50 transition-all group"
            >
              <span className="text-lg">🖥️</span>
              <div className="text-left">
                <span className="block text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Visão Escritório
                </span>
                <span className="text-sm font-extrabold">Acessar Dashboard Web</span>
              </div>
              <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all group"
            >
              <span className="text-lg">📱</span>
              <div className="text-left">
                <span className="block text-xs text-emerald-950/70 font-bold uppercase tracking-wider">
                  Visão Campo
                </span>
                <span className="text-sm font-extrabold">Abrir Aplicativo Mobile</span>
              </div>
              <span className="text-slate-950 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Prova Social / Selos */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-slate-400 text-xs">
            <div>
              <strong className="block text-2xl font-black text-white">40%</strong>
              <span>Economia de Água</span>
            </div>
            <div>
              <strong className="block text-2xl font-black text-white">-28%</strong>
              <span>Custo Energético</span>
            </div>
            <div>
              <strong className="block text-2xl font-black text-white">9</strong>
              <span>Culturas Suportadas</span>
            </div>
            <div>
              <strong className="block text-2xl font-black text-white">100%</strong>
              <span>Autônomo & Solar</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. SHOWCASE DOS DOIS AMBIENTES (WEB & MOBILE)                              */}
      {/* ========================================================================= */}
      <section id="ambientes" className="py-16 bg-slate-900/60 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
              Experiência Integrada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Dois Ambientes. Uma Só Plataforma Conectada.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              O Conecta Agro foi projetado tanto para a tomada de decisão estratégica no escritório quanto para a agilidade de operação no campo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Dashboard Web Executivo */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    Desktop / Computador
                  </span>
                  <span className="text-2xl">🖥️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Dashboard Web Executivo
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  Ideal para gerentes agrícolas, agrônomos e gestores de fazenda. Gráficos de barras duplas de consumo vs meta, medidor donut de capacidade de campo, curvas de evapotranspiração, calendário mensal de irrigações e exportação de relatórios analíticos.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Layout widescreen com sidebar e indicadores em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Balanço hídrico diário com identificação de picos de consumo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Histórico multi-ano com auditoria de decisões de IA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Calendário de manejos e fertirrigação integrado
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard-web"
                className="w-full py-3.5 px-5 rounded-xl bg-[#16233b] hover:bg-[#1f3152] text-white border border-slate-700/80 text-center text-xs font-extrabold transition-all group-hover:border-amber-400"
              >
                Abrir Dashboard Web Executivo →
              </Link>
            </div>

            {/* Card 2: Aplicativo Mobile */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    Smartphone / No Campo
                  </span>
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Aplicativo Mobile de Campo
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  Desenhado com interface tátil e otimizada para quem está na lavoura. Acionamento de válvulas solenoides com temporizador, leitura instantânea dos sensores, mapas georreferenciados dos talhões e notificações imediatas de alertas.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Interface mobile-first com 10 telas especializadas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Controle de válvulas manual ou no piloto automático
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Mapa de satélite com status visual de cada estação
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Alertas instantâneos de queda de umidade e bateria
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-center text-xs font-extrabold transition-all shadow-md shadow-emerald-500/20"
              >
                Abrir Aplicativo Mobile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PILARES TECNOLÓGICOS DO CONECTA AGRO                                   */}
      {/* ========================================================================= */}
      <section id="tecnologia" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
            Pilares da Solução
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Tecnologia de Ponta Aplicada à sua Lavoura
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            O Conecta Agro une a ciência agronômica da FAO à engenharia de software moderna para garantir resultados mensuráveis safra após safra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: IA FAO-56 */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-4">
              🧠
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              IA Agronômica Explicável
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Algoritmos baseados na metodologia FAO-56 que calculam a Evapotranspiração de Referência ($ET_0$) e a demanda real da cultura ($ET_c$) considerando tipo de solo, umidade atual e fase fenológica.
            </p>
          </div>

          {/* Card 2: Detecção de Anomalias */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Detecção Inteligente de Falhas
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Algoritmo de machine learning que identifica vazamentos de canos (vazão com válvula fechada), sondas encrostadas ou travadas e variações anômalas não físicas no solo antes que causem prejuízos.
            </p>
          </div>

          {/* Card 3: Hardware LoRaWAN & Solar */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-2xl mb-4">
              📡
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Conectividade LoRaWAN & Solar
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Estações meteorológicas e de solo 100% autônomas. Alcance de até 15 km sem cabos ou necessidade de chip de celular em cada ponto, enviando dados via telemetria segura para a nuvem.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IMPACTO ESG E SUSTENTABILIDADE                                         */}
      {/* ========================================================================= */}
      <section id="esg" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/30 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Compromisso Sustentável
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                Irrigar com precisão é proteger o futuro dos recursos hídricos.
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                Cada gota economizada pelo algoritmo Conecta Agro reduz o custo de bombeamento elétrico na fazenda e preserva os mananciais subterrâneos e superficiais, tornando a sua propriedade um exemplo de conformidade ESG.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard-web"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md"
                >
                  Conhecer o Dashboard Web
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
                >
                  Entrar na Plataforma
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <footer className="py-12 border-t border-slate-800/80 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl bg-white p-0.5">
              <Image
                src="/conecta-agro-logo.png"
                alt="Conecta Agro Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Conecta Agro</p>
              <p className="text-[11px] text-slate-400">
                Tecnologia Brasileira para o Agronegócio Sustentável
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard-web" className="hover:text-emerald-400 transition-colors">
              Dashboard Web
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
              App Mobile
            </Link>
            <Link href="/login" className="hover:text-emerald-400 transition-colors">
              Login
            </Link>
            <Link href="/cadastro" className="hover:text-emerald-400 transition-colors">
              Cadastro
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Conecta Agro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
