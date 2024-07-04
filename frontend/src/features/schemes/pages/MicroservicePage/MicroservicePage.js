import {useMicroservice} from '../../../../hooks/useMicroservice';
import {Center, Loader, Stack, Text, Title} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import SwaggerUI from 'swagger-ui-react';

export function MicroservicePage() {
    const navigate = useNavigate();
    const {id} = useParams()
    const {microservice, isLoading, error, isSuccess} = useMicroservice(id)

    if (isLoading)
        return <Center p='xl'>
            <Loader color='gray'/>
        </Center>

    return (
        <div>
            {
                isSuccess &&
                <SwaggerUI spec={microservice.content}/>
            }
            {
                !isSuccess && error &&
                <Center p='xl'>
                    <Stack
                        align="stretch"
                        justify="center"
                        gap="md"
                    >
                        <Title>Ошибка 😭</Title>
                        <Text>Микросервис не найден!</Text>
                    </Stack>
                </Center>

            }
        </div>
    )
}
