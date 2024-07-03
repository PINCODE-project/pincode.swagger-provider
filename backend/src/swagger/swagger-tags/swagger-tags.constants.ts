import {SwaggerTag} from './swagger-tags.interface';

export const _SWAGGER_TAGS: SwaggerTag[] = [
    {
        name: 'auth',
        description: 'Эндпоинты для авторизации',
    },
    {
        name: 'user',
        description: 'Эндпоинты для работы с данными пользователя',
    },
    {
        name: 'project',
        description: 'Эндпоинты для работы с проектами'
    },
    {
        name: 'microservice',
        description: 'Эндпоинты для работы с микросервисами'
    },
];
