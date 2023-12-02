import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import Agents from "./pages/Agents";
import Properties from "./pages/Properties";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import OurServices from "./pages/OurServices";
import PropertiesDetail from "./pages/PropertiesDetail";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoute from "./components/UserRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout
              title={"The Simplest Way to Find Property"}
              subtitle={
                "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
              }
            />
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route element={<RootLayout title={"About"} />}>
          <Route path="about" element={<About />} />
        </Route>
        <Route element={<RootLayout title={"OurServices"} />}>
          <Route path="ourServices" element={<OurServices />} />
        </Route>
        <Route element={<RootLayout title={"Agents"} />}>
          <Route path="agent" element={<Agents />} />
        </Route>
        <Route element={<RootLayout title={"Choose Your Desired Home"} />}>
          <Route path="properties" element={<Properties />} />
        </Route>
        <Route element={<RootLayout title={"Blog"} />}>
          <Route path="blogs" element={<Blog />} />
        </Route>
        <Route element={<RootLayout title={"BlogDetail"} />}>
          <Route path="blogDetails/:id" element={<BlogDetail />} />
        </Route>
        <Route element={<RootLayout title={"Contact"} />}>
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route element={<RootLayout title={"PropertyDetail"} />}>
          <Route path="propertiesDetails/:id" element={<PropertiesDetail />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} position="top-right" />
    </>
  );
}

export default App;
