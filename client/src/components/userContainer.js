import React from "react";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import "../resources/userContainers.css";


function UserContainer({user}) {
    const navigation = useNavigate();
    return (
      <div className="user-container"
        onClick={() => {
            navigation(`/user/${user._id}`);
        }}>
            <div className="user-content">
                <div className="item">
                    <div className="label">Логін:</div>
                    <div className="value">{user.login}</div>
                </div>
                <div className="item">
                    <div className="label">Ім'я:</div>
                    <div className="value">{user.name}</div>
                </div>
                <div className="item">
                    <div className="label">Рейтинг:</div>
                    <Rate className="value"
                        disabled
                        defaultValue={user.rating || 0}
                        allowHalf
                        style={{ color: "orange" }}
                    />
                </div>
          </div>
      </div>
    );
}

export default UserContainer