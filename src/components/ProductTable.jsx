import { useState } from "react";
import { motion } from "framer-motion";
import { HiHeart, HiTrash, HiPencil } from "react-icons/hi";
import useStore from "../store/useStore";
import ProductModal from "./ProductModal";
import AddEditProductModal from "./AddEditProductModal";
import Pagination from "./Pagination";

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
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-left w-1/4 sm:w-auto">Name</th>
              <th className="p-2 border text-left w-1/6 sm:w-auto">Price</th>
              <th className="p-2 border text-left w-1/4 sm:w-auto">Category</th>
              <th className="p-2 border text-left w-1/6 sm:w-auto">Rating</th>
              <th className="p-2 border text-left w-1/6 sm:w-auto">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">{product.rating}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <HiHeart
                      className={`w-5 h-5 ${
                        favorites.includes(product.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditProduct(product);
                    }}
                  >
                    <HiPencil className="w-5 h-5 text-blue-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id, window.toast);
                    }}
                  >
                    <HiTrash className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
