import { lazy, Suspense } from "react";
import { useMod } from "@/lib/useMod";
import ModSelector from "@/components/ModSelector";

const SpacecraftMod = lazy(() => import("@/mods/spacecraft"));
const ChronographMod = lazy(() => import("@/mods/chronograph"));
const DataCubeMod = lazy(() => import("@/mods/datacube"));

function ActiveMod({ mod }: { mod: string }) {
  if (mod === "spacecraft") return <SpacecraftMod />;
  if (mod === "chronograph") return <ChronographMod />;
  return <DataCubeMod />;
}

export default function App() {
  const mod = useMod();

  return (
    <>
      <ModSelector />
      <Suspense fallback={<div className="fixed inset-0 bg-[#050510]" />}>
        <ActiveMod mod={mod} />
      </Suspense>
    </>
  );
}
