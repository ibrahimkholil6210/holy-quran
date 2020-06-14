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


export default function SurahList({ listSurah, isLoading, click }) {

    const Layout = !isLoading ? (
        listSurah.map((surah, index) => {
            return (
                <button key={surah.index} onClick={() => click(index + 1)} type="button" className="list-group-item list-group-item-action">{surah.title}</button>
            );
        })
    ) : (
            <FlexContainerDiv>
                <SolarSystemLoading color="#000000" />
            </FlexContainerDiv>
        );



    return (
        <StyledDiv>
            <StyledHeaderDiv>
                <StyledHeading>Holy Quran Surah</StyledHeading>
            </StyledHeaderDiv>
            <div className="list-group">
                {Layout}
            </div>
        </StyledDiv>
    )
}
