import { useEffect, useState } from 'react';

function ListarIMC(){
    const [imcs, setIMCs] = useState([]);

    useEffect(() => {
        const fetchIMCs = async () => {
            const response = await fetch('/imc/listar');
            const data = await response.json();
            setIMCs(data);
        };
        fetchIMCs();
    }, []);

    return (
        <div>
     <h1>Listagem de IMC</h1>
    <table>
         <thead>
        <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>Altura</th>
        <th>Peso</th>
        <th>IMC</th>
        <th>Classificação</th>
        <th>Data de Criação</th>
  </tr>
      </thead>
        <tbody>
        {imcs.map((imc: any) => (
        <tr key={imc.id}>
        <td>{imc.id}</td>
        <td>{imc.aluno.nome}</td>
        <td>{imc.aluno.cpf}</td>
        <td>{imc.altura}</td>
        <td>{imc.peso}</td>
        <td>{imc.valorIMC}</td>
        <td>{imc.classificacao}</td>
      <td>{new Date(imc.dataCriacao).toLocaleDateString()}</td>
      </tr>
      ))}
    </tbody>
    </table>
 </div>
    );
};

