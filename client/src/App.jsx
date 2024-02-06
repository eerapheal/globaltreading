import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import Header from './component/Header';

export default function App() {

  return (
    <BrowserRouter>
    <Header />
     <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Project />} />
     </Routes>
        
    </BrowserRouter>
  )
}
