import Image from "next/image";

const LOGO_SRC = "/imagens/logo-branca.png";

export default function Footer() {
  return (
    <footer className="bg-black-soft border-t border-white/10 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <Image
              src={LOGO_SRC}
              alt="polígono tech — Apresentação de Empreendimentos"
              width={1536}
              height={1024}
              className="h-24 md:h-28 lg:h-32 w-auto max-w-full object-contain"
            />
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
          © {new Date().getFullYear()} polígono tech. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
