//default nodes for the site explorer
import explorerItems from "./DefaultExplorerItems.json"

export interface ExplorerItem{
  id: string;
  link: string;
  title: string;
  type: string;
  LinksTo: string[];
}
const items: ExplorerItem[] = explorerItems;

export interface ObsidianNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  type: string;
  link?: string;
}
export interface ObsidianLink extends d3.SimulationLinkDatum<ObsidianNode> {
  source: string | ObsidianNode;
  target: string | ObsidianNode;
}

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
    master: "red",
    projects: "blue",
    blog: "green",
    chess: "yellow",
    experience: "gold",
    images: "purple",
    resume: "maroon"
  };

  return map[type] ?? "gray"; // default fallback
};

