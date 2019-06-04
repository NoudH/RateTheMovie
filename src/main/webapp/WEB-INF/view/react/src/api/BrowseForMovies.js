import Axios from 'axios';

const BrowseForMovies = (title, rating, year, genre, page, size) => {

    let promise = Axios.get('http://localhost:8080/api/movie/browse?page=' + page + '&size=' + size + '&title='+ title + "&rating=" + rating + "&year=" + year + "&genre=" + genre);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default BrowseForMovies;