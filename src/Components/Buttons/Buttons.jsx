import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import classes from './Buttons.module.css';
import { NavLink } from 'react-router-dom';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Buttons = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return(
       <div className={classes.main}> 
           <Button className={classes.signup}>
               <NavLink to="/signup">РЕГИСТРАЦИЯ</NavLink>
           </Button>
           <Button className={classes.payment}>
               <a href="">ОПЛАТА</a>
           </Button>
       </div>
    )
}

export default Buttons;