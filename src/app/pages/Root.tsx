import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollRestoration />
      <Outlet />
    </div>
  );
}
