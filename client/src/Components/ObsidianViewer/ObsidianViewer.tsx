import { useLayoutEffect, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { ObsidianNode, ObsidianLink } from "../../Helpers/DefaultExplorer";
import {
  TypeColorTranslator,
  CompiledNodes,
  CompiledMapLinks,
} from "../../Helpers/DefaultExplorer";
import { useNavigate } from "react-router-dom";
import Emphasis from "../Emphasis/Emphasis";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { DefinedRoutes } from "../../Helpers/RouteConstants";

const LEGEND_ITEMS: { type: string; label: string }[] = [
  { type: "master", label: "Home" },
  { type: "experience", label: "Experience" },
  { type: "projects", label: "Projects" },
  { type: "blog", label: "Blog" },
  { type: "chess", label: "Chess" },
  { type: "images", label: "Astrophotography" },
  { type: "resume", label: "Resume" },
];

const TIPS: { icon: string; text: string }[] = [
  { icon: "category", text: "Every node is a page on this site, grouped and linked by topic" },
  { icon: "pan_tool", text: "Drag empty space to pan around the canvas" },
  { icon: "drag_indicator", text: "Drag a node to pin it wherever you like" },
  { icon: "touch_app", text: "Click a node to open that page" },
];

const nodeRadius = (d: ObsidianNode) => (d.type === "master" ? 13 : 9);

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const ToolbarButton = ({ icon, label, onClick, active = false }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={active}
    title={label}
    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition-all duration-300
      ${active
        ? "border-[#ffcf0d]/50 bg-[#ffcf0d]/15 text-[#ffcf0d]"
        : "border-white/10 bg-white/5 text-white/70 hover:border-[#ffcf0d]/40 hover:bg-[#ffcf0d]/10 hover:text-[#ffcf0d]"
      }`}
  >
    <MaterialIcon name={icon} className="text-lg leading-none" />
  </button>
);

const ObsidianViewer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [resetVar, setResetVar] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(false);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const svgElement = svgRef.current;
    const container = containerRef.current;
    if (!svgElement || !container) return;

    const { width, height } = container.getBoundingClientRect();

    d3.select(svgElement).selectAll("*").remove();

    const svg = d3.select(svgElement).attr("width", width).attr("height", height);
    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 4])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoom);
    zoomRef.current = zoom;

    const nodes: ObsidianNode[] = CompiledNodes;
    const links: ObsidianLink[] = CompiledMapLinks;

    const simulation = d3
      .forceSimulation<ObsidianNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<ObsidianNode, ObsidianLink>(links)
          .id((d) => d.id)
          .distance(70)
      )
      .force("charge", d3.forceManyBody().strength(-220))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(28))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    const link = g
      .append("g")
      .attr("stroke", "rgba(255,255,255,0.18)")
      .attr("stroke-width", 1.5)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = g
      .append("g")
      .selectAll<SVGCircleElement, ObsidianNode>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => TypeColorTranslator(d.type))
      .attr("stroke", "rgba(0,0,0,0.45)")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("click", handleClickEvent)
      .on("mouseover", function (_event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", nodeRadius(d) + 3)
          .attr("stroke", "#ffcf0d")
          .attr("stroke-width", 2);
      })
      .on("mouseout", function (_event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", nodeRadius(d))
          .attr("stroke", "rgba(0,0,0,0.45)")
          .attr("stroke-width", 1.5);
      });

    node.append("title").text((d) => d.title);

    const labels = g
      .append("g")
      .selectAll<SVGTextElement, ObsidianNode>("text")
      .data(nodes)
      .join("text")
      .text((d) => d.title)
      .attr("font-size", 11)
      .attr("font-family", "Archivo Black, sans-serif")
      .attr("fill", "rgba(255,255,255,0.65)")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .style("user-select", "none")
      .attr("dy", -16);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
        .attr("y1", (d) => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
        .attr("x2", (d) => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
        .attr("y2", (d) => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);

      labels.attr("x", (d) => d.x ?? 0).attr("y", (d) => d.y ?? 0);
    });

    node.call(
      d3
        .drag<SVGCircleElement, ObsidianNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function handleClickEvent(_event: unknown, d: ObsidianNode) {
      if (!d.link) return;
      if (d.title === "Resume") {
        window.open(DefinedRoutes.Resume, "_blank");
        return;
      }
      if (d.type === "projects") {
        navigate(`${d.link}?project=${d.title.replace(" ", "")}`);
        return;
      }
      navigate(d.link);
    }

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
  }, [resetVar]);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current || !svgRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      d3.select(svgRef.current).attr("width", width).attr("height", height);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReset = () => setResetVar((prev) => !prev);
  const handleToggleCollapse = () => setClosed((prev) => !prev);
  const handleToggleInfo = () => setInfo((prev) => !prev);

  const handleZoomBy = (factor: number) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, factor);
  };

  const handleZoomReset = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(350).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffcf0d]/10 text-[#ffcf0d]">
            <MaterialIcon name="hub" className="text-xl leading-none" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-white sm:text-lg">Site Explorer</h2>
            <p className="hidden text-xs text-white/50 sm:block">Drag, zoom, and click any node to explore</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ToolbarButton icon="restart_alt" label="Reset layout" onClick={handleReset} />
          <ToolbarButton icon="info" label="About this explorer" onClick={handleToggleInfo} active={info} />
          <ToolbarButton
            icon={closed ? "expand_more" : "expand_less"}
            label={closed ? "Expand explorer" : "Collapse explorer"}
            onClick={handleToggleCollapse}
          />
        </div>
      </div>

      {/* Info panel */}
      {info && (
        <div className="animate-fade-in border-b border-white/10 bg-[#ffcf0d]/[0.04] px-4 py-4 sm:px-6">
          <h3 className="text-sm font-semibold text-white">What is this?</h3>
          <p className="mt-1 text-sm text-white/70">
            A live, interactive map of this site &mdash; every dot is a page.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div key={tip.text} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
                <MaterialIcon name={tip.icon} className="mt-0.5 text-base text-[#ffcf0d]" />
                <p className="text-xs text-white/70">{tip.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">
            Still confused? <Emphasis>No worries</Emphasis> &mdash; the hamburger menu in the top right gets you everywhere too.
          </p>
        </div>
      )}

      {/* Legend */}
      {!closed && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-white/10 px-4 py-2.5 text-xs text-white/55 sm:px-6">
          {LEGEND_ITEMS.map((item) => (
            <span key={item.type} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: TypeColorTranslator(item.type) }}
              />
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Graph */}
      <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${closed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="relative h-[26rem] w-full overflow-hidden sm:h-[32rem]"
            style={{
              backgroundColor: "#08090b",
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          >
            <svg ref={svgRef} className="block h-full w-full cursor-grab touch-none select-none active:cursor-grabbing" />

            <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
              <ToolbarButton icon="add" label="Zoom in" onClick={() => handleZoomBy(1.4)} />
              <ToolbarButton icon="remove" label="Zoom out" onClick={() => handleZoomBy(1 / 1.4)} />
              <ToolbarButton icon="center_focus_strong" label="Reset view" onClick={handleZoomReset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObsidianViewer;
