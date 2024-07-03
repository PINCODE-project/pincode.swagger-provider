import styles from "./NavbarLinksGroup.module.css";
import {Group, Menu, rem, Text} from "@mantine/core";
import {IconLetterCase, IconLink, IconPencil, IconTrash} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useClickOutside, useDisclosure} from "@mantine/hooks";

export function NavbarMicroserviceLinks(props) {
    const microserviceMenuRef = useClickOutside(() => closeMicroserviceMenu());

    const [openedMicroserviceMenu, {open: openMicroserviceMenu, close: closeMicroserviceMenu}] = useDisclosure(false)

    return (
        <Menu opened={openedMicroserviceMenu} closeOnClickOutside={true}>
            <Menu.Target>
                <Link
                    className={styles.link}
                    to={`/scheme/${props.link.href}`}
                    key={`microserviceLink${props.link.label}`}
                    onContextMenu={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        openMicroserviceMenu()
                    }}
                >
                    <Group gap={0} justify="space-between">
                        <Text truncate="end" wrap="nowrap" w={'calc(100% - 40px)'}>
                            {props.link.label}
                        </Text>

                        {
                            props.link.type === 'url' &&
                            <IconLink style={{width: '18px', height: '18px'}} stroke={1.5}/>
                        }
                        {
                            props.link.type === 'scheme' &&
                            <IconLetterCase style={{width: '18px', height: '18px'}} stroke={1.5}/>
                        }
                    </Group>
                </Link>
            </Menu.Target>
            <Menu.Dropdown ref={microserviceMenuRef}>
                {/*<Menu.Item*/}
                {/*    leftSection={<IconPencil style={{width: rem(14), height: rem(14)}}/>}*/}
                {/*>*/}
                {/*    Редактировать микросервис*/}
                {/*</Menu.Item>*/}
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
                    onClick={() => {
                        closeMicroserviceMenu()
                        props.setRemoveMicroservice({id: props.link.id, name: props.link.label})
                        props.openRemoveMicroserviceModal()
                    }}
                >
                    Удалить микросервис
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
