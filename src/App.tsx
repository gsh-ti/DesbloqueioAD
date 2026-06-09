import './App.css'
import React from 'react';
import logo from "./assets/logo.png"

function App() {

  const [nome, setNome] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [mensagem, setMensagem] = React.useState<string | null>(null);

React.useEffect(() => {

  const params = new URLSearchParams(
    window.location.search
  );

  const tokenUrl = params.get("token");

  if (tokenUrl) {

    localStorage.setItem("token", tokenUrl);

    setToken(tokenUrl);

    window.history.replaceState(
      {},
      document.title,
      "/"
    );

  } else {

    const tokenStorage =
      localStorage.getItem("token");

    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }

}, []);

const logado = !!token;
  async function desbloquear(event: React.MouseEvent) {
    event.preventDefault();
const response = await fetch(
  "https://artists-solaris-achieving-highlighted.trycloudflare.com/desbloquearUsuario",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ nome }),
  }
);

    const data = await response.json();

    if (data.status === true) setStatus(true)

    setMensagem(data.message);
    
  }

  async function chamaMicrosoft() {
    window.location.href = "https://artists-solaris-achieving-highlighted.trycloudflare.com/auth/login";
  }

  function logout() {

  // remove JWT local
  localStorage.removeItem("token");

  // logout Microsoft + redireciona
  window.location.href =
    "https://login.microsoftonline.com/common/oauth2/v2.0/logout" +
    "?post_logout_redirect_uri=https://gsh-ti.github.io/DesbloqueioAD";
}
  

  return (
  <>
    {!logado ? (
      <>
<div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] px-4">

  <div className="
    w-full
    max-w-md
    bg-white
    border
    border-[#d9e2ec]
    rounded-3xl
    shadow-2xl
    p-8
  ">

    <div className="flex flex-col items-center mb-8">

      {/* Logo Grupo GSH */}
      <img
        src={logo}
        alt="Grupo GSH"
        className="w-44 mb-8 object-contain"
      />

      {/* Ícone Microsoft */}
      <div className="
        w-16
        h-16
        rounded-2xl
        bg-[#e8f1fb]
        flex
        items-center
        justify-center
        mb-5
        border
        border-[#c7dff7]
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 16 16"
        >
          <path fill="#F25022" d="M7.462 0H0v7.19h7.462z"/>
          <path fill="#7FBA00" d="M16 0H8.538v7.19H16z"/>
          <path fill="#00A4EF" d="M7.462 8.211H0V16h7.462z"/>
          <path fill="#FFB900" d="M16 8.211H8.538V16H16z"/>
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#003b71]">
        Bem-vindo
      </h1>

      <p className="
        text-[#5b7083]
        text-sm
        mt-3
        text-center
        leading-relaxed
      ">
        Faça login utilizando sua conta Microsoft
      </p>

    </div>

    <button
      onClick={chamaMicrosoft}
      className="
        w-full
        bg-[#0070c9]
        hover:bg-[#005fa8]
        transition-all
        duration-200
        text-white
        font-semibold
        rounded-2xl
        px-4
        py-3.5
        flex
        items-center
        justify-center
        gap-3
        cursor-pointer
        shadow-lg
        shadow-blue-200
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 16"
      >
        <path fill="#F25022" d="M7.462 0H0v7.19h7.462z"/>
        <path fill="#7FBA00" d="M16 0H8.538v7.19H16z"/>
        <path fill="#00A4EF" d="M7.462 8.211H0V16h7.462z"/>
        <path fill="#FFB900" d="M16 8.211H8.538V16H16z"/>
      </svg>

      <span>Entrar com Microsoft</span>
    </button>

    <div className="mt-8 text-center">
      <p className="text-xs text-[#7f95a8]">
        Grupo GSH • Plataforma de desbloqueio VPN
      </p>
    </div>

  </div>

</div>
      </>
    ) : (
      <>
        {!status ? (
          <>
<div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">

  <div className="
    w-full
    max-w-md
    bg-white
    border
    border-[#d9e2ec]
    rounded-3xl
    shadow-2xl
    p-8
  ">

    <div className="flex flex-col items-center mb-8">

      {/* Logo */}
      <img
        src={logo}
        alt="Grupo GSH"
        className="w-44 mb-8 object-contain"
      />

      {/* Ícone */}
      <div className="
        w-16
        h-16
        rounded-2xl
        bg-[#e8f1fb]
        border
        border-[#c7dff7]
        flex
        items-center
        justify-center
        mb-5
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-[#0070c9]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 10-8 0v4m-2 0h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#003b71]">
        Desbloqueio de Conta
      </h1>

      <p className="
        text-[#5b7083]
        text-sm
        mt-3
        text-center
        leading-relaxed
      ">
        Informe o usuário da VPN para desbloquear o acesso
      </p>

    </div>

    <form className="flex flex-col gap-5">

      <div className="flex flex-col gap-2">

        <label className="text-sm font-medium text-[#003b71]">
          Nome de usuário da VPN
        </label>

        <input
          type="text"
          placeholder="Digite o usuário"
          onChange={(event: any) =>
            setNome(event.target.value)
          }
          className="
            bg-white
            border
            border-[#cfd8e3]
            rounded-2xl
            px-4
            py-3
            text-[#003b71]
            placeholder:text-[#8fa3b8]
            outline-none
            focus:border-[#0070c9]
            focus:ring-4
            focus:ring-[#0070c9]/10
            transition-all
          "
        />

      </div>

      <button
        type="submit"
        onClick={desbloquear}
        className="
          bg-[#0070c9]
          hover:bg-[#005fa8]
          transition-all
          duration-200
          rounded-2xl
          py-3.5
          font-semibold
          text-white
          cursor-pointer
          shadow-lg
          shadow-blue-200
        "
      >
        Desbloquear
      </button>

      {
        mensagem != "Usuário desbloqueado" &&
        mensagem != null && (
          <div className="
            bg-red-50
            border
            border-red-200
            rounded-2xl
            p-4
            text-sm
            text-red-600
            text-center
            font-medium
          ">
            {mensagem}
          </div>
        )
      }

    </form>

    <button
      onClick={logout}
      className="
        mt-5
        w-full
        flex
        items-center
        justify-center
        gap-2
        bg-white
        hover:bg-red-50
        border
        border-red-200
        hover:border-red-300
        text-red-500
        hover:text-red-600
        px-5
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-200
        cursor-pointer
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
        />
      </svg>

      <span>Sair da conta</span>
    </button>

    <div className="mt-8 text-center">
      <p className="text-xs text-[#7f95a8]">
        Grupo GSH • Plataforma de desbloqueio VPN
      </p>
    </div>

  </div>

</div>
          </>
        ) : (
          <>
          <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

              <div className="flex flex-col items-center text-center">

                <div className="
                  w-20
                  h-20
                  rounded-full
                  bg-green-500/10
                  border
                  border-green-500/20
                  flex
                  items-center
                  justify-center
                  mb-6
                ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold text-white mb-3">
                  Usuário desbloqueado
                </h2>

                <p className="text-zinc-400 text-sm mb-8">
                  A conta VPN foi desbloqueada com sucesso.
                </p>

                <button
                  onClick={() => setStatus(false)}
                  className="
                    w-full
                    bg-green-600
                    hover:bg-green-500
                    transition-all
                    duration-200
                    rounded-xl
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-green-500/20
                    cursor-pointer
                  "
                >
                  Voltar ao início
                </button>

              </div>

            </div>

          </div>
          </>
        )}
      </>
    )}
  </>
);
}

export default App
