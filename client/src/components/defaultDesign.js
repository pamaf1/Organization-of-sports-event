import React from 'react'
import "../resources/design.css";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

function DefaultDesign({children}) {
    const [collapsed, setCollapsed] = React.useState(false);
    const navigation = useNavigate();
    const { user } = useSelector((state) => state.users);
    const userMenu = [
        {
            name: 'Головна сторінка',
            path: '/',
            icon: 'ri-home-2-fill'
        },
        {
            name: 'Створити матч',
            path: '/create-matches',
            icon: 'ri-add-circle-fill'
        },
        {
            name: 'Користувачі',
            path: '/users',
            icon: 'ri-user-fill'
        },
        {
            name: 'Профіль',
            path: '/profile',
            icon: 'ri-profile-line'
        },
        {
            name: 'Розлогінитись',
            path: '/logout',
            icon: 'ri-logout-box-fill'
        }
    ];

    const adminMenu = [
        {
            name: 'Головна сторінка',
            path: '/',
            icon: 'ri-home-2-fill'
        },
        {
            name: 'Створити матч',
            path: '/admin/matches',
            icon: 'ri-football-fill'
        },
        {
            name: 'Користувачі',
            path: '/admin/users',
            icon: 'ri-user-fill'
        },

        {
            name: 'Профіль',
            path: '/profile',
            icon: 'ri-profile-line'
        },
        {
            name: 'Розлогінитись',
            path: '/logout',
            icon: 'ri-logout-box-fill'
        }
    ];

    const renderingMenu = user?.isAdmin ? adminMenu : userMenu;
    const activetionRouting = window.location.pathname;

    return (
        <div className={`layout-parent ${collapsed ? "collapsed" : ""}`}>
            <div className='sidebar'>
                <div className='sidebar-top'>
                    <h1>{user?.login}</h1>
                </div>
                <div className='d-flex flex-column gap-4 menu'>
                    {renderingMenu.map((item, index) => {
                        return <div className= {`${activetionRouting===item.path && 'active-menu-item'} menu-item`} >
                            <i className={item.icon}></i>
                            {!collapsed && <span onClick={() => {
                                    if (item.path === "/logout") {
                                        localStorage.removeItem("token");
                                        navigation("/login");
                                      } else {
                                        navigation(item.path);
                                      }
                                    }}>{item.name}
                                </span>
                            }
                        </div>
                    })}                          
                </div>
            </div>
            <div className='body'>
                <div className='header'>
                    {collapsed ? 
                    (<i class="ri-menu-unfold-fill"
                        onClick = {()=>setCollapsed(!collapsed)}
                    >
                    </i>) : 
                    (<i class="ri-menu-fold-fill"
                        onClick = {()=>setCollapsed(!collapsed)}
                    >
                    </i>)}
                </div>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultDesign