import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import classes from './RegisterModal.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { register } from '../../Redux/commonReducer';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root:{
        '& label.Mui-focused': {
            color: '#7C0061'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C0061' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0
        }
    }
}));


const RegisterModal = (props) => {
    const material = useStyles();

    const { t } = useTranslation();

    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = (data, e) => {
        data.url = props.url;
        props.register(data);
        e.target.reset();
    }

    useEffect(() => {
        Aos.init({ duration: 1000 });
    },[])

    return(
        <div className={classes.main}>
            {props.isRegistered ? 
            <form data-aos="zoom-in" data-aos-duration="200">
                <Button onClick={()=>{props.setIsOpenRegister(false)}}>
                    <NavLink to="/">&#x2715;</NavLink>
                </Button>
                <p>{t("register.thankyou")}</p>
            </form> : 
            <form data-aos="zoom-in" data-aos-duration="200" onSubmit={handleSubmit(onSubmit)}>
                <Button onClick={()=>{props.setIsOpenRegister(false)}}>
                    <NavLink to="/">&#x2715;</NavLink>
                </Button>
                <div className={classes.field}>
                    <TextField inputRef={register({required: true})} variant="outlined" label={t("register.name")} name="name" classes={material} error={errors.name ? true : false}/>
                    {errors.name && errors.name.type === "required" && <p className={classes.error}>{t("register.error")}</p>}
                </div>
                <div className={classes.field}>
                    <TextField inputRef={register({required: true})} variant="outlined" label={t("register.phone")} name="phone" classes={material} error={errors.phone ? true : false}/>
                    {errors.phone && errors.phone.type === "required" && <p className={classes.error}>{t("register.error")}</p>}
                </div>
                <div className={classes.field}>
                    <TextField inputRef={register({required: true, email: true})} variant="outlined" label="Email*" name="email" classes={material} error={errors.email ? true : false}/>
                    {errors.email && errors.email.type === "required" && <p className={classes.error}>{t("register.error")}</p>}
                </div>
                <Button type="submit" className={classes.submit}>{t("register.submit")}</Button>
            </form>}
        </div>
    );
}

let mapStateToProps = (state) => ({
    isRegistered: state.common.isRegistered
})

export default connect(mapStateToProps, {
    register
})(RegisterModal);