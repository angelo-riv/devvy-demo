import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProblemInfo from './pages/ProblemInfo';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Navbar/>
        <ProblemInfo/>
      </div>
    </div>
  );
}

export default App;
