import React from 'react';
import { FiSunrise, FiInfo, FiSearch, FiXCircle } from 'react-icons/fi';
import Styled from 'styled-components';

const StyledUl = Styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 10px 0;
`;

const StyledLi = Styled.li`
    flex: 1;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
`;

const StyledSearch = Styled.div`
    ${props => props.isSearchExpand ? 'display: block;' : 'display: none'};
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.08);
`;

const StyledForm = Styled.form`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
`;

const StyledInput = Styled.input`
    width: 100%!important;
    position: absolute;
    border: none;
    border-radius: 0px;
    margin: 0!important;
    padding: 0 25px;
    :focus{
        outline: none;
        border: none;
        box-shadow: none;
    }
`;

const StyledNav = Styled.nav`
    postion: relative;
`;

const StyledButton = Styled.button`
    position: absolute;
    top: 0;
    right: 19px;
    height: 100%;
    border: none;
    background-color: #ffffff;
    color: #000000;
    :hover{
        background-color: #ffffff;
        color: #000000;
    }

    :focus{
        background-color: #ffffff;
        color: #000000;
        outline: none;
    }

    svg{
        font-size: 22px;
    }
`;

export default function Nav(props) {
    return (
        <div className="col-md-12">
            <div className="navigation-container">
                <StyledNav>
                    <StyledUl className="navbar-nav mr-auto">
                        <StyledLi className="nav-item" title="Toggle DarkMood">
                            <FiSunrise />
                        </StyledLi>
                        <StyledLi className="nav-item" title="Application Help">
                            <FiInfo />
                        </StyledLi>
                        <StyledLi className="nav-item" title="Search Box" onClick={props.toggleSearchHandler}>
                            <FiSearch />
                        </StyledLi>
                    </StyledUl>
                    <StyledSearch className="searchForm" isSearchExpand={props.isSearchExpand}>
                        <StyledForm className="form-inline my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                            <StyledInput className="form-control mr-sm-2" type="search" placeholder="Which surah are you looking for?" aria-label="Search" />
                            <StyledButton type="submit" onClick={props.toggleSearchHandler}><FiXCircle /></StyledButton>
                        </StyledForm>
                    </StyledSearch>
                </StyledNav>
            </div>
        </div>
    )
}
