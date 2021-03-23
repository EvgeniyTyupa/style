import React, { useState } from 'react';
import styled from 'styled-components';
import BurgerMenu from './BurgerMenu';


const StyledBurger = styled.div`
    width: 40px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    div{
        width: 100%;
        height: 5px;
        background-color:black;
        transform-origin: 6px;
        border-radius: 10px;
        transition-duration: 0.3s;
        z-index: 100;

        &:nth-child(1){
            transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};

        }
        &:nth-child(2){
            transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open }) => open ? 0 : 1};
            display: ${({ open }) => open ? 'none' : 'block'}
        }
        &:nth-child(3){
            transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'}
        }
    }
`;

const Burger = (props) => {
    const [open, setOpen] = useState(false);

    return(
        <>
            <StyledBurger open={open} onClick={()=>{setOpen(!open)}}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
            <BurgerMenu changeLanguage={props.changeLanguage} open={open} setOpen={setOpen} active1={props.active1} active2={props.active2} active3={props.active3} active4={props.active4}/>
        </>
    )
}

export default Burger;