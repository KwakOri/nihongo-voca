import { NavLink } from "react-router";
import "./App.css";

function App() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-white text-xl">NIHONGO VOCA</h1>
      <NavLink to="levels">
        <p className="bg-[#2d2d2d] w-full h-20 rounded flex justify-center items-center text-white">
          공부하러 가기
        </p>
      </NavLink>
    </div>
  );
}

export default App;
