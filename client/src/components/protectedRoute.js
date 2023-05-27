import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import DefaultDesign from "./defaultDesign";


function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const navigation = useNavigate();

    const validationToken = async () => {
       try {
        dispatch(ShowLoading());
        const response = await axios.post("/api/users/get-user-by-id", {}, 
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(HideLoading());
        if(response.data.success) {
            dispatch(SetUser(response.data.data));
        } 
        else {
            localStorage.removeItem("token");
            message.error(response.data.message);
            navigation("/login");
        }
       } catch (error) {
            dispatch(HideLoading());
            localStorage.removeItem("token");
            message.error(error.message);
            navigation("/login");
       }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validationToken();
        } else {
            navigation("/login");
        }
    }, []);

    return <div>{user && <DefaultDesign>{children}</DefaultDesign>}</div>;
      
  }
  
export default ProtectedRoute;