import { useEffect, useState } from "react"
import Items from "./Items"
import PaginationComponent from "./PaginationComponent"
import { apiKey } from "../App"

const Trendings = ({ searchItem }) => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=139d01b05b0da0f486bb336ef87b9e2f&page=${page}`

    const getTrending = async () => {
        if (searchItem === '') {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results);
        } else {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchItem}&page=${page}&include_adult=false`)
            const data = await res.json()
            setMovies(data.results)
            setNumOfPages(data.total_pages);
        }
    }

    useEffect(() => {
        getTrending();
        //eslint-disable-next-line
    }, [page, searchItem])
    return (<div className="container">
        {numOfPages < 1 && (
            <h2>No results</h2>)}
        <div className="itemsBox">
            {movies?.map((item) => <Items
                key={item.id}
                id={item.id}
                title={item.title || item.name}
                image={item.poster_path}
                date={item.first_air_date || item.release_date}
                type={item.media_type}
                rate={item.vote_average}
                overview={item.overview}
            />)}
        </div>
        <PaginationComponent setPage={setPage} numOfPages={numOfPages} />
    </div>);
}

export default Trendings;