import React from 'react';
import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';
import classes from './BurgerMenu.module.css';

import Aos from 'aos';
import 'aos/dist/aos.css';

const StyledMenu = styled.div`
    width: 80%;
    height: 60vh;
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition-duration: .3s;
    top: 80px;
    position: fixed;
    padding-left: 15%;
    box-sizing: border-box;
    left: 0;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    & a{
        color: black;
        text-decoration: none;
        font-size: 7vw;
    }
`;

const BurgerMenu = (props) => {
    return(
        <StyledMenu open={props.open}>
            <Link to="/#about" className={props.active1 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>О ЧЕМ</Link>
            <Link to="/#shedule" className={props.active2 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>РАСПИСАНИЕ</Link>
            <Link to="/#trainers" className={props.active3 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>ТРЕНЕРЫ</Link>
            <Link to="/#signup" className={props.active4 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>ЗАПИСАТЬСЯ</Link>
        </StyledMenu>
    );
}

export default BurgerMenu;