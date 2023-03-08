import { Skeleton, SxProps, TableCell, TableRow, Theme } from "@mui/material";
import { getEmptyArray } from "../../helpers/utils";

export interface IRowSkeletonProps {
    numberOfColumns: number;
    numberOfRows: number;
    sx?: SxProps<Theme>;
}

export default function RowSkeleton(props: IRowSkeletonProps) {
    const { numberOfColumns, numberOfRows, sx } = props;
    const rowArray = getEmptyArray(numberOfRows);
    const columnArray = getEmptyArray(numberOfColumns);

    return (
        <>
            {rowArray?.map((item, index) => (
                <TableRow key={index}>
                    {columnArray?.map((item, index) => (
                        <TableCell key={index}>
                            <Skeleton sx={sx} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
