import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './style3.css';

export default function Home() {
  // Adiciona a classe 'home-body3' ao body quando o componente for montado
  document.body.classList.add('home-body3');

  // Estado para alternar o menu hambúrguer
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionamento
  const [nome, setNome] = useState() // Tipagem do estado para aceitar string ou null

  useEffect(() => {
    // Recupera o nome do localStorage
    const storedNome = localStorage.getItem('nome');
    if (storedNome) {
      setNome(storedNome);
    }
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome'); // Remove o token e nome do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <>
      <header>
        <button className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${menuAberto ? 'rotate' : ''}`}></span>
          <span className={`bar ${menuAberto ? 'rotate' : ''}`}></span>
          <span className={`bar ${menuAberto ? 'rotate' : ''}`}></span>
        </button>
        {/* Exibe "Olá" seguido do nome ou "Visitante" caso não tenha nome */}
        <div className='nome'>Olá, {nome}!</div>
        <div className='perfil'><a href="/perfil"><i className='bx bxs-user'></i></a></div>
      </header>

      <main>
        <div className='container1'>
          <div className='cardapio'>
            <h2>Cardápio</h2>
          </div>
          <div className='outros'><h2>Outros</h2></div>
        </div>
      </main>

      <nav className={`menu ${menuAberto ? 'open' : ''}`}>
        <ul>
          <li><a href="/home"><i className='bx bx-home'></i>Início</a></li>
          <li><a href="/cardapio"><i className='bx bxs-food-menu'></i>Cardápio</a></li>
          <li><a href="contato"><i className='bx bx-phone'></i>Contato</a></li>
        </ul>
        <div className='sair'>
          <button className='logout' onClick={handleLogout}>
            <i className='bx bx-log-out'></i>
          </button>
        </div>
      </nav>
    </>
  );
}
