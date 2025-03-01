import './perfil.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('perfil-body');

        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch("http://localhost:3000/customer/perfil", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar perfil");
                }

                const data = await response.json();
                console.log("Dados recebidos:", data);

                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();
    }, []);


    const deleteAccont = async ()=>{
        if (!user?.id_usuario) {
            alert("Erro ao obter informações do usuário.");
            return;
        }
        const token = localStorage.getItem('token')
        if(!token) return

        const confirmDelete = window.confirm('Tem certeza que deseja deletar a conta?')
        if(!confirmDelete) return

        try {
            const response = await fetch(`http://localhost:3000/customer/${user.id_usuario}`,{
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}` }
            })

            if(!response.ok){
                throw new Error("Falha ao deletar a conta!")
            }

            alert("Conta deletada com sucesso!")
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <header className='navbar-perfil'>
            <a href="/home"><i className='bx bx-left-arrow-alt'></i></a>
        <h1>Perfil</h1>
        </header>
            
            {user ? (
                <>
                <main>
                    <div className="container-profile">
                        <h1>Seu perfil</h1>
                        <div className="items-profile">
                    <p>Nome: {user.nome}</p>
                    <p>Email: {user.email}</p>
                    <div className="delete-accont">
                    <button className='delete' onClick={deleteAccont}>
                    <i className='bx bxs-trash'></i>
                    </button>
                    <p>Deleter conta</p>
                    </div>
                        </div>
                    
                    </div>
                </main>
                   
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    );
}
