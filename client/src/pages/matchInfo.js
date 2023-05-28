import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { axiosInstance } from '../helpFunction/axiosInstances';
import { useNavigate, useParams } from "react-router-dom";
import { GetMatchById } from "../apiHelper/matches";
import { DeleteRegistration } from "../apiHelper/registrate";
import { message, Row, Col} from 'antd';
import { makeDate } from "../../src/helpFunction/dateFormat";

function MatchInfo() {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [match, setMatch] = useState();
    const { id } = useParams();
    const { user } = useSelector((state) => state.users);

    const getMatchData = async () => {
        try {
          dispatch(ShowLoading(true));
          const response = await GetMatchById(id);
          setMatch(response.data);
          dispatch(HideLoading(false));
        } catch (error) {
          dispatch(HideLoading(false));
          message.error(error.message);
        }
      };

    const registrateUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axiosInstance.post("/api/registration/", {
                match: match?._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                navigation("/profile");
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const deleteUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteRegistration({match: match?._id});
            message.success(response.message);
            navigation("/")
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getMatchData();
    }, []);

    const isRegistered = match?.registeredUsers.find(userObj => userObj._id.toString() === user?._id.toString()) !== undefined;

    return (
        <div>
        {match && ( 
          <Row className="mt-3" gutter={[30, 30]}>
            <Col lg={24} xs={24} sm={24}>
                <div className="flex flex-col gap-2 ">
                    <h1 h1 className="text-small">
                    Організатор: {match?.createdBy.login}
                    </h1>
                    <p className="text-small">
                        Адреса проведення: {match?.place}
                    </p>
                    <p className="text-small">
                        Дата проведення: {makeDate(match?.date)}
                    </p>
                    <p className="text-small">
                        Час проведення: {match?.time}
                    </p>
                    <p className="text-small">
                        Кількість зареєстрованих на матч користувачів: {match?.registeredUsers.length ?  match?.registeredUsers.length : 0}/{match?.partisipants}
                    </p>
                    <p className="text-small">
                        {'Зареєстровані на матч користувачі: ' + match?.registeredUsers.map((user) => {return (" "+user?.login)})}                
                    </p>
                    <p className="text-small">
                        Контактні дані організатора: {match?.contacts}
                    </p>
                    <p className="text-small">
                        Опис: {match?.description}
                    </p>
                    </div>
                <hr />
                { match?.createdBy._id === user._id ? '' :
                    isRegistered ? (
                    <div>
                        <button className="third-btn" onClick={() => deleteUser()}>Скасувати реєстрацію</button>
                    </div>
                    ) 
                    :
                    (
                        <div>
                            <button className='secondary-btn'  onClick={() => registrateUser()}>Зареєструватися</button>
                        </div>
                    )
                }

  
            </Col>
          </Row>
        )}
      </div>
    )
}

export default MatchInfo;