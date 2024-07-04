import {useMutation} from "@tanstack/react-query";
import {MicroserviceService} from "../services/microservice.service";

export function useRemoveMicroservice(onSuccess, onError) {
    const {mutate, isPending, error} = useMutation({
        mutationKey: ['removeMicroservice'],
        mutationFn: (id) => MicroserviceService.removeMicroservice(id),
        select: data => data.data,
        onError: (error) => onError(error.response),
        onSuccess: (response) => {
            onSuccess(response.data)
        }
    })

    return {mutate, isPending, error}
}
