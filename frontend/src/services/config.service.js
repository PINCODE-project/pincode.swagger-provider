export class ConfigService {
    static HOST = 'http://localhost:5000'
    static API = `${this.HOST}/api`
    static STATIC = `${this.API}/static`

    static URLS = {
        LOGIN: `${this.API}/auth/login`,
        IS_VALID_TOKEN: `${this.API}/auth/profile`,
        GET_PROFILE: `${this.API}/user/`,
        GET_PROJECTS: `${this.API}/project`,
        CREATE_PROJECT: `${this.API}/project`,
        REMOVE_PROJECT: `${this.API}/project/`,
        GET_MICROSERVICE: `${this.API}/microservice/`,
        REMOVE_MICROSERVICE: `${this.API}/microservice/`,
        CREATE_MICROSERVICE: `${this.API}/microservice`,
    }
}
