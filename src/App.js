import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:movieName",
        element: <Movie />,
      }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
