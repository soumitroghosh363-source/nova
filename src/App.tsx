import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AdminLayout } from './components/admin/AdminLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Keep the homepage eager — it's the most common entry point and should
// have zero extra network round-trip before first paint.
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// Everything else loads on demand.
const Shop = lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })))
const ProductDetails = lazy(() => import('./pages/ProductDetails').then((m) => ({ default: m.ProductDetails })))
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })))
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess').then((m) => ({ default: m.OrderSuccess })))
const Orders = lazy(() => import('./pages/Orders').then((m) => ({ default: m.Orders })))
const Wishlist = lazy(() => import('./pages/Wishlist').then((m) => ({ default: m.Wishlist })))
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })))
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.AdminDashboard })))
const AdminProducts = lazy(() => import('./pages/admin/Products').then((m) => ({ default: m.AdminProducts })))
const ProductEditor = lazy(() => import('./pages/admin/ProductEditor').then((m) => ({ default: m.ProductEditor })))
const AdminOrders = lazy(() => import('./pages/admin/Orders').then((m) => ({ default: m.AdminOrders })))
const AdminCustomers = lazy(() => import('./pages/admin/Customers').then((m) => ({ default: m.AdminCustomers })))
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics').then((m) => ({ default: m.AdminAnalytics })))

const PageFallback = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-body text-muted">Loading…</p>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<ProductEditor />} />
              <Route path="products/:id/edit" element={<ProductEditor />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App