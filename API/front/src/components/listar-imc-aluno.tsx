import React from 'react';

interface Aluno {
  nome: string;
  altura: number;
  peso: number;
}

const ListaIMCAluno: React.FC<{ alunos: Aluno[] }> = ({ alunos }) => {
  return (
    <div>
      <h2>Lista de Alunos com IMC</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Altura (m)</th>
            <th>Peso (kg)</th>
            <th>IMC</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index}>
              <td>{aluno.nome}</td>
              <td>{aluno.altura}</td>
              <td>{aluno.peso}</td>
              <td>{calcIMC(aluno.altura, aluno.peso).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function calcIMC(altura: number, peso: number): number {
  return peso / (altura * altura);
}

export default ListaIMCAluno;
