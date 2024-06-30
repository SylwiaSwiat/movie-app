import Header from './components/Header';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Trendings from './components/Trendings';
import Movies from './components/Movies';
import Series from './components/Series';
import { useState } from 'react';
export const imgLink = "https://image.tmdb.org/t/p/w500"
export const apiKey = process.env.REACT_APP_API_KEY;
function App() {
  const [searchItem, setSearchItem] = useState('');
  const handleTop = ()=>{
    window.scroll(0,0);
  }
  return (
    
<div className="App">
  
<Router>
     <Header handleTop={handleTop} searchItem={searchItem} setSearchItem={setSearchItem}/>
    <Routes>
      <Route path='/' element={<Trendings searchItem={searchItem} setSearchItem={setSearchItem}/>}></Route>
      <Route path='/movies' element={<Movies searchItem={searchItem} setSearchItem={setSearchItem}/>} ></Route>
      <Route path='/series' element={<Series searchItem={searchItem} setSearchItem={setSearchItem}/>}></Route>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
