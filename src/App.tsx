import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Message from './pages/messages';
import Generatedpage from './pages/generatedpage';
import Signup from './pages/signup';
import Tryfor from './pages/tryforfree';
import Login from './pages/login';

function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-purple-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generated-page" element={<Generatedpage />} />
          <Route path='/messages' element={<Message/>} />
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/try' element={<Tryfor/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;