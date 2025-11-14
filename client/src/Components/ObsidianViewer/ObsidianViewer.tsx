import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Button from "../Button/Button";
import "./ObsidianViewer.css"
interface ObsidianNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
}

interface ObsidianLink extends d3.SimulationLinkDatum<ObsidianNode> {
  source: string | ObsidianNode;
  target: string | ObsidianNode;
}
const ObsidianViewer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [svgWidth, setSvgWidth] = useState<number>(500);
  const [svgHeight, setSvgHeight] = useState<number>(500);
  const [resetVar, setResetVar] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
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
      d3
        .zoom<SVGSVGElement, unknown>()
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
          console.log(`trying to run transform on ${event.transform}`);
        })
    );

    // Create test nodes for now

    //need to extend the class in typscript to support type saftey

    const nodes: ObsidianNode[] = [
      { id: "master", title: "master node" },
      { id: "test", title: "test node" },
      { id: "test2", title: "test2 node" },
    ];

    //create links and their targets
    const links: ObsidianLink[] = [
      { source: "test", target: "master" },
      { source: "test2", target: "master" },
      {source: "test", target: "test2"}
    ];

    const simulation = d3
      .forceSimulation<ObsidianNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<ObsidianNode, ObsidianLink>(links)
          .id((d) => d.id)
          .distance(20)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(250, 250));

    const link = g
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 4);

    const node = g
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("fill", "red")
      .selectAll<SVGCircleElement, ObsidianNode>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10);

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
    });
    node.call(
      d3
        .drag<SVGCircleElement, ObsidianNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>, d: ObsidianNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>, d: ObsidianNode) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event: d3.D3DragEvent<SVGCircleElement, ObsidianNode, unknown>, d: ObsidianNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return () => {
      simulation.stop();
    };
  }, [svgWidth, svgHeight, resetVar, closed]);


  const Reset = () => {
    setResetVar(prev => !prev)
  }
  const HandleMinimize = () => {
    setClosed(prev => !prev)
  }

  const HandleModal = () => {
    setModal(prev => !prev)
  }
  

  const RenderModal = () => {
    return (
      <div className="explorer-container">
          <h3>Node Explorer</h3>
          <p>The site explorer is a unique way to traverse my website!</p>
          <ol>
          <li>Each node is a page on the site that you can visit and are grouped together by type.</li>
          <li>Hold and drag to travese the environment</li>
          <li>Click on any node to go to that page of the site</li>
          </ol>
          <p>Still Confused? Dont worry! You can still travel the site through the hamburger menu on the top right of each page!</p>
          
      </div>
    )
  }

  return (
    <div ref={containerRef} className="obsidian-container-ref">
      <div className="obsidian-menu">
        
        <div className="obsidian-left">
        <h2>Site Explorer</h2>
        <p onClick={() => Reset()}>Reset</p>
        <p onClick={() => HandleModal()}>About The Explorer</p>
        </div>
        <div className="obsidian-right">
          <h2 onClick={() => HandleMinimize()}>
            {!closed ?
            "Close" : "Open" }</h2>
        </div>
      </div>
      {modal ?
        RenderModal()
      : <></>}
      {!closed ?
      <svg
        ref={svgRef}
        className="obsidian-ref"
        width={svgWidth}
        height={svgHeight}
      ></svg>
      : <></>}
    </div>
  );
};

export default ObsidianViewer;
