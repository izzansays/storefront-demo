import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Product from './pages/Product'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'

function App() {
  return (
    <CartProvider>
      <div className='container lg:w-7xl pb-20'>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/product/:id"} component={Product} />
          <Route path={"/checkout"} component={Checkout} />
        </Switch>
      </div>
    </CartProvider>
  )
}

export default App
