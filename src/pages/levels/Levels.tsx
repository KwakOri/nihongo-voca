import { NavLink } from "react-router";

const Levels = () => {
  const levels = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-10 grid grid-cols-3 gap-2">
        <NavLink
          to="/"
          className={
            "rounded bg-[#2d2d2d] w-full h-full flex justify-center items-center text-white text-xs"
          }
        >
          뒤로가기
        </NavLink>
      </div>
      {levels.map((level, index) => (
        <NavLink to={`${level}`} key={index}>
          <p className="w-full h-20 rounded bg-[#2d2d2d] flex justify-center items-center text-white text-xl">
            N{level}
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default Levels;
