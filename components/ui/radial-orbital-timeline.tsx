import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  orbitAngle?: number;
  theme?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  orbitAngle: controlledOrbitAngle,
  theme = "dark",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (controlledOrbitAngle !== undefined) {
      setRotationAngle(controlledOrbitAngle * (180 / Math.PI));
      return;
    }

    let rotationTimer: any;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode, controlledOrbitAngle]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return theme === "dark" 
          ? "text-white bg-black border-white" 
          : "text-white bg-[#CD7F32] border-[#CD7F32]";
      case "in-progress":
        return theme === "dark" 
          ? "text-black bg-white border-black" 
          : "text-white bg-[#1C1E24] border-[#1C1E24]";
      case "pending":
      default:
        return theme === "dark" 
          ? "text-white bg-black/40 border-white/50" 
          : "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden relative rounded-3xl transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-[#FAF8F3]"
      }`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center min-h-[480px]">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central orb */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10 shadow-lg shadow-purple-500/20">
            <div className={`absolute w-20 h-20 rounded-full border animate-ping opacity-70 ${
              theme === "dark" ? "border-white/20" : "border-purple-300/40"
            }`}></div>
            <div
              className={`absolute w-24 h-24 rounded-full border animate-ping opacity-50 ${
                theme === "dark" ? "border-white/10" : "border-purple-200/20"
              }`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`w-8 h-8 rounded-full backdrop-blur-md ${
              theme === "dark" ? "bg-white/80" : "bg-white/95"
            }`}></div>
          </div>

          {/* Dotted target track */}
          <div className={`absolute w-96 h-96 rounded-full border ${
            theme === "dark" ? "border-white/10" : "border-[#E5E2D9]"
          }`}></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon as any;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Aura rings */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: theme === "dark" 
                      ? "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)"
                      : "radial-gradient(circle, rgba(205,127,50,0.15) 0%, rgba(205,127,50,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Main Node bubble */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? theme === "dark" ? "bg-white text-black" : "bg-[#CD7F32] text-white"
                      : isRelated
                      ? theme === "dark" ? "bg-white/50 text-black" : "bg-[#FAF8F3] text-[#CD7F32]"
                      : theme === "dark" ? "bg-black text-white" : "bg-white text-slate-800"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? theme === "dark" ? "border-white shadow-lg shadow-white/30" : "border-[#CD7F32] shadow-lg shadow-amber-500/20"
                      : isRelated
                      ? theme === "dark" ? "border-white animate-pulse" : "border-[#CD7F32] animate-pulse"
                      : theme === "dark" ? "border-white/40" : "border-[#E5E2D9]"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                {/* Title overlay */}
                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] sm:text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${
                    isExpanded
                      ? theme === "dark" ? "text-white scale-110" : "text-[#1C1E24] scale-110 font-bold"
                      : theme === "dark" ? "text-white/70" : "text-[#474D5F]"
                  }
                `}
                >
                  {item.title}
                </div>

                {/* Brief detailed descriptor panel */}
                {isExpanded && (
                  <Card className={`absolute top-20 left-1/2 -translate-x-1/2 w-64 backdrop-blur-lg overflow-visible z-[250] border shadow-2xl transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-black/95 border-white/30 shadow-white/10 text-white" 
                      : "bg-white border-[#E5E2D9] shadow-slate-200/80 text-[#1C1E24]"
                  }`}>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 ${
                      theme === "dark" ? "bg-white/50" : "bg-slate-300"
                    }`}></div>
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0.5 text-[9px] ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className={`text-[10px] font-mono ${
                          theme === "dark" ? "text-white/50" : "text-slate-400"
                        }`}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className={`text-xs mt-2 font-bold uppercase tracking-wider ${
                        theme === "dark" ? "text-white" : "text-[#1C1E24]"
                      }`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-[11px] p-4 pt-0 leading-relaxed ${
                      theme === "dark" ? "text-white/80" : "text-[#474D5F]"
                    }`}>
                      <p>{item.content}</p>

                      <div className={`mt-4 pt-3 border-t ${
                        theme === "dark" ? "border-white/10" : "border-slate-100"
                      }`}>
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className={`flex items-center ${
                            theme === "dark" ? "text-white/70" : "text-slate-500"
                          }`}>
                            <Zap size={10} className="mr-1 text-[#CD7F32]" />
                            Energy Level
                          </span>
                          <span className={theme === "dark" ? "text-white" : "text-slate-800 font-bold"}>
                            {item.energy}%
                          </span>
                        </div>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${
                          theme === "dark" ? "bg-white/10" : "bg-slate-100"
                        }`}>
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className={`mt-4 pt-3 border-t ${
                          theme === "dark" ? "border-white/10" : "border-slate-100"
                        }`}>
                          <div className="flex items-center mb-2">
                            <Link size={10} className={`mr-1 ${
                              theme === "dark" ? "text-white/70" : "text-slate-500"
                            }`} />
                            <h4 className={`text-[10px] uppercase tracking-wider font-medium ${
                              theme === "dark" ? "text-white/70" : "text-slate-500"
                            }`}>
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2 py-0 text-[10px] rounded-md transition-all ${
                                    theme === "dark"
                                      ? "border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-sm"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={`ml-1 ${
                                      theme === "dark" ? "text-white/60" : "text-slate-400"
                                    }`}
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
