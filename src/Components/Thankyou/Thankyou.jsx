import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Thankyou.module.css';
import { useTranslation } from "react-i18next";

const Thankyou = (props) => {
    const { t } = useTranslation();

    return(
        <div className={classes.main}>
            <div className={classes.window}>
                <Button>
                    <NavLink to="/" onClick={()=>{props.setIsThankyouUrl(false)}}>&#x2715;</NavLink>
                </Button>
                <p>{t("thankyou")}</p>
            </div>
        </div>
    )
}

export default Thankyou;