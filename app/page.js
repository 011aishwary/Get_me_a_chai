import Image from "next/image";
import Coffeemug from "../components/Coffeemug";

export default function Home() {
  return (<>
    <div className="flex flex-col max-w-screen items-center justify-center relative h-[50vh]">

      <div className="relative mt-6 flex  items-center justify-center left-5">
        <h1 className="text-4xl text-[#f2f2ef]  font-bold relative top-2">Buy Me a Chai
        </h1>
        <span><Coffeemug />
        </span>
      </div>
      <div className="flex justify-center flex-col items-center">
        <h3 className="text-xl my-4 text-[#f2f2ef]">A crowdfunding platform for creators. Get funded by your fans and followers . Start Now !</h3>
        <div className="flex gap-4 items-center">

          <button type="button" className="bg-[#806354] py-2 px-4 rounded-2xl text-[#f2f2ef] hover:scale-97 hover:text-white hover:bg-[#3b2f30]">Start Here</button>
          <button type="button" className="bg-[#806354] py-2 px-4 rounded-2xl text-[#f2f2ef] hover:scale-97 hover:text-white hover:bg-[#3b2f30]">Read More</button>
        </div>
      </div>
    </div>
    <div className="h-[2px]  bg-black"></div>

    <div className="h-[124vh] "></div>
  </>
  );
}
