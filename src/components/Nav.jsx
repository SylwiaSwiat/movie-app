import './Nav.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Nav = () => {
    const [isActiveTrending, setIsActiveTrending] = useState(false);
    const [isActiveMovies, setISActiveMovies] = useState(false);
    const [isActiveSeries, setIsActiveSeries] = useState(false);

    const handleActiveTrending = ()=>{
        window.scroll(0,0);
setISActiveMovies(false);
setIsActiveSeries(false);
        setIsActiveTrending(true);
    }
    const handleActiveMovies=()=>{
        window.scroll(0,0);
        setIsActiveTrending(false);
        setIsActiveSeries(false);
        setISActiveMovies(true);
    }
    const handleActiveSeries=()=>{
        window.scroll(0,0);
        setIsActiveTrending(false);
        setISActiveMovies(false);
        setIsActiveSeries(true);
    }

    
    return ( 
        <div className='navContainer'>
            <ul>
          <li onClick={handleActiveTrending}><Link to='/' className={`navLink ${isActiveTrending&&'activeLink'}`}>Trending</Link></li>      
          <li onClick={handleActiveMovies}><Link to='/movies' className={`navLink ${isActiveMovies&&'activeLink'} `}>Movies</Link>  </li>    
        <li onClick={handleActiveSeries}><Link to='/series' className={`navLink ${isActiveSeries&&'activeLink'}`}>Series</Link> </li>       
            </ul>
        </div>
     );
}
 
export default Nav;