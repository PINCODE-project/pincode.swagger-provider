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
                <SwaggerUI spec={microservice.content} plugins={[
                    (system) => ({
                        wrapComponents: {
                            OperationSummaryPath: (Original, system) => (props) => {
                                return <span style={{display: "flex"}}>
                                    Солнце
                                    <Original {...{
                                        ...props,
                                        specPath: {...props.specPath, _tail: ["paths", "hui", "post"]}
                                    }} />
                                </span>
                            }
                        }
                    }),
                    (system) => ({
                        components: {
                            OperationSummaryMethod: (props) => {
                                console.log('daw', system, 'daw,', props)
                                return <h1>Метод</h1>
                            }
                        }
                    }),
                    (system) => ({
                        components: {
                            JsonSchema_string: (props) => {
                                console.log('daw,', props)
                                return <input style={{border: "5px solid red"}} onInput={e => {
                                    props.onChange(e.target.value, props.keyName)

                                }}/>

                            }
                        }
                    })

                ]}/>
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
