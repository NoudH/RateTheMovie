import Axios from 'axios';

const GetAllActors = (page, size) => {

    let promise = Axios.get('http://localhost:8080/api/persons/?page=' + page  + '&size=' + size);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default GetAllActors;