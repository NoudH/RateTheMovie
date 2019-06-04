import Axios from 'axios';

const FindActorByName = (name, page, size) => {

    let promise = Axios.get('http://localhost:8080/api/persons/findByName?name=' + name + "&page=" + page + "&size=" + size);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
        res.data
    );
    return(promise);
};

export default FindActorByName;