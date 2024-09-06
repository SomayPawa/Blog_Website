import {Route,Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import Create from './blogs/Create';
import Display from './blogs/Display';
import UpdateBlog from './blogs/UpdateBlog';
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/Create" element = {<Create/>}/>
        <Route path="/display" element={<Display />} />
        <Route path="/update/:id" element={<UpdateBlog />} /> {/* New route for updating a blog */}
      </Routes> 
      
    </>
  )
}

export default App
