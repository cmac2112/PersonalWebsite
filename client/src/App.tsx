import Welcome from "./Pages/Welcome/Welcome"
import Chess from "./Pages/Chess/Chess";
import './App.css'
import { BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/chess" element={<Chess />} />
      </Routes>
    </Router>
  )
}

export default App
