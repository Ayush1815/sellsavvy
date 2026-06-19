import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const Link = ({ href, children, className, ...props }: { href: string; children: React.ReactNode; className?: string; [key: string]: any }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

interface ShaderProps {
  source: string;
  uniforms: {
    [key: string]: {
      value: number[] | number[][] | number;
      type: string;
    };
  };
  maxFps?: number;
}

interface SignInPageProps {
  className?: string;
  onSuccess?: () => void;
}
      
export const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false, 
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
  reverse?: boolean; 
}) => {
  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            ${reverse ? 'u_reverse_active' : 'false'}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "", 
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
      u_reverse: {
        value: shader.includes("u_reverse_active") ? 1 : 0, 
        type: "uniform1i", 
      },
    };
  }, [colors, opacities, totalSize, dotSize, shader]); 

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse; 

        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 3.0; // slightly modulated
            float show_offset = random(st2); 
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5; 
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);


            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }


            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a; 
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};


const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  uniforms: any;
  maxFps?: number;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();

    const material: any = ref.current.material;
    const timeLocation = material.uniforms.u_time;
    if (timeLocation) {
      timeLocation.value = timestamp;
    }
  });

  const getUniforms = () => {
    const preparedUniforms: any = {};

    for (const uniformName in uniforms) {
      const uniform: any = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value };
          break;
        case "uniform1i":
          preparedUniforms[uniformName] = { value: uniform.value };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map((v: number[]) =>
              new THREE.Vector3().fromArray(v)
            ),
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
          };
          break;
        default:
          preparedUniforms[uniformName] = { value: uniform.value };
          break;
      }
    }

    preparedUniforms["u_time"] = { value: 0 };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    }; 
    return preparedUniforms;
  };

  const material = useMemo(() => {
    const materialObject = new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        gl_Position = vec4(position, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    return materialObject;
  }, [size.width, size.height, source]);

  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas className="absolute inset-0 h-full w-full">
        <ShaderMaterial source={source} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-400';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-xs';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass} font-mono tracking-wider uppercase`}>
      <div className="flex flex-col transition-transform duration-350 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<any>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <span className="absolute w-1.5 h-1.5 rounded-full bg-purple-500 top-0 left-1/2 transform -translate-x-1/2 opacity-80 animate-pulse"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-pink-500 left-0 top-1/2 transform -translate-y-1/2 opacity-80 animate-pulse"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500 right-0 top-1/2 transform -translate-y-1/2 opacity-80 animate-pulse"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-amber-500 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80 animate-pulse"></span>
    </div>
  );

  const navLinksData = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Platform', href: '#platform' },
    { label: 'Growth Audit', href: '#auditFormSection' },
  ];

  return (
    <header className={cn(`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       px-6 py-2.5 backdrop-blur-md
                       ${headerShapeClass}
                       border border-purple-500/10 bg-slate-950/40
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-200 ease-in-out`)}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-10">
        <div className="flex items-center">
           {logoElement}
           <span className="ml-2 font-mono text-xs font-bold text-white tracking-widest uppercase">SELLSAVVY</span>
        </div>

        <nav className="hidden sm:flex items-center space-x-5 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[300px] opacity-100 pt-3' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-3 text-xs font-mono w-full pb-2">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-350 hover:text-white transition-colors w-full text-center uppercase tracking-wider py-1" onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export const SignInPage = ({ className, onSuccess }: SignInPageProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("code");
    }
  };

  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 300);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 5) {
        codeInputRefs.current[index + 1]?.focus();
      }
      
      if (index === 5 && value) {
        const isComplete = newCode.every(digit => digit.length === 1);
        if (isComplete) {
          setReverseCanvasVisible(true);
          
          setTimeout(() => {
            setInitialCanvasVisible(false);
          }, 50);
          
          setTimeout(() => {
            setStep("success");
            if (onSuccess) {
              setTimeout(() => {
                onSuccess();
              }, 1200);
            }
          }, 1800);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackClick = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
    setReverseCanvasVisible(false);
    setInitialCanvasVisible(true);
  };

  return (
    <div className={cn("flex w-full flex-col min-h-screen bg-[#070114] relative text-white rounded-3xl overflow-hidden", className)}>
      <div className="absolute inset-0 z-0">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={1.5}
              containerClassName="bg-black/90"
              colors={[
                [168, 85, 247],
                [236, 72, 153],
              ]}
              dotSize={4}
              reverse={false}
            />
          </div>
        )}
        
        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={2}
              containerClassName="bg-black/90"
              colors={[
                [79, 70, 229],
                [16, 185, 129],
              ]}
              dotSize={4}
              reverse={true}
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(7,1,20,0.85)_0%,_rgba(7,1,20,1)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#070114] to-transparent pointer-events-none" />
      </div>
      
      <div className="relative z-10 flex flex-col flex-1 pb-12">
        <MiniNavbar />

        <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-8 pt-32">
          <div className="w-full max-w-sm bg-slate-950/60 border border-white/[0.05] backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {step === "email" ? (
                <motion.div 
                  key="email-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center"
                >
                  <div className="space-y-2">
                    <span className="inline-flex px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono tracking-widest uppercase rounded-full">Explore Sovereign growth console</span>
                    <h1 className="text-2xl font-bold tracking-tight font-display text-white">Access SellSavvy</h1>
                    <p className="text-xs text-slate-400 font-light">Enter email to sign in or register your account</p>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <button className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-2.5 px-4 text-xs font-semibold font-mono tracking-wider transition-colors">
                      <span className="text-sm font-sans font-black bg-clip-text text-transparent bg-gradient-to-r from-red-450 via-yellow-450 to-green-450">G</span>
                      <span>CONTINUE WITH GOOGLE</span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-px bg-white/5 flex-1" />
                      <span className="text-white/30 text-[9px] font-mono tracking-widest uppercase">OR EMAIL</span>
                      <div className="h-px bg-white/5 flex-1" />
                    </div>
                    
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="sellsavvyservices@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs backdrop-blur-md bg-[#020108]/60 text-white border border-white/10 rounded-full py-3 px-5 focus:outline-none focus:border-purple-500/40 text-center font-mono placeholder-white/20"
                          required
                        />
                        <button 
                          type="submit"
                          className="absolute right-1.5 top-1.5 text-white w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 transition-colors group overflow-hidden"
                        >
                          <span className="relative w-full h-full block overflow-hidden">
                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                              →
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                              →
                            </span>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 leading-normal">
                    By signing up or accessing, you agree to SellSavvy’s <Link href="#" className="underline hover:text-slate-400">MSA</Link>, <Link href="#" className="underline hover:text-slate-400">Product Terms</Link>, and <Link href="#" className="underline hover:text-slate-400">Privacy Policy</Link>.
                  </p>
                </motion.div>
              ) : step === "code" ? (
                <motion.div 
                  key="code-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center"
                >
                  <div className="space-y-2">
                    <span className="inline-flex px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded-full">Awaiting replication trigger</span>
                    <h1 className="text-2xl font-bold tracking-tight font-display text-white">We sent you a code</h1>
                    <p className="text-xs text-slate-400 font-light">Please enter the 6-digit confirmation key</p>
                  </div>
                  
                  <div className="w-full py-2">
                    <div className="relative rounded-full py-3 px-4 border border-white/10 bg-slate-950/40">
                      <div className="flex items-center justify-center gap-1.5">
                        {code.map((digit, i) => (
                          <div key={i} className="flex items-center">
                            <div className="relative">
                              <input
                                ref={(el) => {
                                  codeInputRefs.current[i] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleCodeChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                className="w-6 text-center text-md bg-transparent text-white border-none focus:outline-none focus:ring-0 appearance-none font-mono"
                                style={{ caretColor: 'transparent' }}
                              />
                              {!digit && (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                  <span className="text-md text-white/10 font-mono">0</span>
                                </div>
                              )}
                            </div>
                            {i < 5 && <span className="text-white/10 text-md font-mono select-none">|</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      className="text-xs text-purple-400 hover:text-purple-350 transition-colors font-mono uppercase tracking-wider"
                      onClick={() => setCode(["", "", "", "", "", ""])}
                    >
                      Resend authorization code
                    </button>
                  </div>
                  
                  <div className="flex w-full gap-3">
                    <button 
                      onClick={handleBackClick}
                      className="rounded-full bg-white/10 border border-white/10 text-white text-xs font-semibold font-mono tracking-wider px-6 py-2.5 hover:bg-white/15 transition-all w-[35%] uppercase"
                    >
                      Back
                    </button>
                    <button 
                      className={cn(
                        "flex-1 rounded-full text-xs font-semibold font-mono tracking-wider py-2.5 border transition-all uppercase duration-300",
                        code.every(d => d !== "") 
                        ? "bg-purple-600 border-transparent text-white hover:bg-purple-500 cursor-pointer" 
                        : "bg-white/5 text-white/30 border-white/5 cursor-not-allowed"
                      )}
                      disabled={!code.every(d => d !== "")}
                    >
                      VERIFY
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight font-display text-white">Tunnel Auth Verified</h1>
                    <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Connecting live feed...</p>
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="py-4"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <p className="text-xs text-slate-450 leading-relaxed max-w-[240px] mx-auto font-light">
                    Sovereign replicating nodes matched. Entering growth workspace.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
