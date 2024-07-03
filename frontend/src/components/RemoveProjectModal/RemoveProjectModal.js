import {Button, Group, Modal, Text} from '@mantine/core';
import styles from './RemoveProjectModal.module.css';
import React, {useCallback} from 'react';
import {HttpStatusCode} from 'axios';
import {notifications} from '@mantine/notifications';
import {useQueryClient} from '@tanstack/react-query';
import {useRemoveProject} from "../../hooks/useRemoveProject";

export function RemoveProjectModal(props) {
    const queryClient = useQueryClient()

    const onErrorRemoveProject = (error) => {

    }

    const onSuccessRemoveProject = (data) => {
        notifications.show({
            title: 'Продукт успешно удалён!',
            color: 'green'
        })
        queryClient.invalidateQueries('getProjects')
        props.close()
    }

    const removeProject = useRemoveProject(onSuccessRemoveProject, onErrorRemoveProject)

    const removeProjectHandler = useCallback((values) => {
        removeProject.mutate(props.project.id)
    }, [props.project])

    if (!props.project)
        return;

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title='Удаление проекта'
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{content: styles.modal}}
        >
            <Text>
                Вы уверены, что хотите удалить проект "{props.project.name}"?
            </Text>
            <Group mt='xl' justify='end'>
                <Button
                    radius='md'
                    variant="default"
                    disabled={removeProject.isPending}
                    onClick={() => props.close()}
                >
                    Отмена
                </Button>

                <Button
                    type='submit'
                    radius='md'
                    color='red'
                    disabled={removeProject.isPending}
                    onClick={removeProjectHandler}
                >
                    Удалить проект
                </Button>

            </Group>
        </Modal>
    );
}
