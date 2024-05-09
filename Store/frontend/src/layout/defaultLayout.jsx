import { Outlet } from "react-router-dom";
import { NavBar } from "../pages/navBar/navBar";

export function DefaultLayout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}