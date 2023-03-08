import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../apis/user";
import UserTable from "../../components/UserTable";
import { useUserStore } from "../../stores/userStore";

export interface IUserManagementPageProps {}

export default function UserManagementPage(props: IUserManagementPageProps) {
    const { page, results } = useUserStore();
    const userQuery = useQuery({
        queryKey: ["users", page, results],
        queryFn: () => getUsers({ page, results }),
        staleTime: Infinity,
    });
    const { data, isLoading, isError } = userQuery;

    if (isError) {
        return <div>Error...</div>;
    }

    return <UserTable users={data?.results} isLoading={isLoading} />;
}
