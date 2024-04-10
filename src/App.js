import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Home from "./screens/userinterface/Home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ProductDetails from "./screens/userinterface/ProductDetails";
import ShowCart from "./components/userinterface/ShowCart";
import PaymentDetails from "./components/userinterface/PaymentDetails";
import Cart from "./screens/userinterface/Cart";
import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";
import LogInScreen from "./screens/userinterface/LogInScreen"
import { LoginDetails } from "./components/userinterface/LoginDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin/>} path={"/adminlogin"}/>
          <Route element={<AdminDashboard/>} path={"/admindashboard/*"}/>
          <Route element={<Home/>} path={"/home"}/>
          <Route element={<ProductDetails/>} path={"/productdetails"}/>
          <Route element={<ShowCart/>} path={"/showcart"}/>
          <Route element={<PaymentDetails/>} path={"/paymentdetails"}/>
          <Route element={<Cart/>} path={"/cart"}/>
          <Route element={<PlusMinusComponent/>} path="/plusminuscomponent"/>
          <Route element={<LogInScreen/>} path="/login"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
