import {useMutation} from "@tanstack/react-query";
import {AuthService} from "../services/auth.service";
import {localStorageKeys} from "../core/models/localStorageKeys";
import {ProjectService} from "../services/project.service";

export function useCreateProject(onSuccess, onError) {
    const {data, mutate, isPending, error} = useMutation({
        mutationKey: ['createProject'],
        mutationFn: (values) => ProjectService.createProject(values),
        select: data => data.data,
        onError: (error) => onError(error.response),
        onSuccess: (response) => {
            onSuccess(response.data)
        }
    })

    return {projectId: data, mutate, isPending, error}
}
