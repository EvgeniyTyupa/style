import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import classes from './Buttons.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Buttons = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const { t } = useTranslation();

    return(
       <div className={classes.main}> 
           <Button className={classes.signup} onClick={()=>{props.setIsOpenRegister(true)}}>
               <NavLink to="/signup">{t("buttons.reg")}</NavLink>
           </Button>
           <Button className={classes.payment}>
               <a href="https://secure.wayforpay.com/button/baa48468ad862">{t("buttons.pay")}</a>
           </Button>
       </div>
    )
}

export default Buttons;