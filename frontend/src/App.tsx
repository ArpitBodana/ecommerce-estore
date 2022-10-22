import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Product from "./Pages/Product";
import Footer from "./Components/Footer";
import { Button, Container } from "react-bootstrap";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import { ToastContainer } from "react-toastify";
import Shipping from "./Pages/Shipping";
import SignUp from "./Pages/SignUp";
import PaymentMethod from "./Pages/PaymentMethod";
import PlaceOrder from "./Pages/PlaceOrder";
import AppBar from "./Components/AppBar";
import Order from "./Pages/Order";
import OrderHistory from "./Pages/OrderHistory";
import Profile from "./Pages/Profile";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Search from "./Pages/Search";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import UserList from "./Pages/Admin/UserList";
import EditUser from "./Pages/Admin/EditUser";
import OrderList from "./Pages/Admin/OrderList";
import ProductList from "./Pages/Admin/ProductList";
import EditProduct from "./Pages/Admin/EditProduct";
import AddProduct from "./Pages/Admin/AddProduct";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://estore-mern-demo.herokuapp.com/api/products/categories"
        );
        setCategories(data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          isSideBarOpen
            ? "d-flex flex-column site-container active-cont min-vh-100"
            : "d-flex flex-column site-container min-vh-100"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <header className="font-weight-bolder fw-bold">
          <AppBar
            setIsSideBarOpen={setIsSideBarOpen}
            isSideBarOpen={isSideBarOpen}
          />
        </header>

        <div
          className={
            isSideBarOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : " side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item className="d-flex justify-content-between">
              <strong>Categories</strong>
              <Button
                size="sm"
                variant="warning"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
              >
                <i className="">x</i>
              </Button>
            </Nav.Item>
            {categories.map((category: string) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setIsSideBarOpen(false)}
                >
                  <Nav.Link className="text-warning">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className="">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentMethod />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/placeorder"
                element={
                  <ProtectedRoute>
                    <PlaceOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id/"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<Search />} />
              {/*Admin Routes*/}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/userlist"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edituser/:id"
                element={
                  <AdminRoute>
                    <EditUser />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orderlist"
                element={
                  <AdminRoute>
                    <OrderList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/productlist"
                element={
                  <AdminRoute>
                    <ProductList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/editproduct/:id"
                element={
                  <AdminRoute>
                    <EditProduct />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/addproduct"
                element={
                  <AdminRoute>
                    <AddProduct />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
