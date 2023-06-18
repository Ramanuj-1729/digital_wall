import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Posts from './pages/Posts/Posts';

//Components
import Navbar from './components/shared/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/posts/:id' element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
