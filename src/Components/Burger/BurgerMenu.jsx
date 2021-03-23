import React from 'react';
import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';
import classes from './BurgerMenu.module.css';

import Aos from 'aos';
import 'aos/dist/aos.css';

import { useTranslation } from "react-i18next";
import { makeStyles, MenuItem, TextField } from '@material-ui/core';

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


const useStyles = makeStyles({
    root: {
        width: "50%",
        '& .MuiInputBase-root': {
            fontSize: "2rem",
            fontWeight: 300
        },
        '& .MuiInput-underline:before':{
            borderBottom: 0
        },
        '& .MuiInput-underline:after':{
            borderBottom: "2px solid #7C0061"
        }
    }
})

const BurgerMenu = (props) => {
    const { t } = useTranslation();
    const material = useStyles();

    return(
        <StyledMenu open={props.open}>
            <Link to="/#about" className={props.active1 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>{t("menu.one")}</Link>
            <Link to="/#shedule" className={props.active2 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>{t("menu.two")}</Link>
            <Link to="/#trainers" className={props.active3 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>{t("menu.three")}</Link>
            <Link to="/#signup" className={props.active4 ? classes.activeLink : ""} onClick={()=>{props.setOpen(false)}}>{t("menu.four")}</Link>
            <TextField classes={material} defaultValue="ua" select onChange={props.changeLanguage}>
                <MenuItem value="ru" onClick={()=>{props.setOpen(false)}}>RU</MenuItem>
                <MenuItem value="ua" onClick={()=>{props.setOpen(false)}}>UA</MenuItem>
            </TextField>
        </StyledMenu>
    );
}

export default BurgerMenu;