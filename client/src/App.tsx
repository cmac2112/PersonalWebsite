import Welcome from "./Pages/Welcome/Welcome"
import Chess from "./Pages/Chess/Chess";
import './App.css'
import { BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MyImages from "./Pages/MyImages/MyImages";
import MyStory from "./Pages/MyStory/MyStory";
import Blog from "./Pages/Blog/Blog";
import MyProjects from "./Pages/MyProjects/MyProjects";
import AboutMe from "./Pages/AboutMe/AboutMe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/my-images" element={<MyImages />} />
        <Route path="/my-story" element={<MyStory />} />
        <Route path="/my-blog/:id?" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
