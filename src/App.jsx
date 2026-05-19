import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Catalog } from "./pages/Catalog/Catalog";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Cart } from "./pages/Cart/Cart";
import { Favorites } from "./pages/Favorites/Favorites";
import { Login } from "./pages/Login/Login";
import { News } from "./pages/News/News";


export default function App() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header />
              <main className="page-main">
                <Routes>
                  <Route path="/" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/news" element={<News />} />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}

/** Страница 404. */
function NotFound() {
  return (
    <div
      className="container"
      style={{ padding: "96px 0", textAlign: "center" }}
    >
      <h1 style={{ fontSize: 64 }}>404</h1>
      <p style={{ color: "var(--muted)", marginTop: 12, marginBottom: 24 }}>
        Такой страницы не существует.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: 999,
          backgroundColor: "var(--accent)",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        В каталог
      </Link>
    </div>
  );
}
