import { useQuery } from "@tanstack/react-query"


export const useCreateAuction = () => {
    return useQuery({
        queryKey: [key]
    })
}