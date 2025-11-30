import React, { createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import type { ExplorerItem, SidebarLink } from "../Helpers/DefaultExplorer";


interface ObbyViewerContextType {
    blogItems: ExplorerItem[];
    explorerLoading: boolean;
    sidebarLoading: boolean;
    refreshExplorer: () => void;
    refreshSidebar: () => void;
    explorerError: boolean;
    sidebarError: boolean;
    sidebarLinks: SidebarLink[];
}

const ObbyViewerContext = createContext<ObbyViewerContextType>({
    blogItems: [],
    explorerLoading: false,
    sidebarLoading: false,
    refreshExplorer: () => {},
    refreshSidebar: () => {},
    explorerError: false,
    sidebarError: false,
    sidebarLinks: [],
});

export const useObbyViewer = () => useContext(ObbyViewerContext);


let blogCache: ExplorerItem[] = [];
let sidebarCache: SidebarLink[] = [];

export const ObbyViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogItems, setBlogItems] = useState<ExplorerItem[]>([]);
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>([]);
  const [explorerLoading, setExplorerLoading] = useState<boolean>(false);

  const [sidebarLoading, setSidebarLoading] = useState<boolean>(false);
  const [sidebarError, setsidebarError] = useState<boolean>(false)
    
  const [explorerError, setExploererError] = useState<boolean>(false);


  const fetchGraphBlogs = async () => {
    if(blogItems.length > 0){
        setBlogItems(blogCache)
        console.log("using cached blogs", blogCache)
        return blogCache
    } 
    setExplorerLoading(true);
    setExploererError(false)
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_DEV}/api/blogs`);
      if (response.status === 200) {
        const items: ExplorerItem[] = response.data.blogs.map((item: any) => ({
          Id: item.id,
          link: `/my-blog/${item.id}`,
          title: item.topic,
          type: "blog",
          LinksTo:
            item.links && item.links.trim() !== ""
              ? JSON.parse(item.links)
              : [],
        }));
        setBlogItems(items);
        blogCache = items;
        setExploererError(false)
        console.log("items from provider", items)
      }
    } catch (err) {
      setBlogItems([]);
      setExploererError(true)
    } finally {
      setExplorerLoading(false);
    }
  };

  const fetchSidebarLogs = async () => {
    if(sidebarLinks.length > 0){
        console.log("using cached sidebarLinks", sidebarLinks)
         return sidebarLinks;
    }
    setSidebarLoading(true);
    setsidebarError(false)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_DEV}/api/blogs`
      );
      //console.log(response)
      if (response.status === 200) {
        const formatted: SidebarLink[] = response.data.blogs.map(
          (item: any) => ({
            Id: item.id,
            Topic: item.topic,
            Date: item.date,
          })
        );

        setSidebarLinks(formatted);
        setsidebarError(false);
      }
    } catch (err) {
      setsidebarError(true);
    } finally {
      setSidebarLoading(false);
    }
  }

  useEffect(() => {
    fetchGraphBlogs();
    fetchSidebarLogs();
  }, [])

  return (
    <ObbyViewerContext.Provider value={{ blogItems, explorerLoading, refreshExplorer: fetchGraphBlogs, refreshSidebar: fetchSidebarLogs, explorerError, sidebarError, sidebarLoading, sidebarLinks  }}>
      {children}
    </ObbyViewerContext.Provider>
  );
};