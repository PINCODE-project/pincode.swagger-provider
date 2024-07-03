import {Button, Modal, Textarea, TextInput} from '@mantine/core';
import styles from './NewProjectModal.module.css';
import React, {useCallback} from 'react';
import {useField, useForm} from '@mantine/form';
import {HttpStatusCode} from 'axios';
import {notifications} from '@mantine/notifications';
import {EmojiPicker} from '../EmojiPicker/EmojiPicker';
import {useCreateProject} from '../../hooks/useCreateProject';
import {useQueryClient} from '@tanstack/react-query';

export function NewProjectModal(props) {
    const queryClient = useQueryClient()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
        },
    });
    const emojiField = useField({
        initialValue: '🌸'
    });

    const onErrorCreateProject = (error) => {
        if (error.status === HttpStatusCode.Unauthorized) {
            form.setErrors({
                login: 'Неверные данные',
                password: 'Неверные данные'
            });
            notifications.show({
                title: 'Неверный логин или пароль!',
                color: 'red'
            })
        }
    }

    const onSuccessCreateProject = (data) => {
        notifications.show({
            title: 'Продукт успешно создан!',
            color: 'green'
        })
        queryClient.invalidateQueries('getProjects')
        props.close()
    }

    const createProject = useCreateProject(onSuccessCreateProject, onErrorCreateProject)

    const createProjectHandler = useCallback((values) => {
        createProject.mutate({
            emoji: emojiField.getValue(),
            name: values.name,
            description: values.description
        })
    }, [])

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title='Новый проект'
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{content: styles.modal}}
        >
            <form onSubmit={form.onSubmit(createProjectHandler)}>
                <TextInput
                    label='Название'
                    placeholder='Изучение РЖЯ'
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    leftSection={<EmojiPicker field={emojiField}/>}
                    required
                    autoFocus
                    radius='md'
                    disabled={createProject.isPending}
                />
                <Textarea
                    label='Описание'
                    placeholder='API сервиса для...'
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                    autosize
                    minRows={2}
                    maxRows={4}
                    required
                    radius='md'
                    mt='md'
                    disabled={createProject.isPending}
                />
                <Button
                    type='submit'
                    fullWidth mt='xl'
                    radius='md'
                    disabled={createProject.isPending}
                >
                    Создать проект
                </Button>
            </form>
        </Modal>
    );
}
