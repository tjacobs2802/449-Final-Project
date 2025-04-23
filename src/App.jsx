import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing.jsx';
import User from './user.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;