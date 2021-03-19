import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import classes from './RegisterModal.module.css';

const useStyles = makeStyles((theme) => ({
    root:{
        '& label.Mui-focused': {
            color: '#7C0061'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C0061' 
        }
    }
}));

const RegisterModal = (props) => {
    const material = useStyles();

    return(
        <div className={classes.main}>
            <form>
                <Button onClick={()=>{props.setIsOpenRegister(false)}}>&#x2715;</Button>
                <div className={classes.field}>
                    <TextField variant="outlined" label="Имя" name="name" classes={material}/>
                </div>
                <div className={classes.field}>
                    <TextField variant="outlined" label="Номер телефона" name="phone" classes={material}/>
                </div>
                <div className={classes.field}>
                    <TextField variant="outlined" label="Email" name="email" classes={material}/>
                </div>
                <Button className={classes.submit}>Регистрация</Button>
            </form>
        </div>
    );
}

export default RegisterModal;