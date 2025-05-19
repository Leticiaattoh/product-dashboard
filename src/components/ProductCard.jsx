import { HiHeart, HiTrash, HiPencil } from "react-icons/hi";

const ProductCard = ({ product, isFavorite, onFavorite, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between h-full">
    <div>
      <h3 className="font-bold text-lg mb-2 break-words">{product.name}</h3>
      <p className="text-gray-600 mb-1">Price: <span className="font-semibold">${product.price}</span></p>
      <p className="text-gray-600 mb-1">Category: {product.category}</p>
      <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
    </div>
    <div className="flex gap-2 mt-2">
      <button onClick={onFavorite} className="p-1 hover:bg-gray-200 rounded" title="Favorite">
        <HiHeart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-500"}`} />
      </button>
      <button onClick={onEdit} className="p-1 hover:bg-gray-200 rounded" title="Edit">
        <HiPencil className="w-5 h-5 text-blue-500" />
      </button>
      <button onClick={onDelete} className="p-1 hover:bg-gray-200 rounded" title="Delete">
        <HiTrash className="w-5 h-5 text-red-500" />
      </button>
    </div>
  </div>
);

export default ProductCard; 