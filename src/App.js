import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./routes/HomePage";
import ProfilePage from "./routes/ProfilePage";
import ErrorPage from "./routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import SignIn from "./routes/SignIn";

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
      // {
      //   path: "/habit-tracker/profile",
      //   element: <ProfilePage />,
      // },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
