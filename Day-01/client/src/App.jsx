import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './auth/Signup'
import Singnin from './auth/Singnin'
import Home from './Home'
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Signin' element={<Singnin/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
