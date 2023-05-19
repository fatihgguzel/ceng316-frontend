import React, { useContext } from "react";
import { UserContext } from "../../Providers/context";

export default function MainPage(){
    const {user} = useContext(UserContext);

    return (
        <div>
            {user.email}
            <br />
            {user.password}
            <br />
            {user.role}
        </div>
    )
}