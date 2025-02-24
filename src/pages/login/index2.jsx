    import { useNavigate } from 'react-router-dom';
    import { useState } from 'react'; 
    import './style2.css'

    export default function Login() {
        document.body.classList.add('home-body2');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            senha,
            }),
        });

        if (!response.ok) {
            throw new Error('Falha ao fazer login!');
        }

        const data = await response.json();
        // Armazene o token no localStorage
        if (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('nome', data.nome);
            console.log(data)
            // Navega para a página do dashboard
            navigate('/home');
        }

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
        setError('Erro ao fazer login, tente novamente!');
        }
    };

    return (
        <div className="container-login">
             <div className='container2-login'>
        <h1>QUE LEGAL JÁ TEM UMA CONTA!</h1>
        <img src="/src/assets/logo2.jpg" alt="" />
      </div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
            <p>
            Não tem uma conta? <a href="/">Cadastre-se</a>
            </p>
        </form>
        </div>
    );
    }
