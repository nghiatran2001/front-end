import React from 'react';
import './Main.scss'
import logo from '../image/u22.jpg'
import logo1 from '../image/we.png'
import logo2 from '../image/culture.png'
import logo3 from '../image/event.png'


const Main = () => {
    return (
        <>
            <div className="main">
                <div className="main_title">
                    <h2>EVENT</h2>
                </div>
                <div className="main_event">
                    <ul>
                        <li>
                            <img src={logo} alt=''/>
                        </li>
                        <li>
                            <img src={logo1} alt=''/>
                        </li>
                        <li>
                            <img src={logo2} alt=''/>
                        </li>
                        <li>
                            <img src={logo3} alt=''/>
                        </li>
                    </ul>
                </div>
                <img className="main_event_center" src={logo} alt=''/>
            </div>
        </>
    );
};

export default Main;