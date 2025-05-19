import { motion } from "framer-motion";
import { HiHeart, HiTrash, HiPencil } from "react-icons/hi";
import useStore from "../store/useStore";
import ProductModal from "./ProductModal";
import AddEditProductModal from "./AddEditProductModal";
import { useState } from "react";

const FavoritesPage = () => {
  const { products, favorites, toggleFavorite, deleteProduct, loading, error } =
    useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Favorite Products</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {favoriteProducts.length === 0 && !loading && !error && (
        <div className="text-center">No favorite products yet.</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favoriteProducts.map((product) => (
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
                    <HiHeart className="w-5 h-5 text-red-500" />
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
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {editProduct && (
        <AddEditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
