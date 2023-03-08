import { Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
    return (
        <Container maxWidth="lg">
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <NavLink className={styles.navLink} to={"/"}>
                            Without sort
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.navLink} to={"/sort"}>
                            With sort
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </Container>
    );
}
