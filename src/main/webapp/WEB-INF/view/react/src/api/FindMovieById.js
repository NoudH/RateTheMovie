import Axios from 'axios';

const FindMovieById = (id) => {

    let promise = Axios.get('http://localhost:8080/api/movies/?id=' + id);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default FindMovieById;