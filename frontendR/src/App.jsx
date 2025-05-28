import './index.css'

// import { Header } from './components/Header/Header'
import {Navbar} from './components/Navbar/Navbar'
import {Footer} from './components/Footer/Footer'
import {PerfilUsuario} from './views/private/perfilUsuario/PerfilUsuario'
// import {Slider} from './components/Slider/Slider'
// import {CrearProductos} from './views/private/crearProductos/CrearProductos'
// import { PerfilAdmin } from './views/private/perfilAdmin/PerfilAdmin'


const App=()=> {

  return (
    <>
    {/* <Header/> */}
    <Navbar/>
    {/* <Slider/> */}
    <PerfilUsuario/>
    {/* <CrearProductos/> */}
    <Footer/>
    </>
  )
}


export default App
