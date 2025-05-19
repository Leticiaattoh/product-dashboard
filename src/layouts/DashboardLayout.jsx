import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Dashboard</h1>
          <nav className="flex gap-4">
            <Link to="/dashboard" className="hover:underline">
              Overview
            </Link>
            <Link to="/dashboard/favorites" className="hover:underline">
              Favorites
            </Link>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
