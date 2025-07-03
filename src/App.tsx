import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Product from './pages/Product'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import Nav from './components/Nav'
import About from './pages/About'

function App() {
  return (
    <CartProvider>
      <Nav />
      <div className='container lg:w-7xl pb-20'>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/product/:id"} component={Product} />
          <Route path={"/checkout"} component={Checkout} />
          <Route path={"/about"} component={About} />
        </Switch>
      </div>
    </CartProvider>
  )
}

export default App
