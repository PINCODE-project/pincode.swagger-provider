import {useMicroservice} from '../../../../hooks/useMicroservice';
import {Center, Loader} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import SwaggerUI from 'swagger-ui-react';

export function MicroservicePage() {
    const navigate = useNavigate();
    const {id} = useParams()
    const {microservice, isLoading} = useMicroservice(id)

    if (isLoading)
        return <Center>
            <Loader color='gray'/>
        </Center>

    return (
        <div>
            <SwaggerUI spec={microservice.content}/>
        </div>
    )
}
