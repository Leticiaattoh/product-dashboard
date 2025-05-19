import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 mb-4">
        <h1 className="text-2xl font-bold">Welcome to the Product Dashboard</h1>
      </header>
      <div className="container mx-auto">
        <p className="text-lg">Explore the application:</p>
        <ul className="list-disc pl-6">
          <li>
            <Link to="/dashboard" className="text-blue-500 hover:underline">
              Go to Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-blue-500 hover:underline">
              View Products
            </Link>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Home;
