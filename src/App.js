import React, { Component } from 'react';
import Styled from 'styled-components';
import SingleSurah from './component/SingleSurah';
import SurahList from './component/SurahList';
import axios from 'axios';

const StyledHeight = Styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledMainDiv = Styled.div`
  height: 550px;
  background-color: #fff;
  overflow: hindden;
`;

export default class App extends Component {
  state = {
    listSurah: null,
    loadingSurahList: true,
    loadingSingleSurah: null,
    singleSurah: null,
  }

  getSingleSurahHandler = async (num) => {
    this.setState({ loadingSingleSurah: true });

    const surah = await axios.get(`https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/surah/surah_${num}.json`);
    this.setState({ loadingSingleSurah: false, singleSurah: surah.data });
  }


  async componentDidMount() {
    const getSurah = await axios.get('https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/surah.json');
    this.setState({ listSurah: getSurah.data, loadingSurahList: false, });
  }

  render() {
    return (
      <StyledHeight className="h-100">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-md-10">
              <StyledMainDiv>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <SurahList listSurah={this.state.listSurah} isLoading={this.state.loadingSurahList} click={this.getSingleSurahHandler} />
                  </div>
                  <div className="col-md-8">
                    <SingleSurah loadingSingleSurah={this.state.loadingSingleSurah} singleSurah={this.state.singleSurah} />
                  </div>
                </div>
              </StyledMainDiv>
            </div>
          </div>
        </div>
      </StyledHeight >
    )
  }
}
