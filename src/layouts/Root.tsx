import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export interface IRootLayoutProps {}

export default function RootLayout(props: IRootLayoutProps) {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}
