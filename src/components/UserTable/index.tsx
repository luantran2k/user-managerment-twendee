import {
    Container,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import User from "../../interfaces/User";
import { useUserStore } from "../../stores/userStore";
import LabelWithSort from "../LabelWithSort";
import RowSkeleton from "../TableSkeleton";

export type UserDisplay = Pick<User, "id" | "name" | "picture" | "login">;
export interface IUserTableProps {
    isLoading?: boolean;
    users?: UserDisplay[];
    sort?: boolean;
}

export default function UserTable(props: IUserTableProps) {
    const { users, isLoading, sort } = props;
    const { page, results, updateUserStore } = useUserStore();
    const handleChangePage = (event: unknown, newPage: number) => {
        updateUserStore("page", newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateUserStore("results", parseInt(event.target.value, 10));
        updateUserStore("page", 0);
    };
    return (
        <Container
            maxWidth="lg"
            sx={{ marginTop: "2rem", marginBottom: "4rem" }}
        >
            <Typography
                variant="h1"
                fontSize="1.6rem"
                textTransform="uppercase"
                marginBottom="1rem"
            >
                User management
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead
                        sx={{ th: { fontWeight: "bold", bgcolor: grey[100] } }}
                    >
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <LabelWithSort
                                    label={"Full Name"}
                                    column={"full-name"}
                                    sort={sort}
                                />
                            </TableCell>
                            <TableCell>
                                {" "}
                                <LabelWithSort
                                    label={"Username"}
                                    column={"username"}
                                    sort={sort}
                                />
                            </TableCell>
                            <TableCell>Thumbnail </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <RowSkeleton
                                numberOfColumns={4}
                                numberOfRows={results}
                                sx={{ padding: "1rem 0" }}
                            />
                        ) : (
                            users?.map((user, index) => (
                                <TableRow key={user.login.uuid}>
                                    <TableCell align="center" padding="none">
                                        {page * results + index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {user.name.title}. {user.name.first}{" "}
                                        {user.name.last}
                                    </TableCell>
                                    <TableCell>{user.login.username}</TableCell>
                                    <TableCell
                                        sx={{
                                            img: {
                                                borderRadius: "50%",
                                            },
                                        }}
                                    >
                                        <img
                                            src={user.picture.thumbnail}
                                            alt=""
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={100}
                rowsPerPage={results}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
}
