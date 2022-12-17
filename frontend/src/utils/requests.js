import axios from 'axios';

export default class Request {
    constructor() {
        const tokens = localStorage.getItem('token');
        console.log(tokens);
        this.request = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: { token: tokens },
        });
    }
    Get(path = '', values = [], handleFun) {
        this.request
            .get(path, values)
            .then((res) => {
                handleFun(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    Post(path = '', values = [], handleFun) {
        this.request
            .post(path,values)
            .then((res) => {
                handleFun(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    Put(path = '', values = [], handleFun) {
        this.request
            .put(path, values)
            .then((res) => {
                handleFun(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    Delete(path = '', handleFun) {
        this.request
            .delete(path)
            .then((res) => {
                handleFun(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
