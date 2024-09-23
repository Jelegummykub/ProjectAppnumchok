import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Num from './components/calnumchok';
import Home from './components/home';
function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/เลขนำโชค" element={<Num />} />
            </Routes>
        </Router>
  )
}
export default App