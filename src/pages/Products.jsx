import ProductTable from "../components/ProductTable";

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Products</h1>
      </header>
      <ProductTable />
    </div>
  );
};

export default Products;
