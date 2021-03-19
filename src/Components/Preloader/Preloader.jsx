import React, { useEffect } from 'react';
import classes from './Preloader.module.css';
import preloader from '../../Assets/preloader.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Preloader = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    },[])
    return(
        <div className={classes.main} data-aos="fade">
            <img src={preloader} data-aos="fade-down"/>
        </div>
    );
}

export default Preloader;