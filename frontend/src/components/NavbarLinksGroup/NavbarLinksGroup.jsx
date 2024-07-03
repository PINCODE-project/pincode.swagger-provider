import {useState} from 'react';
import {Box, Collapse, Group, Menu, rem, UnstyledButton} from '@mantine/core';
import styles from './NavbarLinksGroup.module.css';
import {IconPencil, IconPlus, IconTrash} from '@tabler/icons-react'
import {useClickOutside, useDisclosure} from '@mantine/hooks';
import {NavbarMicroserviceLinks} from './NavbarMicroserviceLink';

export function LinksGroup({
                               id,
                               emoji,
                               label,
                               initiallyOpened,
                               links,
                               setRemoveProject,
                               openRemoveProjectModal,
                               openRemoveMicroserviceModal,
                               openNewMicroserviceModal,
                               setCreateMicroserviceProjectId,
                               setRemoveMicroservice
                           }) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const [openedProjectMenu, {open: openProjectMenu, close: closeProjectMenu}] = useDisclosure(false)

    const projectMenuRef = useClickOutside(() => closeProjectMenu());

    const items = (hasLinks ? links : []).map((link) => (
        <NavbarMicroserviceLinks link={link} setRemoveMicroservice={setRemoveMicroservice} openRemoveMicroserviceModal={openRemoveMicroserviceModal}/>
    ));

    return (
        <>
            <Menu opened={openedProjectMenu} closeOnClickOutside={true}>
                <Menu.Target>
                    <UnstyledButton onClick={() => setOpened((o) => !o)} className={styles.control}>
                        <Group gap={0} className={styles.project} onContextMenu={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            openProjectMenu()
                        }}>
                            <span style={{fontSize: rem(16)}}>{emoji}</span>{' '}
                            <Box ml="md">{label}</Box>
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown ref={projectMenuRef}>
                    {/*<Menu.Item*/}
                    {/*    leftSection={<IconPencil style={{width: rem(14), height: rem(14)}}/>}*/}
                    {/*>*/}
                    {/*    Редактировать проект*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item
                        onClick={() => {
                            closeProjectMenu()
                            setCreateMicroserviceProjectId(id)
                            openNewMicroserviceModal()
                        }}
                        leftSection={<IconPlus style={{width: rem(14), height: rem(14)}}/>}
                    >
                        Добавить микросервис
                    </Menu.Item>
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
                        onClick={() => {
                            closeProjectMenu()
                            setRemoveProject({id: id, name: label})
                            openRemoveProjectModal()
                        }}
                    >
                        Удалить проект
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
