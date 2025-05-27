import './index.css'

// import { Header } from './components/Header/Header'
import {Navbar} from './components/Navbar/Navbar'
import {Footer} from './components/Footer/Footer'
import {Slider} from './components/Slider/Slider'


const App=()=> {

  return (
    <>
    {/* <Header/> */}
    <Navbar/>
    <Slider/>
    <Footer/>
    </>
  )
}


export default App
