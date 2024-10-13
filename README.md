# 🛍️ **Men's Fashion E-commerce Web App**

This is a sophisticated and modern e-commerce web application built using **Next.js** and **TypeScript** with **Tailwind CSS** for styling, **Shadcn** for UI components, and **Framer Motion** for animations. The app interacts with **FakeStoreAPI** to simulate product listings, with features such as product search, category filtering, and a shopping cart system.

![Project Preview](path-to-your-preview-image) <!-- You can add a screenshot of your project -->

## 🎯 **Key Features**

- 🛒 **Product Listing & Filtering**: View products by categories, price range, and availability.
- 💳 **Add to Cart**: Add items to your cart, adjust quantities, and remove items.
- 📝 **Product Details**: View detailed descriptions, reviews, and specifications of each product in a modal dialog.
- 💬 **Real-time Animations**: Fluid animations for user interactions using **Framer Motion**.
- 📱 **Mobile Responsive**: The app is fully responsive across different screen sizes.
- 🌍 **Internationalization Ready**: Easily adaptable for multi-language support.

## 🧰 **Tech Stack**

- **Next.js**: A React framework for production, providing server-side rendering and static site generation.
- **TypeScript**: Strongly typed language to build more robust and scalable applications.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.
- **Shadcn UI**: A headless component library for fast and consistent UI development.
- **Framer Motion**: A powerful library for creating smooth animations.
- **SwiperJS**: Modern touch slider for mobile devices.
- **Axios**: Promise-based HTTP client for API requests.
- **FakeStoreAPI**: A free API for e-commerce data (used for product simulation).

## 📦 **Libraries Used**

| Library      | Purpose                                                             | Documentation Link                                     |
| ------------ | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **Next.js**  | React framework for server-side rendering and static site generation | [Next.js Docs](https://nextjs.org/docs)               |
| **TypeScript** | Typed JavaScript for better code quality                          | [TypeScript Docs](https://www.typescriptlang.org/docs/)|
| **TailwindCSS** | CSS framework for building responsive and custom UIs            | [Tailwind Docs](https://tailwindcss.com/docs)          |
| **Shadcn UI**  | Component library for headless UI                                 | [Shadcn Docs](https://shadcn.dev/docs)                |
| **Framer Motion** | Animation library for React apps                              | [Framer Motion Docs](https://www.framer.com/motion/)  |
| **SwiperJS**  | Touch-enabled slider component for mobile                          | [SwiperJS Docs](https://swiperjs.com/)                |
| **Axios**     | Promise-based HTTP client for API requests                         | [Axios Docs](https://axios-http.com/)                 |
| **FakeStoreAPI** | E-commerce product and category simulation                     | [FakeStoreAPI](https://fakestoreapi.com/)             |

## 🏗️ **Project Structure**

```bash
src/
|-- app/
|   |-- shop/
|   |   |-- page.tsx                  # Shop page with product filtering and listing
|   |-- layout.tsx                    # Main layout for the application
|   |-- page.tsx                      # Landing page
|-- components/
|   |-- ProductCard.tsx               # Component for displaying individual product cards
|   |-- ProductDetailsDialog.tsx      # Modal for product details with image slider and descriptions
|-- context/
|   |-- CartContext.tsx               # Context for managing the shopping cart state
|   |-- UserContext.tsx               # Context for managing user authentication and session state
|-- utils/
|   |-- api.ts                        # API calls to fetch products and other data from FakeStoreAPI
|-- styles/
|   |-- globals.css                   # Global styles for the project
|-- pages/
|   |-- api/                          # API routes for handling product and cart operations
|-- public/
|   |-- images/                       # Public images used in the app (e.g., logo, banners)
```

## 🚀 **Installation and Setup**

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mens-fashion-ecommerce.git
cd mens-fashion-ecommerce
```

### 2. Install dependencies

Use **npm** or **yarn** to install the required libraries and dependencies:

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of your project and add the necessary environment variables for **NextAuth** or any other third-party services:

```bash
NEXTAUTH_SECRET=your-next-auth-secret
NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 5. Build for production

```bash
npm run build
# or
yarn build
```

## 🛠️ **Available Scripts**

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase to maintain code quality.

## 📖 **Functionality Overview**

### 1. **Product Listing and Filters**
   - Fetches product data from **FakeStoreAPI** and displays them in the `Shop` page.
   - Users can filter products based on categories, price range, and rating.

### 2. **Product Details Modal**
   - Opens a modal with detailed product information, including a SwiperJS slider for product images.
   - Users can view product descriptions, reviews, and specifications.

### 3. **Add to Cart Functionality**
   - Users can add items to their cart from the product listing or details modal.
   - Cart items are managed using `CartContext` for persistent state.

### 4. **Responsive Design**
   - The entire application is responsive, using **Tailwind CSS** to ensure a great experience on mobile, tablet, and desktop screens.

### 5. **Animations with Framer Motion**
   - Smooth animations for elements such as buttons, modals, and image zoom on hover, powered by **Framer Motion**.

## 🧪 **Testing**

To test the functionality of the app:

- Ensure that the development server is running.
- Navigate through the pages and interact with the product listings, modals, and cart.

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
