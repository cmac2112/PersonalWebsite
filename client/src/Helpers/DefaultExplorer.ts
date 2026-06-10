//default nodes for the site explorer
import explorerItems from "./DefaultExplorerItems.json"
import builtBlogs from "../../parsedBlog.json"

export interface SidebarLink{
Id: string;
  Topic: string; // string displayed in li
  Date: string;
}


export interface ExplorerItem{
  id: string;
  link: string;
  title: string;
  date?: string;
  type: string;
  html?: string;
  LinksTo: string[];
}

export interface BlogContent {
  Id: string;
  Text: string;
  Links: string[];
  Topic: string;
  date: string;
}


//object that defines the node in the viewer,
// the node should be clickable like a link
export interface ObsidianNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  type: string;
  link?: string;
}


// object that defines a link between nodes in the viewer
export interface ObsidianLink extends d3.SimulationLinkDatum<ObsidianNode> {
  source: string | ObsidianNode;
  target: string | ObsidianNode;
}

//default hardcoded items from DefaultExplorerItems.json
const items: ExplorerItem[] = explorerItems;

//items compiled together from md files 
const compiledBlogs: ExplorerItem[] = builtBlogs.map((item: any) => ({
  id: String(item.Id),
  link: item.link,
  title: item.title,
  date: item.date,
  type: "blog",
  html: item.html,
  LinksTo: item.LinksTo
}));

export const MapItemsToNode = (items: ExplorerItem[]): ObsidianNode[] => {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    type: item.type,
    link: item.link,
  }));
}
export const MapLinks = (items: ExplorerItem[]): ObsidianLink[] => {
  return items.filter(item => item.LinksTo && item.LinksTo.length > 0)
.flatMap(item => item.LinksTo.map(targetId => ({
  source: item.id,
  target: targetId
})));
}

export const defaultNodes: ObsidianNode[] = items.map(item => ({
  id: item.id,
  title: item.title,
  type: item.type,
  link: item.link,
}));

export const defaultLinks: ObsidianLink[] = items.filter(item => item.LinksTo && item.LinksTo.length > 0)
.flatMap(item => item.LinksTo.map(targetId => ({
  source: item.id,
  target: targetId
})));

export const TypeColorTranslator = (type: string): string => {
  const map: Record<string, string> = {
    master: "#ffcf0d",
    experience: "#38bdf8",
    projects: "#a78bfa",
    blog: "#34d399",
    chess: "#fb923c",
    images: "#f472b6",
    resume: "#f87171",
  };

  return map[type] ?? "#9ca3af"; // default fallback
};

export const CompiledNodes: ObsidianNode[] = compiledBlogs.map(item => ({
  id: item.id,
  title: item.title,
  type: item.type,
  link: item.link
})).concat(defaultNodes.map(item => ({
  ...item,
  link: item.link ?? ""
})))

export const CompiledSidebarLinks: SidebarLink[] = compiledBlogs.map(item => ({
  Id: item.id,
  Topic: item.title,
  Date: item.date ?? ""
}))

export const CompiledMapLinks: ObsidianLink[] = MapLinks(compiledBlogs).concat(MapLinks(items))

export const GetBlogContentById = (id?: string): BlogContent | undefined => {
  let item;
  if(!id){
    //just return latest item
    item = compiledBlogs.pop();
    //console.log(item);  
  }else{
    item = compiledBlogs.find(item => item.id === id);
  }
  if(!item) return undefined;
  return {
    Id: item.id,
    Text: item.html ?? "",
    Links: item.LinksTo ?? [],
    Topic: item.title,
    date: item.date ?? "",
  }
}
