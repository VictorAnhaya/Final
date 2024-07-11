import React, { useState } from 'react';

const CadastroUsuario: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const usuario = { nome, email, senha };
        
        const response = await fetch('http://localhost:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar usuário.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default CadastroUsuario;