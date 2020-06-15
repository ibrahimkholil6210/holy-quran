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

const StyledList = Styled.li`
    text-align: right;
    position: relative;
    padding-right: 54px;
    font-weight: 900;
    cursor: pointer;
    font-size: 18px;
`;

const StyledSpan = Styled.span`
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    background: #000;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    line-height: 40px;
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



export default function SingleSura({ loadingSingleSurah, singleSurah, getAudioOnClick, isAudioPlaying }) {

    let Layout = null;
    let LayoutTitle = null;
    if (loadingSingleSurah === null) {
        Layout = (
            <>
                <FlexContainerDiv>
                    <h1>Please Select a Surah Form Surah List</h1>
                </FlexContainerDiv>
            </>
        );
    }

    if (loadingSingleSurah === true) {
        Layout = (
            <>
                <FlexContainerDiv>
                    <SolarSystemLoading color="#000000" />
                </FlexContainerDiv>
            </>
        );
    }

    if (loadingSingleSurah === false) {

        const surahData = singleSurah.verse;
        const lineOfSurah = Object.keys(surahData);

        const title = singleSurah.name.toUpperCase();

        LayoutTitle = (
            <StyledHeaderDiv>
                <StyledHeading>{title}</StyledHeading>
            </StyledHeaderDiv>
        )

        Layout = (
            <>
                <div className="list-group">
                    {
                        lineOfSurah.map((line, index, ) => {
                            return (
                                <StyledList className="list-group-item" key={index} onClick={() => { return !isAudioPlaying ? getAudioOnClick(singleSurah.index, line) : '' }}>{surahData[line]} <StyledSpan>{++index}</StyledSpan></StyledList>
                            );
                        })
                    }
                </div>
            </>
        );
    }

    return (
        <div className="col-md-8">
            <StyledDiv>
                {LayoutTitle}
                {Layout}
            </StyledDiv>
        </div>
    )
}
