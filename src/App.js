import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Retreats from "./Retreats";
import Layout from "./components/Layout";
import Missing from "./components/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home Page */}
        <Route index element={<Home />} />
        {/* Retreat Routes */}
        <Route path=":id">
          <Route index element={<Retreats />} />
        </Route>
        {/* Display missing page for every route that does not exist */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
