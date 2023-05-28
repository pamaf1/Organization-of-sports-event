import React from "react";
import { useNavigate } from "react-router-dom";
import "../resources/matchContainer.css";
import { makeDate } from "../helpFunction/dateFormat";

function Match({match}) {
    const navigation = useNavigate();
    return (
      <div className="match-container"
        onClick={() => {
            navigation(`https://match-organize.onrender.com/match/${match._id}`);
        }}>
            <div className="match-content">
                <div className="item">
                    <div className="label">Організатор:</div>
                    <div className="value">{match.createdBy.login}</div>
                </div>
                <div className="item">
                    <div className="label">Вид спорту:</div>
                    <div className="value">{match.type}</div>
                </div>
                <div className="item">
                    <div className="label">Місце проведення:</div>
                    <div className="value">{match.place}</div>
                </div>
                <div className="item">
                    <div className="label">Дата:</div>
                    <div className="value">{makeDate(match.date)}</div>
                </div>
                <div className="item">
                    <div className="label">Час:</div>
                    <div className="value">{match.time}</div>
                </div>
                <div className="item">
                    <div className="label">Зареєстровано/Всього:</div>
                    <div className="value">{match.registeredUsers.length ?  match.registeredUsers.length : 0}/{match.partisipants}</div>
                </div>
          </div>
      </div>
    );
}

export default Match