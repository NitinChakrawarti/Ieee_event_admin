import React from "react";
import Admin from "./components/admin";
import Login from "./components/login";

const EventAdmin = () => {
    const [isLogin, setIslogin] = React.useState(true);

    return (
        <>
            {
                isLogin ? <Admin /> : <Login />
            }
        </>
    )
}

export default EventAdmin;