import {useMutation} from "@tanstack/react-query";
import {MicroserviceService} from "../services/microservice.service";

export function useCreateMicroservice(onSuccess, onError) {
    const {data, mutate, isPending, error} = useMutation({
        mutationKey: ['createMicroservice'],
        mutationFn: (values) => MicroserviceService.createMicroservice(values),
        select: data => data.data,
        onError: (error) => onError(error.response),
        onSuccess: (response) => {
            onSuccess(response.data)
        }
    })

    return {microserviceId: data, mutate, isPending, error}
}
