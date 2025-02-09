import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const Context = createContext();

const ContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userDetails, setUserDetails] = useState(null);
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [groupId, setGroupId] = useState("")

    const [user2Email, setUser2Email] = useState("");
    const [user3Email, setUser3Email] = useState("");
    const [user4Email, setUser4Email] = useState("");
    const [user5Email, setUser5Email] = useState("");

    const getUserDetail = async (token) => {
        try {
            console.log("Fetching user details"); 

            const response = await axios.post(
                `${backendUrl}/api/user/getProfileInformation`,
                { token },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("API Response:", response.data);

            if (response.data.success) {
                setUserDetails(response.data.profile);
                console.log("Updated userDetails:", response.data.profile);
                return response.data.profile;
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            toast.error(error.message);
            return null;
        }
    };

    useEffect(() => {
        if (token) {
            getUserDetail(token).then((data) => {
                console.log("Fetched user details:", data);
            });
        }
    }, [token]);

    const value = {
        backendUrl,
        token,
        setToken,
        userDetails,
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        user2Email,
        setUser2Email,
        user3Email,
        setUser3Email,
        user4Email,
        setUser4Email,
        user5Email,
        setUser5Email,
        groupId,
        setGroupId
    };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;
