import axios from 'axios'
import {ConfigService} from './config.service';
import {localStorageKeys} from "../core/models/localStorageKeys";

export class MicroserviceService {
    static getMicroservice(id) {
        return axios.get(ConfigService.URLS.GET_MICROSERVICE + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`
            }
        })
    }

    static createMicroservice(data) {
        return axios.post(ConfigService.URLS.CREATE_MICROSERVICE, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
            }
        })
    }

    static removeMicroservice(id) {
        return axios.delete(ConfigService.URLS.REMOVE_MICROSERVICE + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
            }
        })
    }
}
