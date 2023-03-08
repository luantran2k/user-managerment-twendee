import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../apis/user";
import UserTable from "../../components/UserTable";
import { compareStrings } from "../../helpers/utils";
import IUser from "../../interfaces/User";
import { IUserFilter, useUserStore } from "../../stores/userStore";

export interface IUserManagementWithSortProps {}

const getUsersByFilter = (users: IUser[], filter: IUserFilter) => {
    let newUsers: IUser[] = structuredClone(users);
    if (filter.sortBy?.field === "full-name" && filter.sortBy?.order) {
        newUsers = newUsers.sort((user1, user2) => {
            const compareFirstName = compareStrings(
                user1.name.first,
                user2.name.first,
                filter.sortBy?.order
            );
            if (compareFirstName !== 0) return compareFirstName;
            const compareLastName = compareStrings(
                user1.name.last,
                user2.name.last,
                filter.sortBy?.order
            );
            if (compareLastName !== 0) return compareLastName;
            return compareStrings(
                user1.name.title,
                user2.name.title,
                filter.sortBy?.order
            );
        });
    } else if (filter.sortBy?.field === "username" && filter.sortBy?.order) {
        newUsers = newUsers.sort((user1, user2) => {
            return compareStrings(
                user1.login.username,
                user2.login.username,
                filter.sortBy?.order
            );
        });
    }
    return newUsers.filter((user, index) => {
        return (
            index >= filter.page * filter.results &&
            index < (filter.page + 1) * filter.results
        );
    });
};

export default function UserManagementWithSort(
    props: IUserManagementWithSortProps
) {
    const { page, results, sortBy } = useUserStore();
    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers({ page: 0, results: 100 }),
        staleTime: Infinity,
    });
    const { data, isError, isLoading } = usersQuery;

    if (isLoading) {
        return <UserTable users={[]} isLoading={true} sort={true} />;
    }
    if (isError) {
        return <Typography color={"red"}>Error</Typography>;
    }
    const users = getUsersByFilter(data.results, { page, results, sortBy });
    return <UserTable users={users} isLoading={false} sort={true} />;
}
