import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./ObsidianViewer.css";
import type { ObsidianNode, ObsidianLink, ExplorerItem } from "../../Helpers/DefaultExplorer";
import {
  defaultNodes,
  defaultLinks,
  TypeColorTranslator,
  MapItemsToNode,
  MapLinks,
} from "../../Helpers/DefaultExplorer";
import { useNavigate } from "react-router-dom";
import Emphasis from "../Emphasis/Emphasis";
import axios from "axios";
import LoadingSpinner from "../Spinners/LoadingSpinner";
import { DefinedRoutes } from "../../Helpers/RouteConstants";
import { useObbyViewer } from "../../Contexts/ObbyViewerContext";


const ObsidianViewer = () => {

  const {blogItems, explorerLoading, explorerError, refreshExplorer } = useObbyViewer();

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [svgWidth, setSvgWidth] = useState<number>(500);
  const [svgHeight, setSvgHeight] = useState<number>(500);
  const [resetVar, setResetVar] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);

  // used to turn on the tools and framework links for each project
  //on hold for now. Maybe if they click on these ones that dont have dedicated page we can just display the mentions
  // of an item. I dont know how difficult that would be or if it would even be worth it
  //const [advancedView, setAdvancedview] = useState<boolean>(false);

  const navigate = useNavigate();
  //size the svg on mount
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        const height = containerRef.current.getBoundingClientRect().height;
        setSvgWidth(width);
        setSvgHeight(height);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);



  //build simulation
  useEffect(() => {
      if (explorerLoading) return; // Wait for data to load
  if (blogItems.length === 0) return; // No data, nothing to build
    const buildGraph = async () => {

      let reqnodes: ObsidianNode[] = [];
      let reqlinks: ObsidianLink[] = [];


      reqnodes = MapItemsToNode(blogItems)
      reqlinks = MapLinks(blogItems)
      
      const svgElement = svgRef.current;
      if (!svgElement) return;

      //remove all previous elements for re-render/initial render
      d3.select(svgElement).selectAll("*").remove();

      const svg = d3
        .select(svgElement)
        .attr("width", svgWidth)
        .attr("height", svgHeight);
      const g = svg.append("g");

      svg.call(
        d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
      );


      const nodes: ObsidianNode[] = defaultNodes.concat(reqnodes);

      //create links and their targets
      const links: ObsidianLink[] = defaultLinks.concat(reqlinks);

      const simulation = d3
        .forceSimulation<ObsidianNode>(nodes)
        .force(
          "link",
          d3
            .forceLink<ObsidianNode, ObsidianLink>(links)
            .id((d) => d.id)
            .distance(20)
        )
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(svgHeight / 2, svgWidth / 3));

      const link = g
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 2);

      const node = g
        .append("g")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .selectAll<SVGCircleElement, ObsidianNode>("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 10)
        .attr("fill", (d) => TypeColorTranslator(d.type))
        .on("click", HandleClickEvent)
        .on("mouseover", function () {
          d3.select(this).style("cursor", "pointer");
          d3.select(this).style("stroke", "white");
        })
        .on("mouseout", function () {
          d3.select(this).style("cursor", "default");
          d3.select(this).style("stroke", "black");
        });

      const labels = g
        .append("g")
        .selectAll<SVGTextElement, ObsidianNode>("text")
        .data(nodes)
        .join("text")
        .text((d) => d.title)
        .attr("font-size", 12)
        .attr("font-family", "Archivo Black, sans-serif")
        .attr("fill", "#dfdfdfff") // goldish
        .attr("text-anchor", "middle")
        .attr("dy", -15); // float above the node

      simulation.on("tick", () => {
        link
          .attr("x1", (d) =>
            typeof d.source === "object" && d.source.x !== undefined
              ? d.source.x
              : 0
          )
          .attr("y1", (d) =>
            typeof d.source === "object" && d.source.y !== undefined
              ? d.source.y
              : 0
          )
          .attr("x2", (d) =>
            typeof d.target === "object" && d.target.x !== undefined
              ? d.target.x
              : 0
          )
          .attr("y2", (d) =>
            typeof d.target === "object" && d.target.y !== undefined
              ? d.target.y
              : 0
          );

        node
          .attr("cx", (d) => (d.x !== undefined ? d.x : 0))
          .attr("cy", (d) => (d.y !== undefined ? d.y : 0));

        labels
          .attr("x", (d) => (d.x !== undefined ? d.x : 0))
          .attr("y", (d) => (d.y !== undefined ? d.y : 0));
      });
      node.call(
        d3
          .drag<SVGCircleElement, ObsidianNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
      function HandleClickEvent(event: any, d: ObsidianNode) {
        if (!event) return;
        if (d.link) {
          console.log("clicked on", d)
          if(d.title !== "Resume"){
          
            if(d.type === "projects"){
              console.log("is a project")
              navigate(`${d.link}?project=${d.title.replace(" ", "")}`)
            }
          navigate(d.link);
          }
          if(d.title === "Resume"){
            window.open(DefinedRoutes.Resume, "_blank")
          }
        }
      }
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>,
        d: ObsidianNode
      ) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>,
        d: ObsidianNode
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(
        event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>,
        d: ObsidianNode
      ) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    };
    buildGraph();
  }, [resetVar, closed, explorerLoading]);

  const Reset = () => {
    setResetVar((prev) => !prev);
  };
  const HandleMinimize = () => {
    setClosed((prev) => !prev);
  };

  const HandleModal = () => {
    setModal((prev) => !prev);
  };

  const RenderModal = () => {
    return (
      <div className="explorer-container">
        <h3>Node Explorer</h3>
        <p>The site explorer is a unique way to traverse my website!</p>
        <ol>
          <li>
            Each node is a page on the site that you can visit and are grouped
            together by type.
          </li>
          <li>Hold and drag to travese the environment</li>
          <li>Or click and drag on nodes to move them around</li>
          <li>
            <Emphasis>
              Click on any node to visit that part of the site!
            </Emphasis>
          </li>
        </ol>
        <p>
          Still Confused? Dont worry! You can still travel the site through the
          hamburger menu on the top right of each page!
        </p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="obsidian-container-ref">
      <div className="obsidian-menu">
        <div className="obsidian-left">
          <h2>Site Explorer</h2>
          <p onClick={() => Reset()}>Reset</p>
          <p onClick={() => HandleModal()}>About The Explorer</p>
          {explorerError ? <p>Failed to load some nodes</p> : <></>}
        </div>
        <div className="obsidian-right">
          {explorerLoading ? <LoadingSpinner /> : <></>}
          <h2 onClick={() => HandleMinimize()}>{!closed ? "Close" : "Open"}</h2>
        </div>
      </div>
      {modal ? RenderModal() : <></>}
      {!closed ? (
        <svg
          ref={svgRef}
          className="obsidian-ref"
          width={svgWidth}
          height={svgHeight}
        ></svg>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ObsidianViewer;
