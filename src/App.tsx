import './App.css'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Product from './pages/Product'

function App() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/product/:id"} component={Product} />
    </Switch>
  )
}

export default App
