import { Typography } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { useState } from "react";
import { Column, Order, useUserStore } from "../../stores/userStore";
import { grey } from "@mui/material/colors";

const getOrder = (order?: Order) => {
    return order === undefined ? "asc" : order === "asc" ? "desc" : undefined;
};

export interface ILabelWithSortProps {
    label: string;
    column: Column;
    sort?: boolean;
}

export default function LabelWithSort(props: ILabelWithSortProps) {
    const { label, column, sort } = props;
    const { sortBy, updateUserStore } = useUserStore();
    const [order, setOrder] = useState<Order | undefined>(() => {
        if (sortBy?.field === column && sortBy?.order) {
            return sortBy.order;
        }
        return undefined;
    });
    return (
        <Typography display="flex" alignItems="center" sx={{ gap: ".4rem" }}>
            {label}{" "}
            {sort && (
                <ArrowUpward
                    sx={{
                        color:
                            sortBy?.field === column && sortBy.order
                                ? "inherit"
                                : grey[400],
                        cursor: "pointer",
                        rotate:
                            sortBy?.field === column && sortBy?.order === "asc"
                                ? "0"
                                : "180deg",
                        transition: "all .3s ease",
                    }}
                    onClick={() => {
                        updateUserStore("sortBy", {
                            field: column,
                            order: getOrder(order),
                        });
                        setOrder((order) => getOrder(order));
                        updateUserStore("page", 0);
                    }}
                />
            )}
        </Typography>
    );
}
