import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

interface ObsidianNode extends d3.SimulationNodeDatum{
    id: string;
    title: string;
}

interface ObsidianLink extends d3.SimulationLinkDatum<ObsidianNode>{
    source: string | ObsidianNode;
    target: string | ObsidianNode;

}
const ObsidianViewer = () => {

    const containerRef = useRef<SVGSVGElement>(null);

    //build simulation
    useEffect(() => {
        const svgElement = containerRef.current;
        if (!svgElement) return;

        const svg = d3.select(svgElement)
            .attr("width", 500)
            .attr("height", 500);

        const g = svg.append("g");

        svg.call(
            d3.zoom<SVGSVGElement, unknown>().on("zoom", function(event) {
                g.attr("transform", event.transform);
            })
        );


        // Create test nodes for now

        //need to extend the class in typscript to support type saftey

        const nodes: ObsidianNode[] = [
           { id: "master", title: "master node" },
      { id: "test", title: "test node" },
      { id: "test2", title: "test2 node" }
        ];

        //create links and their targets
        const links: ObsidianLink[] = [
            { source: "test", target: "master" },
            { source: "test2", target: "master" }
        ];

        const simulation = d3.forceSimulation<ObsidianNode>(nodes)
        .force("link", d3.forceLink<ObsidianNode, ObsidianLink>(links).id((d) => d.id).distance(20))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(250, 250))

        const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", 4);
            
          const node = svg.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .selectAll<SVGCircleElement, ObsidianNode>("circle")
          .data(nodes)
          .join("circle")
          .attr("r",10)

         simulation.on("tick", () => {
  link
    .attr("x1", (d) => typeof d.source === "object" && d.source.x !== undefined ? d.source.x : 0)
    .attr("y1", (d) => typeof d.source === "object" && d.source.y !== undefined ? d.source.y : 0)
    .attr("x2", (d) => typeof d.target === "object" && d.target.x !== undefined ? d.target.x : 0)
    .attr("y2", (d) => typeof d.target === "object" && d.target.y !== undefined ? d.target.y : 0);

  node
    .attr("cx", (d) => d.x !== undefined ? d.x : 0)
    .attr("cy", (d) => d.y !== undefined ? d.y : 0)
    .on("mouseover", (event: any, d) => {
            console.log(d);
          })
          //.on("mouseout", () => {
          //  d3.select(tooltipRef.current).style("opacity", 0);
         // })
          .call(
            d3
              .drag<SVGCircleElement, ObsidianNode>()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended)
          );
});

    interface DragEvent {
        active: boolean;
        x: number;
        y: number;
    }

    function dragstarted(event: DragEvent, d: ObsidianNode) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event: DragEvent, d: ObsidianNode){
        d.fx = event.x;
        d.fy = event.y;

    }
    function dragended(event: DragEvent, d: ObsidianNode){
        if(!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    }, []);

  return (
    <svg ref={containerRef} className='obsidian-ref'>
    </svg>
  )
}

export default ObsidianViewer
