

import Welcome from "./Pages/Welcome/Welcome"

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
      </Routes>
    </Router>
  )
}

export default App
