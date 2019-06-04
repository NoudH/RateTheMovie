import Axios from 'axios';

const GetAllGenres = () => {

    let promise = Axios.get('http://localhost:8080/api/genre');
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default GetAllGenres;