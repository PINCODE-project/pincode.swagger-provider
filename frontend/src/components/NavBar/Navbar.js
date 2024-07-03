import {ActionIcon, Center, Group, Loader, Stack, Text, Tooltip} from '@mantine/core';
import {UserButton} from '../UserButton/UserButton';
import styles from './Navbar.module.css';
import {useProjects} from '../../hooks/useProjects';
import {notifications} from '@mantine/notifications';
import {LinksGroup} from '../NavbarLinksGroup/NavbarLinksGroup';
import Logo from '../../assets/images/Logo.svg'
import clsx from 'clsx';
import {useUser} from '../../hooks/useUser';
import {useNavigate} from 'react-router-dom';
import {IconPlus} from '@tabler/icons-react'

export function Navbar(props) {
    const navigate = useNavigate()

    const onErrorGetProjects = () => {
        notifications.show({
            color: 'red',
            title: 'Ошибка при загрузке проектов!',
        })
    }

    const {projects, isLoading: isLoadingProjects} = useProjects(onErrorGetProjects)
    const {user, isLoading: isLoadingUser} = useUser()

    return (
        <nav className={styles.navbar}>
            <div className={clsx(styles.section, styles.logo)} onClick={() => navigate('/')}>
                <img src={Logo} alt='Logo'/>
            </div>

            <Stack
                align="stretch"
                justify="space-between"
                className={styles.stack}
                gap={0}
            >
                <div className={clsx(styles.section, styles.projectsContainer)}>
                    <Group className={styles.collectionsHeader} justify='space-between'>
                        <Text size="xs" fw={500} c='dimmed'>
                            Проекты
                        </Text>
                        <Tooltip label='Новый проект' withArrow position='right'>
                            <ActionIcon variant='default' size={18} onClick={props.openNewProjectModal}>
                                <IconPlus/>
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <div className={styles.collections}>
                        {
                            isLoadingProjects &&
                            <Center>
                                <Loader color='gray' size='sm'/>
                            </Center>
                        }
                        {
                            !isLoadingProjects && projects.length === 0 &&
                            <Text ta='center' c='dimmed'>Нет проектов!</Text>
                        }
                        {
                            !isLoadingProjects && projects.length > 0 &&
                            projects.map((project) => (
                                <LinksGroup
                                    id={project.id}
                                    emoji={project.emoji}
                                    label={project.name}
                                    setRemoveProject={props.setRemoveProject}
                                    setRemoveMicroservice={props.setRemoveMicroservice}
                                    openRemoveProjectModal={props.openRemoveProjectModal}
                                    openRemoveMicroserviceModal={props.openRemoveMicroserviceModal}
                                    openNewMicroserviceModal={props.openNewMicroserviceModal}
                                    setCreateMicroserviceProjectId={props.setCreateMicroserviceProjectId}
                                    links={project.microservices.map(microservice => ({
                                        id: microservice.id,
                                        label: microservice.name,
                                        href: microservice.id,
                                        type: microservice.type
                                    }))}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.section}>
                    {
                        isLoadingUser &&
                        <Center>
                            <Loader color='gray'/>
                        </Center>
                    }
                    {
                        !isLoadingUser &&
                        <UserButton user={user}/>
                    }
                </div>
            </Stack>
        </nav>
    );
}
