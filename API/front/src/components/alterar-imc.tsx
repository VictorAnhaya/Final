import React, { useState, useEffect } from 'react';

interface IMC {
    id: number;
    alunoId: number;
    altura: number;
    peso: number;
    valorIMC: number;
    classificacao: string;
}

interface Aluno {
    id: number;
    nome: string;
    cpf: string;
}

const AlterarIMC: React.FC<{ imcId: number }> = ({ imcId }) => {
    const [imc, setIMC] = useState<IMC | null>(null);
    const [altura, setAltura] = useState<number>(0);
    const [peso, setPeso] = useState<number>(0);
    const [aluno, setAluno] = useState<Aluno | null>(null);

    useEffect(() => {
        const fetchIMC = async () => {
            const response = await fetch(`http://localhost:5000/imc/${imcId}`);
            const data = await response.json();
            setIMC(data);
            setAltura(data.altura);
            setPeso(data.peso);
            const alunoResponse = await fetch(`http://localhost:5000/aluno/${data.alunoId}`);
            const alunoData = await alunoResponse.json();
            setAluno(alunoData);
        };
        fetchIMC();
    }, [imcId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedIMC = {
            id: imcId,
            alunoId: imc?.alunoId,
            altura: altura,
            peso: peso
        };

        const response = await fetch(`http://localhost:5000/imc/alterar/${imcId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedIMC)
        });

        if (response.ok) {
            alert('IMC atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar IMC.');
        }
    };

    return (
        <div>
            <h2>Alterar IMC</h2>
            {imc && aluno ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome do Aluno:</label>
                        <input type="text" value={aluno.nome} readOnly />
                    </div>
                    <div>
                        <label>Altura (m):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={altura}
                            onChange={(e) => setAltura(parseFloat(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Peso (kg):</label>
                        <input
                            type="number"
                            step="0.1"
                            value={peso}
                            onChange={(e) => setPeso(parseFloat(e.target.value))}
                        />
                    </div>
                    <button type="submit">Atualizar IMC</button>
                </form>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default AlterarIMC;
