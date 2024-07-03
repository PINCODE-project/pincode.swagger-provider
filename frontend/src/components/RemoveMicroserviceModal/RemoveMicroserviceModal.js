import {Button, Group, Modal, Text} from '@mantine/core';
import styles from './RemoveMicroserviceModal.module.css';
import React, {useCallback} from 'react';
import {HttpStatusCode} from 'axios';
import {notifications} from '@mantine/notifications';
import {useQueryClient} from '@tanstack/react-query';
import {useRemoveProject} from "../../hooks/useRemoveProject";
import {useRemoveMicroservice} from "../../hooks/useRemoveMicroservice";
import {useNavigate} from "react-router-dom";

export function RemoveMicroserviceModal(props) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onErrorRemoveMicroservice = (error) => {

    }

    const onSuccessRemoveMicroservice = (data) => {
        notifications.show({
            title: 'Микросервис успешно удалён!',
            color: 'green'
        });
        queryClient.invalidateQueries('getProjects');
        props.close();
        navigate("/");
    }

    const removeMicroservice = useRemoveMicroservice(onSuccessRemoveMicroservice, onErrorRemoveMicroservice)

    const removeMicroserviceHandler = useCallback((values) => {
        removeMicroservice.mutate(props.microservice.id)
    }, [props.microservice])

    if (!props.microservice)
        return;

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title='Удаление микросервиса'
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{content: styles.modal}}
        >
            <Text>
                Вы уверены, что хотите удалить микросервис "{props.microservice.name}"?
            </Text>
            <Group mt='xl' justify='end'>
                <Button
                    radius='md'
                    variant="default"
                    disabled={removeMicroservice.isPending}
                    onClick={() => props.close()}
                >
                    Отмена
                </Button>

                <Button
                    type='submit'
                    radius='md'
                    color='red'
                    disabled={removeMicroservice.isPending}
                    onClick={removeMicroserviceHandler}
                >
                    Удалить микросервис
                </Button>

            </Group>
        </Modal>
    );
}
