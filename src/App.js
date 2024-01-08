import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./routes/HomePage";
import ProfilePage from "./routes/ProfilePage";
import ErrorPage from "./routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { loginUser, setLoading } from "./redux/authSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import Authenticate from "./components/authenticate/Authenticate";
const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage queryClient={queryClient} />,
      },
      {
        path: "/profile",
        element: <ProfilePage queryClient={queryClient} />,
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.log("User is not logged in.");
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
