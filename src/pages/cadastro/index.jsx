import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

import './style1.css';

function Cadastro() {
  document.body.classList.add('home-body1');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Defina o navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados a serem enviados para o backend
    const userData = { nome, email, senha };

    try {
      const response = await fetch('http://localhost:3000/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); // Navegação para a página de login
      } else {
        console.error('Erro ao cadastrar:', data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="container-cadastro">
      <div className='container2-cadastro'>
        <h1>BEM-VINDO A CASINHA DOS SALGADOS!</h1>
        <img src="/src/assets/logo2.jpg" alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <input 
          type="text" 
          placeholder="Digite seu nome" 
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Digite seu e-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Digite sua senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <a href="/login">Login</a> {/* Ajustado para usar a navegação correta */}
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
