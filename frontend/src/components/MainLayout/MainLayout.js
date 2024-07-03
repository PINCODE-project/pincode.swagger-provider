import {AppShell} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Navbar} from '../NavBar/Navbar';
import {Outlet} from 'react-router-dom';
import {NewProjectModal} from "../NewProjectModal/NewProjectModal";
import {RemoveProjectModal} from "../RemoveProjectModal/RemoveProjectModal";
import {useState} from "react";
import {NewMicroserviceModal} from "../NewMicroserviceModal/NewMicroserviceModal";
import {RemoveMicroserviceModal} from "../RemoveMicroserviceModal/RemoveMicroserviceModal";

export function MainLayout() {
    const [openedNavbar, {toggle}] = useDisclosure();
    const [openedNewProjectModal, { open: openNewProjectModal, close: closeNewProjectModal }] = useDisclosure(false);
    const [openedNewMicroserviceModal, { open: openNewMicroserviceModal, close: closeNewMicroserviceModal }] = useDisclosure(false);
    const [openedRemoveProjectModal, { open: openRemoveProjectModal, close: closeRemoveProjectModal }] = useDisclosure(false);
    const [openedRemoveMicroserviceModal, { open: openRemoveMicroserviceModal, close: closeRemoveMicroserviceModal }] = useDisclosure(false);
    const [removeProject, setRemoveProject] = useState({})
    const [removeMicroservice, setRemoveMicroservice] = useState({})
    const [createMicroserviceProjectId, setCreateMicroserviceProjectId] = useState()

    return (
        <AppShell
            navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !openedNavbar}}}
        >
            <AppShell.Navbar>
                <Navbar
                    openNewProjectModal={openNewProjectModal}
                    closeNewProjectModal={closeNewProjectModal}
                    setRemoveProject={setRemoveProject}
                    setRemoveMicroservice={setRemoveMicroservice}
                    openRemoveProjectModal={openRemoveProjectModal}
                    openRemoveMicroserviceModal={openRemoveMicroserviceModal}
                    openNewMicroserviceModal={openNewMicroserviceModal}
                    setCreateMicroserviceProjectId={setCreateMicroserviceProjectId}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
            <NewProjectModal opened={openedNewProjectModal} close={closeNewProjectModal}/>
            <NewMicroserviceModal projectId={createMicroserviceProjectId} opened={openedNewMicroserviceModal} close={closeNewMicroserviceModal}/>
            <RemoveProjectModal opened={openedRemoveProjectModal} close={closeRemoveProjectModal} project={removeProject}/>
            <RemoveMicroserviceModal opened={openedRemoveMicroserviceModal} close={closeRemoveMicroserviceModal} microservice={removeMicroservice}/>
        </AppShell>
    );
}
