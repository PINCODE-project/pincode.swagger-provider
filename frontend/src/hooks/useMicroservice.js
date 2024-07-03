import {useMutation, useQuery} from "@tanstack/react-query";
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project.service";
import {MicroserviceService} from "../services/microservice.service";

export function useMicroservice(id, onError) {
    const {data, isLoading} = useQuery({
        queryKey: ['getMicroservice', id],
        queryFn: () => MicroserviceService.getMicroservice(id),
        select: data => data.data,
        onError
    })

    return {microservice: data, isLoading}
}
