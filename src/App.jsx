import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing.jsx';
import User from './user.jsx';
import NutriScan from './NutritionalScan.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<User />} />
        <Route path="/log_food" element={<NutriScan />} />
      </Routes>
    </Router>
  );
}

export default App;