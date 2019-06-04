import Axios from 'axios';

const FindActorById = (id) => {

    let promise = Axios.get('http://localhost:8080/api/persons/findById?id=' + id);
    promise.then(res => console.log(res));
    promise = promise.then(res =>
            res.data
        );
    return(promise);
};

export default FindActorById;