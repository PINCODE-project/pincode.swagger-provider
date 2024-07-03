import {Card, Center, Container, Loader, Text, SimpleGrid, Title, Group} from '@mantine/core';
import {useUser} from "../../../../hooks/useUser";
import {notifications} from "@mantine/notifications";
import {useProjects} from "../../../../hooks/useProjects";
import styles from "./ProjectsPage.module.css"

export function ProjectsPage() {
    const onErrorGetProjects = () => {
        notifications.show({
            color: 'red',
            title: 'Ошибка при загрузке проектов!',
        })
    }

    const {projects, isLoading: isLoadingProjects} = useProjects(onErrorGetProjects)
    const {user, isLoading: isLoadingUser} = useUser()

    if (isLoadingProjects || isLoadingUser)
        return <Center>
            <Loader color='gray'/>
        </Center>

    return (
        <div className={styles.projectsPage}>
            <Container size="xl" m='md' gap='20px'>
                <Title ta='center'>
                    {user.firstName}, рады вас видеть! 😀
                </Title>
                <SimpleGrid cols={4}>
                    {projects.map(project => {
                        return <Card
                            shadow="sm"
                            padding="md"
                        >
                            <Group>
                                <Title>{project.emoji}</Title>

                                <Text fw={500} size="lg">
                                    {project.name}
                                </Text>
                            </Group>


                            <Text mt="xs" c="dimmed" size="sm">
                                {project.description}
                            </Text>
                        </Card>
                    })}
                </SimpleGrid>
            </Container>
        </div>
    )
}
