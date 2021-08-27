import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from './components/Bootstrap';
import FetchData from './components/FetchData';
import { v4 as uuid } from "uuid";
import Dashboard from "./components/Dashboard"

import Chart from './components/Chart';


function App() {
  const id = uuid();
  
  return (
    <div className="App">
     
     <Dashboard/>
    </div>
  );
}

export default App;
