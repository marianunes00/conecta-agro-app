import Link from "next/link";
import Image from "next/image";
import ConectaAgroLogo, { TechGeometricBackground } from "@/components/ConectaAgroLogo";

export const metadata = {
  title: "Conecta Agro | Tecnologia que cultiva o amanhã",
  description:
    "Conectando pessoas, tecnologia e o campo para uma agricultura mais eficiente, sustentável e produtiva. Plataforma completa de telemetria e IA para irrigação de precisão.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#123A08] text-white selection:bg-brand-cinza selection:text-brand-institucional font-sans antialiased overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. NAVBAR INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#123A08]/90 border-b border-[#174807]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo e Nome Oficial */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-2xl bg-white p-1 shadow-md shadow-black/20 group-hover:scale-105 transition-transform">
              <Image
                src="/conecta-agro-logo.png"
                alt="Conecta Agro"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Conecta <span className="text-brand-salvia">Agro</span>
              </span>
              <span className="block text-[10px] text-brand-salvia font-semibold tracking-wider uppercase font-sans">
                Tecnologia que cultiva o amanhã
              </span>
            </div>
          </Link>

          {/* Links Centrais (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-cinza">
            <a href="#conceito" className="hover:text-white transition-colors">
              Conceito da Marca
            </a>
            <a href="#essencia" className="hover:text-white transition-colors">
              Nossa Essência
            </a>
            <a href="#ambientes" className="hover:text-white transition-colors">
              Plataformas
            </a>
            <a href="#tecnologia" className="hover:text-white transition-colors">
              Tecnologia & IA
            </a>
          </div>

          {/* Ações Rápidas de Acesso */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard-web"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#174807] hover:bg-[#1f5f09] text-white border border-[#496F3C] text-xs font-heading font-bold transition-all shadow-xs"
            >
              <span>🖥️</span> Dashboard Web
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-conecta to-[#5ba632] hover:brightness-110 text-white font-heading font-extrabold text-xs transition-all shadow-lg shadow-black/30"
            >
              <span>📱</span> Abrir App Mobile
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION COM PROPOSTA DE VALOR & SLOGAN OFICIAL                    */}
      {/* ========================================================================= */}
      <header className="relative pt-14 pb-20 sm:pt-24 sm:pb-32 overflow-hidden bg-gradient-to-b from-[#123A08] via-[#174807] to-[#123A08]">
        {/* Textura de Constelação e Nós Tecnológicos */}
        <TechGeometricBackground className="opacity-15" />

        {/* Brilhos Orgânicos de Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-conecta/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-brand-salvia/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Tagline / Badge do Manual de Marca */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-brand-salvia/40 text-brand-cinza text-xs font-semibold mb-6 animate-fade-in shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-brand-salvia animate-pulse" />
            <span className="font-heading font-bold uppercase tracking-widest text-white">
              TECNOLOGIA QUE CULTIVA O AMANHÃ
            </span>
          </div>

          {/* Título Principal Institucional */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Conectando pessoas, tecnologia e o campo para uma agricultura{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cinza via-brand-salvia to-[#99cf76]">
              mais eficiente, sustentável e produtiva
            </span>
            .
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-base sm:text-lg text-brand-cinza max-w-2xl mx-auto font-sans leading-relaxed">
            Monitoramento de solo e clima em tempo real, prescrição preditiva de irrigação FAO-56 e inteligência artificial para o máximo aproveitamento hídrico.
          </p>

          {/* CTAs Principais de Acesso */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard-web"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#174807] hover:bg-[#1f5f09] text-white border border-brand-salvia/40 font-heading font-bold text-sm shadow-xl shadow-black/30 transition-all group"
            >
              <span className="text-lg">🖥️</span>
              <div className="text-left">
                <span className="block text-[10px] text-brand-salvia font-bold uppercase tracking-wider">
                  Visão Escritório
                </span>
                <span className="text-sm font-extrabold">Acessar Dashboard Web</span>
              </div>
              <span className="text-brand-cinza group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-conecta to-[#5ba632] hover:brightness-110 text-white font-heading font-extrabold text-sm shadow-xl shadow-black/30 transition-all group"
            >
              <span className="text-lg">📱</span>
              <div className="text-left">
                <span className="block text-[10px] text-white/80 font-bold uppercase tracking-wider">
                  Visão Campo
                </span>
                <span className="text-sm font-extrabold">Abrir Aplicativo Mobile</span>
              </div>
              <span className="text-white group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Métricas de Impacto no Campo */}
          <div className="mt-14 pt-8 border-t border-[#174807] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-brand-cinza text-xs">
            <div>
              <strong className="block text-2xl font-heading font-black text-white">40%</strong>
              <span>Economia de Água</span>
            </div>
            <div>
              <strong className="block text-2xl font-heading font-black text-white">-28%</strong>
              <span>Custo de Energia</span>
            </div>
            <div>
              <strong className="block text-2xl font-heading font-black text-white">24/7</strong>
              <span>Telemetria LoRaWAN</span>
            </div>
            <div>
              <strong className="block text-2xl font-heading font-black text-white">100%</strong>
              <span>Decisões Explicáveis</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CONCEITO DA MARCA (DIRETRIZES OFICIAIS DO MANUAL)                      */}
      {/* ========================================================================= */}
      <section id="conceito" className="py-20 bg-[#0e2706] border-y border-[#174807] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-heading font-extrabold text-brand-salvia uppercase tracking-widest">
              Identidade & Propósito
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-2">
              Conceito da Marca
            </h2>
            <p className="text-sm sm:text-base text-brand-cinza mt-3">
              A união entre a inteligência de dados e o respeito aos ciclos da terra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1: Tecnologia */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 flex flex-col items-start hover:border-brand-salvia/50 transition-all shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-brand-institucional flex items-center justify-center text-white mb-4 border border-brand-conecta">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">Tecnologia</h3>
              <p className="text-xs text-brand-salvia font-medium mb-2 uppercase tracking-wide">
                Inovação a serviço do campo
              </p>
              <p className="text-xs text-brand-cinza leading-relaxed">
                Algoritmos agronômicos avançados e dispositivos IoT de alta precisão para automatizar e otimizar decisões operacionais.
              </p>
            </div>

            {/* Pilar 2: Sustentabilidade */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 flex flex-col items-start hover:border-brand-salvia/50 transition-all shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-brand-institucional flex items-center justify-center text-white mb-4 border border-brand-conecta">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C6.2 17.5 7.5 14 10 11.5c3-3 6.5-4 9-4.5.3 1.5.3 3.5-.5 6-1 3-3 5-5.5 6.5-1.2.7-2.6 1.1-4 1.5 1 1 2 1.5 3 1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">Sustentabilidade</h3>
              <p className="text-xs text-brand-salvia font-medium mb-2 uppercase tracking-wide">
                Uso inteligente dos recursos
              </p>
              <p className="text-xs text-brand-cinza leading-relaxed">
                Redução drástica do desperdício de água e energia, preservando mananciais e promovendo conformidade socioambiental.
              </p>
            </div>

            {/* Pilar 3: Conexão */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 flex flex-col items-start hover:border-brand-salvia/50 transition-all shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-brand-institucional flex items-center justify-center text-white mb-4 border border-brand-conecta">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">Conexão</h3>
              <p className="text-xs text-brand-salvia font-medium mb-2 uppercase tracking-wide">
                Pessoas, dados e soluções
              </p>
              <p className="text-xs text-brand-cinza leading-relaxed">
                Integração fluida entre o produtor na lavoura, o agrônomo no escritório e os dados em tempo real dos sensores.
              </p>
            </div>

            {/* Pilar 4: Produtividade */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 flex flex-col items-start hover:border-brand-salvia/50 transition-all shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-brand-institucional flex items-center justify-center text-white mb-4 border border-brand-conecta">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">Produtividade</h3>
              <p className="text-xs text-brand-salvia font-medium mb-2 uppercase tracking-wide">
                Mais eficiência para o produtor
              </p>
              <p className="text-xs text-brand-cinza leading-relaxed">
                Aumento da rentabilidade por hectare cultivado com dosagens precisas de lâmina de irrigação e fertirrigação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. NOSSA ESSÊNCIA (MISSÃO, VISÃO E VALORES)                                */}
      {/* ========================================================================= */}
      <section id="essencia" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado Esquerdo: Identidade Institucional */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs font-heading font-extrabold text-brand-salvia uppercase tracking-widest">
              Nossa Essência
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-2 leading-tight">
              Tecnologia com raízes no campo
            </h2>

            {/* Citação de Destaque no Estilo do Brandbook */}
            <div className="mt-6 p-6 rounded-3xl bg-brand-institucional border border-brand-conecta shadow-lg relative">
              <p className="font-heading italic text-xl text-white">
                &ldquo;Do campo para um futuro mais conectado&rdquo;
              </p>
              <p className="text-xs text-brand-salvia mt-2 font-medium">
                Conecta Agro — Inovação no campo, mais vida no futuro.
              </p>
            </div>
          </div>

          {/* Lado Direito: Cards de Missão, Visão e Valores */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Missão */}
            <div className="p-6 rounded-3xl bg-[#0e2706] border border-brand-salvia/25 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-conecta/20 text-brand-salvia flex items-center justify-center shrink-0 text-xl font-bold">
                🎯
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white mb-1">Missão</h3>
                <p className="text-xs sm:text-sm text-brand-cinza leading-relaxed">
                  Levar tecnologia acessível e inteligente ao campo, promovendo uma agricultura mais sustentável, produtiva e conectada.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="p-6 rounded-3xl bg-[#0e2706] border border-brand-salvia/25 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-conecta/20 text-brand-salvia flex items-center justify-center shrink-0 text-xl font-bold">
                👁️
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white mb-1">Visão</h3>
                <p className="text-xs sm:text-sm text-brand-cinza leading-relaxed">
                  Ser referência em soluções tecnológicas para o agronegócio, contribuindo para um futuro mais eficiente e sustentável.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="p-6 rounded-3xl bg-[#0e2706] border border-brand-salvia/25 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-conecta/20 text-brand-salvia flex items-center justify-center shrink-0 text-xl font-bold">
                💎
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white mb-1.5">Valores</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Inovação",
                    "Sustentabilidade",
                    "Confiabilidade",
                    "Compromisso com o produtor",
                    "Impacto positivo no campo",
                  ].map((val) => (
                    <span
                      key={val}
                      className="px-3 py-1 rounded-full bg-brand-institucional/60 border border-brand-salvia/30 text-[11px] font-semibold text-brand-cinza"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHOWCASE DAS DUAS PLATAFORMAS (WEB & MOBILE)                           */}
      {/* ========================================================================= */}
      <section id="ambientes" className="py-20 bg-[#0e2706] border-t border-[#174807] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-heading font-extrabold text-brand-salvia uppercase tracking-widest">
              Ecossistema Completo
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-2">
              Dois Ambientes. Uma Só Plataforma Conectada.
            </h2>
            <p className="text-sm sm:text-base text-brand-cinza mt-3">
              Desenvolvido com sofisticação visual e alta performance para computadores e dispositivos móveis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Dashboard Web Executivo */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 sm:p-8 flex flex-col justify-between hover:border-brand-salvia/50 transition-all group shadow-card">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-institucional border border-brand-conecta text-brand-salvia text-xs font-bold">
                    Desktop / Computador
                  </span>
                  <span className="text-2xl">🖥️</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Dashboard Web Executivo
                </h3>
                <p className="text-xs sm:text-sm text-brand-cinza mb-6 leading-relaxed">
                  Para gerentes agrícolas e agrônomos. Gráficos de barras de consumo vs meta de IA, balanço hídrico diário, curvas de evapotranspiração e relatórios analíticos em uma interface de alta fidelidade visual.
                </p>

                <ul className="space-y-2.5 text-xs text-brand-cinza mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Sidebar no Verde Escuro institucional da marca
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Balanço hídrico diário com identificação de picos de consumo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Histórico multi-ano com auditoria de decisões de IA
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard-web"
                className="w-full py-3.5 px-5 rounded-xl bg-brand-institucional hover:bg-[#1f5f09] text-white border border-brand-salvia/40 text-center text-xs font-heading font-extrabold transition-all"
              >
                Abrir Dashboard Web Executivo →
              </Link>
            </div>

            {/* Card 2: Aplicativo Mobile */}
            <div className="rounded-3xl bg-[#123A08] border border-brand-salvia/20 p-6 sm:p-8 flex flex-col justify-between hover:border-brand-salvia/50 transition-all group shadow-card">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-conecta/20 border border-brand-conecta text-brand-salvia text-xs font-bold">
                    Smartphone / No Campo
                  </span>
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Aplicativo Mobile de Campo
                </h3>
                <p className="text-xs sm:text-sm text-brand-cinza mb-6 leading-relaxed">
                  Interface tátil e intuitiva para quem está na lavoura. Acionamento de válvulas solenoides com temporizador, mapa georreferenciado e alertas automáticos de umidade e bateria.
                </p>

                <ul className="space-y-2.5 text-xs text-brand-cinza mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Design conforme o mockup oficial do manual de marca
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Controle de válvulas manual ou com piloto automático
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-salvia font-bold">✓</span>
                    Alertas instantâneos de anomalias no solo
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-brand-conecta to-[#5ba632] hover:brightness-110 text-white text-center text-xs font-heading font-extrabold transition-all shadow-md shadow-black/30"
              >
                Abrir Aplicativo Mobile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ASSINATURA OFICIAL E FOOTER DO MANUAL DA MARCA                         */}
      {/* ========================================================================= */}
      <footer className="py-12 border-t border-[#174807] bg-[#0c2506] text-brand-cinza text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-8">
          {/* Logo e Assinatura Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 pb-6 border-b border-[#174807]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white p-0.5 shadow-sm">
                <Image
                  src="/conecta-agro-logo.png"
                  alt="Conecta Agro Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm">Conecta Agro</p>
                <p className="text-[11px] text-brand-salvia">
                  Tecnologia que cultiva o amanhã
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/dashboard-web" className="hover:text-white transition-colors">
                Dashboard Web
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                App Mobile
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/cadastro" className="hover:text-white transition-colors">
                Cadastro
              </Link>
            </div>
          </div>

          {/* Faixa Institucional com Símbolo de Folhas */}
          <div className="flex items-center gap-3 text-center text-xs tracking-wider text-brand-salvia font-heading font-semibold uppercase">
            <span>CONECTA AGRO</span>
            <span>|</span>
            <span>INOVAÇÃO NO CAMPO, MAIS VIDA NO FUTURO.</span>
            <ConectaAgroLogo variant="symbol" size="xs" />
          </div>

          <p className="text-[11px] text-brand-medio">
            © {new Date().getFullYear()} Conecta Agro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

