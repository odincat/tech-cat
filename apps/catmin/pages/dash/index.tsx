import { UserContext } from "@lib/context";
import { useContext } from "react";
import Navbar from '@components/Navbar';
import AdminShell from "@components/auth/AdminShell";

const Dashboard = () => {
    const { userObject, roles } = useContext(UserContext);

    return(
        <AdminShell>
            <div>
                {roles?.admin && <div> {userObject?.name}</div> }
                Hi
            </div>
        </AdminShell>
    );
};

export default Dashboard;