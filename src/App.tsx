import './App.css'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Product from './pages/Product'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'

function App() {
  return (
    <CartProvider>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/product/:id"} component={Product} />
        <Route path={"/checkout"} component={Checkout} />
      </Switch>
    </CartProvider>
  )
}

export default App
