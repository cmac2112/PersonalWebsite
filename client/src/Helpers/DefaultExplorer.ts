//default nodes for the site explorer
import { DefinedRoutes } from "./RouteConstants"
export interface ObsidianNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  link?: string;
}
export interface ObsidianLink extends d3.SimulationLinkDatum<ObsidianNode> {
  source: string | ObsidianNode;
  target: string | ObsidianNode;
}
export const defaultNodes: ObsidianNode[] = [
      { id: "Home", link: DefinedRoutes.Home, title: "Home" },
      { id: "Experience", link: DefinedRoutes.Projects, title: "Experience" },
      { id: "Projects", link: DefinedRoutes.Projects, title: "Projects" },
      {id: "Blog", link: DefinedRoutes.Blog, title: "Blog"},
      {id: "Astrophotography", link: DefinedRoutes.Images, title: "Astrophotography"},
      {id: "Chess", link: DefinedRoutes.Chess, title: "Chess"},
      {id: "Resume", link: DefinedRoutes.Resume, title: "Resume"},

    ];

    //create links and their targets
  export const defaultLinks: ObsidianLink[] = [
      { source: "Home", target: "Experience" },
      { source: "Home", target: "Projects" },
      { source: "Home", target: "Blog" },
      { source: "Home", target: "Astrophotography" },
      { source: "Home", target: "Chess" },
      { source: "Home", target: "Resume" },
      
    ];