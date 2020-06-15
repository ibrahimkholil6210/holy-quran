import React, { Component } from 'react';
import Styled from 'styled-components';
import SingleSurah from './component/SingleSurah';
import SurahList from './component/SurahList';
import Nav from './component/Nav';
import axios from 'axios';

const StyledHeight = Styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledMainDiv = Styled.div`
  height: 550px;
  background-color: #fff;
  overflow: hidden;
`;

export default class App extends Component {
  state = {
    listSurah: null,
    loadingSurahList: true,
    loadingSingleSurah: null,
    singleSurah: null,
    isAudioPlaying: false,
    isActiveBtn: null,
    isSearchExpand: false,
  }

  getSingleSurahHandler = async (num) => {
    this.setState({ loadingSingleSurah: true, isActiveBtn: num - 1 });
    const surah = await axios.get(`https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/surah/surah_${num}.json`);
    this.setState({ loadingSingleSurah: false, singleSurah: surah.data });
  }

  toggleSearchHandler = () => {
    this.state.isSearchExpand ? this.setState({ isSearchExpand: false }) : this.setState({ isSearchExpand: true });
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
    try {
      const getSurah = await axios.get('https://raw.githubusercontent.com/ibrahimkholil6210/quranjson/master/source/surah.json');
      this.setState({ listSurah: getSurah.data, loadingSurahList: false, });
    } catch (err) {
      throw new Error('Something went wrong!' + err);
    }
  }

  render() {
    return (
      <StyledHeight className="h-100">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-md-10">
              <StyledMainDiv>
                <div className="row no-gutters">
                  <Nav toggleSearchHandler={this.toggleSearchHandler} isSearchExpand={this.state.isSearchExpand} />
                  <SurahList listSurah={this.state.listSurah} isActiveBtn={this.state.isActiveBtn} isLoading={this.state.loadingSurahList} click={this.getSingleSurahHandler} />
                  <SingleSurah loadingSingleSurah={this.state.loadingSingleSurah} isAudioPlaying={this.state.isAudioPlaying} singleSurah={this.state.singleSurah} getAudioOnClick={this.getAudioHandler} />
                </div>
              </StyledMainDiv>
            </div>
          </div>
        </div>
      </StyledHeight >
    )
  }
}
