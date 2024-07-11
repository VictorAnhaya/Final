import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CadastrarAluno from './components/cadastrar-aluno';
import CadastrarIMC from './components/cadastrar-imc';

function App(){
  return(

      <div>
        <div>
        <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/cadastrar-aluno">Cadastrar Aluno</Link>
            </li>
            <li>
              <Link to="/cadastrar-imc">Cadastrar IMC</Link>
            </li>
            <li>
              <Link to="/listar-imcs">Listar IMCs</Link>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path="/" element={<CadastrarAluno />} />
            <Route
              path="/cadastrar-aluno"
              element={<CadastrarAluno/>}
            />
            <Route
              path="/cadastrar-imc"
              element={< CadastrarIMC/>}
            />
            </Routes>
          <footer>
          </footer>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
