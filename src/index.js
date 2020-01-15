import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';

const key = 'f13b35a7449050301ba5dbef9580d820';
const listadoUrls = ['https://api.themoviedb.org/3/movie/top_rated?api_key='+key+'&language=en-US&page=1',
                'https://api.themoviedb.org/3/movie/popular?api_key='+key+'&language=en-US&page=1']
const urlImg = 'https://image.tmdb.org/t/p/w300/'
const urlVideo = 'https://api.themoviedb.org/3/movie/'
const urlYou = 'https://www.youtube.com/watch?v='
const urlPelicula = 'https://api.themoviedb.org/3/movie/'

const Card = ({movie,move,onmouseover,onmouseout,index,punta,img,onClick}) => {
    return(
        <div className={'card '+move+' '+punta} onClick={onClick} onMouseOver={onmouseover} onMouseOut={onmouseout} id={index} name={movie} >
            <img className='imgCard' src={img}></img>
            <div className='infoCard' hidden>{movie}</div>
        </div>
    );
}

const ListCard = ({tipo,index,onClick}) => {

    const [hasError, setErrors] = useState(false);
    const [listMovies, setListMovies] = useState([]);
    const [listMoviesImg, setListMoviesImg] = useState([]);
    const [listMoviesOnOver, setListMoviesOnOver] = useState([]);
    
    useEffect(() => {
        data(listadoUrls[index]);
    },[]);

    async function data(url,index){
        fetch(url)
            .then(res => res.json())
            .then(res => {
                let listMoviesAux = listMovies.concat(res.results.map(movie=>movie.id));
                setListMovies(listMoviesAux);
                setListMoviesImg(listMoviesImg.concat(res.results.map((movie,i)=>urlImg+res.results[i].backdrop_path)));
                setListMoviesOnOver(Array(listMoviesAux.length).fill('none'))
            })
            .catch((err) => setErrors(err));
    }

    const handleOnOver = event => {
        let cardOver = event.currentTarget.id;
        let moveListCard = [];
        
        for(var i = 0; i<20;i++){
            
            if(i<cardOver){
                moveListCard.push('left');
            }else if(i>cardOver){
                moveListCard.push('right')
            }else if(i==cardOver)  {
                moveListCard.push('center');
            }else{
                moveListCard.push('none')
            }
        }

        setListMoviesOnOver(moveListCard)
    }

    const handleOnOut = event => {
        setListMoviesOnOver(listMoviesOnOver.map(()=>'none'))
    }

    let listado = listMovies.map((movie,i) =>{

                        let punta = '';
                        if(i==0){
                            punta = 'start'
                        } else if(i==listMovies.length-1){
                            punta = 'end'
                        }

                        return(<Card movie={movie} img={listMoviesImg[i]} key={i} index={i} 
                        move={listMoviesOnOver[i]} 
                        onmouseover={handleOnOver}
                        onmouseout={handleOnOut} punta={punta} onClick={onClick}>
                        </Card>)
                        });

    return (<section className='groupCard'>
                <h2>{tipo}</h2>
                <div className='listCard'>
                    {listado}
                </div>     
            </section>)
}

const ListGroup = ({onClick}) => {
    const listados = ['Top Rated','Popular'];
    return listados.map((e,i) => <ListCard tipo={e} key={i} index={i} onClick={onClick}></ListCard>)
}

const News = ({pelicula,trailerKey}) => {
    return  (<section className='portada'>
                <div className='infoPeli'>
                    <h1 className='nombrePortada'>{pelicula.original_title}</h1>
                    <div className='overview'>{pelicula.overview}</div>
                    <div className='duracion'>{pelicula.runtime}</div>
                    <div className='fecha'>{pelicula.release_date}</div>
                    <div className='notaPublico'>{pelicula.vote_average}</div>   
                </div>
                <div className='trailerPeli'>
                    <iframe src={'https://www.youtube.com/embed/'+trailerKey
                            +'?autoplay=1&controls=0&disablekb=1&fs=0&loop=0&modestbranding=1&rel=0&showinfo=0&mute=1&autohide=1'} 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    <div className='fader'></div>
                </div>
            </section>)
}


class Main extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            idPelicula: '',
            pelicula: {},
            trailerKey:''
        };
    }

    onClick(event){
        let id = event.currentTarget.getAttribute('name');
        this.setState({idPelicula:id});
        this.getData(id)
    }

    getData(id){
        fetch(urlPelicula+id+'?api_key='+key+'&language=en-US')
            .then(res=>res.json())
            .then(res=>this.setState({pelicula:res}))
            .catch(err=>console.log(err));

        fetch(urlVideo+id+'/videos?api_key='+key+'&language=en-US')
            .then(res=>res.json())
            .then(res=>this.setState({trailerKey:res.results[0].key}))
            .catch(err=>console.log(err));
    }
    
    render(){return (<main>
        <News pelicula={this.state.pelicula} trailerKey={this.state.trailerKey}></News>
        <ListGroup onClick={this.onClick.bind(this)}></ListGroup>
    </main>)}
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