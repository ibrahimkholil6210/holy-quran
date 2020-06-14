import React from 'react';
import Styled from 'styled-components';


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



export default function SingleSura({ loadingSingleSurah, singleSurah }) {

    let Layout = null;
    let LayoutTitle = null;
    if (loadingSingleSurah === null) {
        Layout = (
            <>
                <h1>Please Select a Surah Form Surah List</h1>
            </>
        );
    }

    if (loadingSingleSurah === true) {
        Layout = (
            <>
                <h1>Please Wait We Are Fetching Data For You!</h1>
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
                        lineOfSurah.map((line, index) => {
                            return (
                                <StyledList className="list-group-item" key={index}>{surahData[line]} <StyledSpan>{++index}</StyledSpan></StyledList>
                            );
                        })
                    }
                </div>
            </>
        );
    }

    return (
        <div>
            <StyledDiv>
                {LayoutTitle}
                <div className="list-group">
                    {Layout}
                </div>
            </StyledDiv>
        </div>
    )
}
