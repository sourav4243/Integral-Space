import Image from "next/image";
import { PixelatedBox } from "./PixelatedBox";
import Clock from "./Clock";

export const Main = () => {
    return (
        <main className="pixel-grid flex w-full max-w-4xl h-full pt-12 px-16 bg-zinc-50 dark:bg-slate-950/70 border border-gray-400/70">
            <div className="flex flex-col w-16 h-50 border items-center p-2">
                <div className="git bg-slate-800/40 w-12 h-12 rounded-full">
                    <Image
                        src="/git.png"
                        height={50}
                        width={50}
                        alt="git"
                    />
                </div>
                <div className="linkdin">

                </div>
                <div className="ig">

                </div>
            </div>
            <PixelatedBox height="h-32" width="w-52">
               <Clock/>
            </PixelatedBox>
        </main>
    );
};