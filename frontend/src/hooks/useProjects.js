import {useQuery} from "@tanstack/react-query";
import {ProjectService} from "../services/project.service";

export function useProjects(onError) {
    const {data, isLoading} = useQuery({
        queryKey: ['getProjects'],
        queryFn: () => ProjectService.getProjects(),
        select: data => data.data,
        onError
    })

    return {projects: data, isLoading}
}
