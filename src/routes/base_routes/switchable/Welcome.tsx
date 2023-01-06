import transperant from "@/assets/transperant.png";
import { useNavigate } from "react-router-dom";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {/* welcome section */}
      <div className="basis-1/2 flex flex-col items-start">
        <h1 className="text-[36px] text-bold text-slate-900 mb-3">
          Quantum Gym
        </h1>
        <p>One stop for all workout collections and events.</p>
        <div className="actions flex gap-5 mt-10">
          <button className="bg-pink-900 p-3 px-10 text-white rounded-lg font-bold">
            Login
          </button>
          <button className=" p-3 px-10 text-pink-900 border-2 font-bold rounded-lg">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
