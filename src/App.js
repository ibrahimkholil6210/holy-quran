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
    isAudioPlaying: false,
  }

  getSingleSurahHandler = async (num) => {
    this.setState({ loadingSingleSurah: true });

    const surah = await axios.get(`https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/surah/surah_${num}.json`);
    this.setState({ loadingSingleSurah: false, singleSurah: surah.data });
  }

  getAudioHandler = async (aid, vid) => {
    this.setState({ isAudioPlaying: true });
    const audioIndex = await axios.get(`https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/audio/${aid}/index.json`);
    const audioIndexToStore = audioIndex.data.verse;
    const audioFileName = audioIndexToStore[vid].file;

    const ctx = new AudioContext();
    let audio;

    const audioData = await axios({
      method: 'get',
      url: `https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/audio/${aid}/${audioFileName}`,
      responseType: 'arraybuffer'
    });

    const aBfr = ctx.decodeAudioData(audioData.data);
    aBfr.then(data => {
      audio = data;
      const playSound = ctx.createBufferSource();
      playSound.buffer = audio;
      playSound.connect(ctx.destination);
      playSound.start(ctx.currentTime);

      playSound.addEventListener('ended', () => {
        this.setState({ isAudioPlaying: false });
      })

    });

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
                    <SingleSurah loadingSingleSurah={this.state.loadingSingleSurah} isAudioPlaying={this.state.isAudioPlaying} singleSurah={this.state.singleSurah} getAudioOnClick={this.getAudioHandler} />
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
