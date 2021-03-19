import React from 'react';
import styled from 'styled-components';


const StyledBurger = styled.div`
    width: 40px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;

    div{
        width: 100%;
        height: 4px;
        background: black;
    }
`;

const Burger = (props) => {
    return(
        <>
            <StyledBurger>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
        </>
    )
}

export default Burger;