import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Thankyou.module.css';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Thankyou = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
        Aos.init({ duration: 1000 });
    },[])

    return(
        <div className={classes.main}   data-aos="fade" data-aos-duration="300">
            <div className={classes.window}  data-aos="zoom-in" data-aos-duration="200">
                <Button>
                    <NavLink to="/" onClick={()=>{props.setIsThankyouUrl(false)}}>&#x2715;</NavLink>
                </Button>
                <p>{t("register.thankyou")}</p>
            </div>
        </div>
    )
}

export default Thankyou;