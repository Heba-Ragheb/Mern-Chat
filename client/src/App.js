
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
       <Login/>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
