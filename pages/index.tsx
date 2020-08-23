const MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`

import Row from '../components/Row'

const IndexPage = () => {
    return (
        <div>
            <Row title='Netflix Original' fetchUrl={MOVIES_API} isLargeRow />
            <Row title='Trending Now' fetchUrl={MOVIES_API} />
        </div>
    )
}

export default IndexPage
