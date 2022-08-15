import {axiosService} from './axios.service';
import {urls} from '../configs';

const userService = {
    getAll: () => axiosService.get(urls.users),
    createUser: ({name, color}) => axiosService.post(urls.users, {name, color})
};

export {
    userService
};