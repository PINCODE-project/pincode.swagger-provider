import {useMutation} from "@tanstack/react-query";
import {AuthService} from "../services/auth.service";
import {localStorageKeys} from "../core/models/localStorageKeys";
import {ProjectService} from "../services/project.service";

export function useRemoveProject(onSuccess, onError) {
    const {data, mutate, isPending, error} = useMutation({
        mutationKey: ['removeProject'],
        mutationFn: (id) => ProjectService.removeProject(id),
        select: data => data.data,
        onError: (error) => onError(error.response),
        onSuccess: (response) => {
            onSuccess(response.data)
        }
    })

    return {mutate, isPending, error}
}
