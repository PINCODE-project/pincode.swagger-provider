import {Button, Modal, Select, Textarea, TextInput} from '@mantine/core';
import styles from './NewMicroserviceModal.module.css';
import React, {useCallback} from 'react';
import {useForm} from '@mantine/form';
import {notifications} from '@mantine/notifications';
import {useQueryClient} from '@tanstack/react-query';
import {useCreateMicroservice} from "../../hooks/useCreateMicroservice";

export function NewMicroserviceModal(props) {
    const queryClient = useQueryClient()

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            type: 'url',
            content: '',
        },
    });

    const onErrorCreateMicroservice = (error) => {

    }

    const onSuccessCreateMicroservice = (data) => {
        notifications.show({
            title: 'Микросервис успешно добавлен!',
            color: 'green'
        })
        queryClient.invalidateQueries('getProjects')
        props.close()
    }

    const createMicroservice = useCreateMicroservice(onSuccessCreateMicroservice, onErrorCreateMicroservice)

    const createMicroserviceHandler = useCallback((values) => {
        console.log(values, props.projectId)
        createMicroservice.mutate({
            projectId: props.projectId,
            name: values.name,
            type: values.type,
            content: values.content
        })
    }, [props.projectId])

    if (!props.projectId)
        return;

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title='Добаление микросервиса'
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{content: styles.modal}}
        >
            <form onSubmit={form.onSubmit(createMicroserviceHandler)}>
                <TextInput
                    label='Название'
                    placeholder='SSO'
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    required
                    autoFocus={true}
                    radius='md'
                    disabled={createMicroservice.isPending}
                />
                <Select
                    label="Тип привязки схемы"
                    placeholder="Выберите тип"
                    allowDeselect={false}
                    data={[
                        {value: 'url', label: 'Ссылка'},
                        {value: 'scheme', label: 'Схема'},
                    ]}
                    radius='md'
                    mt='md'
                    key={form.key('type')}
                    {...form.getInputProps('type')}
                    required
                />
                {
                    form.getValues().type === 'url' ?
                        <TextInput
                            label='Ссылка на схему'
                            placeholder='https://pincode-dev.ru/sso/swagger/v1/swagger.yml'
                            key={form.key('content')}
                            {...form.getInputProps('content')}
                            required
                            radius='md'
                            mt='md'
                            disabled={createMicroservice.isPending}
                        />
                        :
                        <Textarea
                            label='Схема'
                            placeholder='openapi: 3.0.0
                                paths:...'
                            key={form.key('content')}
                            {...form.getInputProps('content')}
                            autosize
                            minRows={2}
                            maxRows={4}
                            required
                            radius='md'
                            mt='md'
                            disabled={createMicroservice.isPending}
                        />
                }

                <Button
                    type='submit'
                    fullWidth
                    mt='xl'
                    radius='md'
                    disabled={createMicroservice.isPending}
                >
                    Добавить микросервис
                </Button>
            </form>
        </Modal>
    );
}
