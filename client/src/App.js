import './App.css';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route } from 'react-router-dom'
import Create from './components/Create';
import Search from './components/Search';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Countrydetail from './components/CountryDetail';
import { getCountries } from './actions';
import axios from 'axios';
axios.defaults.baseURL = '/api'
//|| 'http://localhost:3001'


function App() {
  
  const dispatch = useDispatch()
  
  useEffect( () => {
    const getAll = async () => {
        await dispatch(getCountries())        
    }
    

    getAll()

},[dispatch])  
  
  
  return (
    <div className="App">
      <Navbar />
      <Routes> 
          <Route path='/' element={<Home/>} />
          <Route path='/countries' element={<Search />} />
          <Route
            exact
            path='/countries/:idPais'
            element={ <Countrydetail />}
          />

          <Route path='/create' element={<Create />} /> 
 
        </Routes>
    </div>
  );
}

export default App;
