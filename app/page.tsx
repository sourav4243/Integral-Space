import { Nav } from "@/components/Nav";
import { Main } from "@/components/Main";
import MatrixRain from "@/components/MatrixRain";

export default function Home() {
  return (
    <div className="flex justify-between h-screen w-full bg-zinc-50 dark:bg-slate-950/10 pixel-grid fixed">
      <div className="hidden md:block w-[20vw] h-[50vh] m-4 shadow-[3px_3px_0px_0px_#0e1526] border border-gray-400/70">
        <div className="w-full h-full dark:bg-slate-950/70 pixel-grid" >
          <MatrixRain/>
        </div>
      </div>

      <div className="flex-1 flex-col">
        <Nav/>
        <Main/>
      </div>
    </div>
  );
};
