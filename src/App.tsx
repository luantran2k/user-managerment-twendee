import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import RootLayout from "./layouts/Root";
import UserManagementPage from "./page/UserManagement";
import UserManagementWithSort from "./page/UserManagementWithSort";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<UserManagementPage />}></Route>
                        <Route
                            path="sort"
                            element={<UserManagementWithSort />}
                        ></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
