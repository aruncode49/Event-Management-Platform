import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/custom/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/sign-in" element={<SigninPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
