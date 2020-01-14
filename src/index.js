import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';


let listadoUrls = ['https://api.themoviedb.org/3/movie/top_rated?api_key=f13b35a7449050301ba5dbef9580d820&language=en-US&page=1',
                'https://api.themoviedb.org/3/movie/popular?api_key=f13b35a7449050301ba5dbef9580d820&language=en-US&page=1']

const Card = ({curso,index}) => {
    return(
        <div className='card'>
            <img className='imgCard' ></img>
            <div className='infoCard' >{curso}</div>
        </div>
    );
}

const ListCard = ({tipo,index}) => {

    const [hasError, setErrors] = useState(false);
    const [listMovies, setListMovies] = useState([]);
    
    useEffect(() => {
        data(listadoUrls[index]);
    },[]);

    async function data(url,index){
        fetch(url)
            .then(res => res.json())
            .then(res => {
                let listMoviesAux = listMovies.concat(res.results.map(movie=>movie.title));
                console.log(listMoviesAux)
                setListMovies(listMoviesAux);
            })
            .catch((err) => setErrors(err));
    }

    let listado = listMovies.map((movie,i) => <Card curso={movie} key={i}></Card>);

    return (<section className='groupCard'>
                <h2>{tipo}</h2>
                <div className='listCard'>
                    {listado}
                </div>     
            </section>)
}

const ListGroup = (props) => {
    const listados = ['Top Rated','Popular'];
    return listados.map((e,i) => <ListCard tipo={e} key={i} index={i}></ListCard>)
}

const News = (props) => {
    return  (<section className='portada'>
            </section>)
}

const Main = (props) => {
    return (<main>
                <News></News>
                <ListGroup></ListGroup>
            </main>)
}

const Navbar = (props) => {
    return (<nav className='navbar'>
                <ul>
                    <li><a href="#0">Inicio</a></li>
                    <li><a href="#1">Sobre nosotros</a></li>
                    <li><a href="#2">Contacto</a></li>
                </ul>
            </nav>)
}

const Header = (props) => {
    return(<header>
                <Navbar></Navbar>
            </header>)
}

const App = (props) => {
    return(
        <div className='root_2'>
            <Header></Header>
            <Main></Main>
        </div>
    )
}


ReactDOM.render(<App></App>,document.getElementById('root'))