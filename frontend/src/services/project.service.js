import axios from 'axios'
import {ConfigService} from "./config.service";
import {localStorageKeys} from "../core/models/localStorageKeys";

export class ProjectService {
    static getProjects() {
        return axios.get(ConfigService.URLS.GET_PROJECTS, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
            }
        })
    }

    static createProject(data) {
        return axios.post(ConfigService.URLS.CREATE_PROJECT, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
            }
        })
    }

    static removeProject(id) {
        return axios.delete(ConfigService.URLS.REMOVE_PROJECT + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
            }
        })
    }
}
