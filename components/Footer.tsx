export default function Footer() {
  return (
    <footer className="bg-black-soft border-t border-white/10 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl block">PoligonoApp</span>
              <span className="text-white/40 text-xs">
                Experiências de venda para corretores e incorporadoras
              </span>
            </div>
          </div>

          <div className="flex gap-8 text-white/50 text-sm">
            <a href="#recursos" className="hover:text-orange transition-colors">
              Recursos
            </a>
            <a href="#como-funciona" className="hover:text-orange transition-colors">
              Como Funciona
            </a>
            <a href="#contato" className="hover:text-orange transition-colors">
              Contato
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
          © {new Date().getFullYear()} PoligonoApp. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
