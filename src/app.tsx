import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Signin } from "./components/sigin";

export function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
    </Routes> 
    </>
  )
}
