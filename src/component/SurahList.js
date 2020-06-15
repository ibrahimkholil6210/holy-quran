import React from 'react';
import Styled from 'styled-components';
import { SolarSystemLoading } from 'react-loadingg';

const StyledDiv = Styled.div`
    overflow: scroll;
    height: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const StyledHeaderDiv = Styled.div`
    background-color: black;
    padding: 15px;
    position: sticky;
    top: 0;
    z-index: 99;
`;

const StyledHeading = Styled.h3`
    color: #ffffff;
    font-weight: bold;
    font-size: 22px;
    letter-speacing: 1px;
    text-align: center;
    text-transform: uppercase;
`;

const FlexContainerDiv = Styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center; 

    h1{
        font-size 25px;
        font-weight: bold;
        text-align: center;
    }
`;

const StyledButton = Styled.button`
    font-wight: bold;
    font-size: 18px;
    border-radius: 0px;
    font-size: 18px;
    font-weight: bold;
    :focus{
        outline: none;
        border-radius: 0px;
    }
    &.active{
        background-color: #000000;
        border: 1px solid #000000;
        border-radius: 0px;
    }
`;


export default function SurahList({ listSurah, isLoading, click, isActiveBtn }) {

    const Layout = !isLoading ? (
        listSurah.map((surah, index) => {
            return (
                <StyledButton
                    key={surah.index}
                    onClick={() => click(index + 1)}
                    type="button"
                    className={isActiveBtn === index ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
                    {surah.title}
                </StyledButton>
            );
        })
    ) : (
            <FlexContainerDiv>
                <SolarSystemLoading color="#000000" />
            </FlexContainerDiv>
        );



    return (
        <div className="col-md-4">
            <StyledDiv>
                <StyledHeaderDiv>
                    <StyledHeading>Holy Quran Surah</StyledHeading>
                </StyledHeaderDiv>
                <div className="list-group">
                    {Layout}
                </div>
            </StyledDiv>
        </div>
    )
}
