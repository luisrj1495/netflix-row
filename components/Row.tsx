import { useEffect, useState } from 'react'

type MoviesType = {
    page: number
    results: any[]
    total_pages: 500
    total_results: number
}

const parser = (str: string) => {
    try {
        return JSON.parse(sessionStorage.getItem(str))
    } catch (error) {
        return {}
    }
}

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState<MoviesType>({ results: [] })

    useEffect(() => {
        const moviesLocal = parser('movies')
        if (moviesLocal) {
            setMovies(moviesLocal)
        } else {
            fetch(fetchUrl).then(async (response) => {
                const movies = await response.json()
                setMovies(movies)
                sessionStorage.setItem('movies', JSON.stringify(movies))
            })
        }
    }, [])

    return (
        <div>
            <h4>{title}</h4>

            <div className='row'>
                <div className='row__posters'>
                    {movies.results.map((movie) => (
                        <img
                            loading='lazy'
                            className={`row__poster ${
                                isLargeRow && 'row__posterLarge'
                            }`}
                            key={movie.id}
                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            alt={movie.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Row
