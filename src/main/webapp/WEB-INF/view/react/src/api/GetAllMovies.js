import Axios from 'axios';

const GetAllMovies = (page, size) => {

    let promise = Axios.get('http://localhost:8080/api/movie/all?page=' + page + "&size=" + size);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default GetAllMovies;