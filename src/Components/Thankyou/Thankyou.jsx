import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Thankyou.module.css';

const Thankyou = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.window}>
                <Button>
                    <NavLink to="/" onClick={()=>{props.setIsThankyouUrl(false)}}>&#x2715;</NavLink>
                </Button>
                <p>Спасибо!</p>
            </div>
        </div>
    )
}

export default Thankyou;