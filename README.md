Product Dashboard
A modern product management interface built with React, Tailwind CSS, Zustand, and Framer Motion. It connects to a public API to display, manage, and filter products with features like CRUD operations, favorites, search/filter/sort, pagination, modals, and toast notifications.
Features

Fetch & Display Products: Displays products (name, price, category, rating) from the provided API.
CRUD Operations: Create, edit, and delete products using API endpoints.
Favorites: Mark/unmark products as favorites, persisted via localStorage.
Search & Filter: Search by name, filter by category, sort by price (low to high, high to low).
Modal Details: View product details (name, price, description, category) in a modal.
Pagination: Paginate large product lists (5 items per page).
Toast Notifications: Show success/error messages for API actions.
Bonus Features:
State management with Zustand.
Responsive design for mobile and desktop.
Loading indicators and error messages.
Smooth animations using Framer Motion.



Tech Stack

React: Frontend framework.
Tailwind CSS: Styling.
Zustand: State management.
Framer Motion: Animations.
React Toastify: Toast notifications.
Axios: API requests.
React Icons: Icons.

Setup Instructions

Clone the repository:git clone <your-repo-url>
cd product-dashboard


Install dependencies:npm install


Create a .env file in the root directory and add the API base URL:VITE_BASE_URL=https://mock-data-josw.onrender.com


Run the development server:npm run dev


Open http://localhost:5173 in your browser.

Deployment

Build the project:npm run build




Navigation Flow

View Products: The main table displays products with name, price, category, and rating.
Search & Filter: Use the search bar to filter by name, select a category to filter, or sort by price.
Add Product: Click "Add Product" to open a form modal for creating a new product.
Edit Product: Click the pencil icon on a product row to edit its details.
Delete Product: Click the trash icon to delete a product.
View Details: Click a product row to open a modal with full details.
Favorites: Click the heart icon to mark/unmark a product as a favorite.
Pagination: Use the page buttons to navigate through product pages.

Assumptions & Decisions

Used VITE_BASE_URL in .env for the API base URL as specified.
Used Zustand for lightweight state management instead of Redux for simplicity.
Implemented pagination with 5 items per page for better UX.
Persisted favorites in localStorage for simplicity.
Used Tailwind CSS for rapid, responsive styling.
Added Framer Motion for smooth animations (table rows, modals, buttons).
Used Sweet Alert for good and visible toast notifications.
Assumed the API is stable and handles errors appropriately.

Improvements with More Time

Add unit tests using Jest and React Testing Library.
Implement advanced filtering (e.g., by rating range).
Add a dark mode toggle.
Enhance accessibility (e.g., ARIA labels, keyboard navigation).


Hosted Project
Link to deployed project (https://product-dashboard-trial.netlify.app/)
GitHub Repository
Link to repository (https://github.com/Leticiaattoh/product-dashboard)
