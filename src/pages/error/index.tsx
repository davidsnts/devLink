import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex w-full justify-center text-white items-center flex-col min-h-screen">
      <h1 className="font-bold text-6xl mb-4">404</h1>
      <h1 className="font-bold text-4xl mb-4">Página não encontrada</h1>
      <p className="italic text-1xl mb-4 ">
        Você caiu em uma página que não existe!
      </p>
      <Link className="bg-gray-50/20 py-1 px-4 rounded-md mb-3" to="/"> Voltar para a Home</Link>
      <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/login">Ou vá para login</Link>
    </div>
  );
}
