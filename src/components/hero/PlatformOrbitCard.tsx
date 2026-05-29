import { Billboard, Html } from "@react-three/drei";
import type { PlatformToken } from "../../data/platformTokens";
import { PlatformGlyph } from "./PlatformGlyph";
import { classNames } from "../../lib/classNames";

type PlatformOrbitCardProps = {
  token: PlatformToken;
  scale: number;
  opacity: number;
};

export function PlatformOrbitCard({ token, scale, opacity }: PlatformOrbitCardProps) {
  return (
    <Billboard follow lockX={false} lockY={false} lockZ={false}>
      <Html
        transform
        occlude={false}
        distanceFactor={6}
        style={{
          transform: `scale(${scale})`,
          opacity,
          pointerEvents: "none",
          transition: "opacity 0.15s ease-out",
        }}
        zIndexRange={[0, 100]}
      >
        <div
          className={classNames(
            "flex min-w-[7.2rem] items-center gap-2 rounded-2xl border border-white/20 bg-black/55 p-2 pr-3 text-white shadow-[0_22px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl",
          )}
          aria-hidden="true"
        >
          <span
            className={classNames(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-inner",
              token.tone,
            )}
          >
            <PlatformGlyph name={token.name} />
          </span>
          <span className="text-[0.72rem] font-extrabold leading-tight tracking-tight">{token.name}</span>
        </div>
      </Html>
    </Billboard>
  );
}
