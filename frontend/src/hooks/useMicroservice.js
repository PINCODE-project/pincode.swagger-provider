import {useQuery} from "@tanstack/react-query";
import {MicroserviceService} from "../services/microservice.service";

export function useMicroservice(id, onError) {
    const {data, isLoading, error, isSuccess} = useQuery({
        queryKey: ['getMicroservice', id],
        queryFn: () => MicroserviceService.getMicroservice(id),
        select: data => data.data,
        onError
    })

    return {microservice: data, isLoading, error, isSuccess}
}
