import { useState } from "react";
import useStore from "../store/useStore";
import ProductModal from "./ProductModal";
import AddEditProductModal from "./AddEditProductModal";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductTable = () => {
  const { products, favorites, toggleFavorite, deleteProduct, loading, error } =
    useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 5;

  const filteredProducts = products
    .filter(
      (p) => p && p.name && p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? p && p.category === category : true))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto flex-1"
        >
          <option value="">All Categories</option>
          {useStore.getState().categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto flex-1"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
      >
        Add Product
      </button>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onFavorite={() => toggleFavorite(product.id)}
            onEdit={() => setEditProduct(product)}
            onDelete={() => deleteProduct(product.id, window.toast)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {(showAddModal || editProduct) && (
        <AddEditProductModal
          product={editProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
