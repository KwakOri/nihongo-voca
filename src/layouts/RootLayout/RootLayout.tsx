import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="fixed inset-0 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
