import { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import Image from "next/image";
import { WarnIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
  const { login, signUp, googleLogin } = useAuth();

  const [error, setError] = useState(null);
  const [mode, setMode] = useState<"login" | "signUp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (e) {
      showError(e?.message ?? "Erro desconhecido");
    }
  };

  const showError = (message, timeInSeconds = 5) => {
    setError(message);
    setTimeout(() => setError(null), timeInSeconds * 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 h-full relative lg:w-2/3">
        <Image
          src={"https://source.unsplash.com/random"}
          alt="Imagem da tela de autenticação"
          layout="fill"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1
          className={`
        text-3xl font-bold mb-5
      `}
        >
          {mode === "login"
            ? "Entre com a sua conta"
            : "Cadastre-se na plataforma"}
        </h1>

        {error && (
          <div
            className={`
            bg-red-400 text-white py-3 px-5 my-2 border border-red-700 flex
            items-center rounded-lg
          `}
          >
            {WarnIcon()}
            <span className="ml-3">{error}</span>
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChangeValue={setEmail}
          required
        />
        <AuthInput
          label="Senha"
          type="password"
          value={password}
          onChangeValue={setPassword}
          required
        />
        <button
          onClick={submit}
          className={`
        w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg px-4 py-3 mt-6
      `}
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={googleLogin}
          className={`
        w-full bg-red-500 hover:bg-red-400
        text-white rounded-lg px-4 py-3
      `}
        >
          Entrar com o Google
        </button>

        {mode === "login" ? (
          <p className="mt-8">
            Novo por aqui?{" "}
            <a
              onClick={() => setMode("signUp")}
              className={`
              text-blue-500
              hover:text-blue-700
              font-semibold
              cursor-pointer
            `}
            >
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?{" "}
            <a
              onClick={() => setMode("login")}
              className={`
              text-blue-500
              hover:text-blue-700
              font-semibold
              cursor-pointer
            `}
            >
              Entre com as suas credentiais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
