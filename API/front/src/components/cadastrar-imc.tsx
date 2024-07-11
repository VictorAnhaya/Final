import React, { useState, useEffect } from 'react';

const CadastrarIMC = () => {
    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');

    useEffect(() => {
        const fetchAlunos = async () => {
            const response = await fetch('/aluno/listar');
            const data = await response.json();
            setAlunos(data);
        };
        fetchAlunos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/imc/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alunoId, altura, peso }),
        });
        if (response.ok) {
            alert('IMC cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar IMC');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
                <option value="">Selecione um aluno</option>
                {alunos.map((aluno: any) => (
                    <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                ))}
            </select>
            <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Altura (m)" />
            <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Peso (kg)" />
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default CadastrarIMC;
