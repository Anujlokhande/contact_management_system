import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
