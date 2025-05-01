import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { auth, db } from "../../services/FirebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Logado com sucesso!");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("Usuário não encontrado!");
        } else if (error.code === "auth/wrong-password") {
          alert("Senha incorreta!");
        } else {
          alert("Erro ao acessar: " + error.message);
        }
      });
  }
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/"></Link>

      <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
        Dev{" "}
        <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
          Link
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <button
          type="submit"
          className=" cursor-pointer h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          Acesar
        </button>
      </form>
    </div>
  );
}
