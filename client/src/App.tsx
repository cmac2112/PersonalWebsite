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
import { DefinedRoutes } from "./Helpers/RouteConstants";
import NotFoundRedirect from "./Hooks/NotFoundRedirect";
import BadRoute from "./Pages/BadRoute/BadRoute";

// for project links they will need to be rerouted to /projects
function App() {
  return (
    <Router>
      <Routes>
        <Route path={DefinedRoutes.Landing} element={<Welcome />} />
        <Route path={DefinedRoutes.Home} element={<AboutMe />} />
        <Route path={DefinedRoutes.Chess} element={<Chess />} />
        <Route path={DefinedRoutes.Projects} element={<MyProjects />} />
        <Route path={DefinedRoutes.Images} element={<MyImages />} />
        <Route path={DefinedRoutes.Story} element={<MyStory />} />
        <Route path="/my-blog/:id?" element={<Blog />} />
        <Route path="/projects-and-experience/:section" element={<MyProjects />} />
        <Route path="/bad-route" element={<BadRoute />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </Router>
  )
}

export default App
