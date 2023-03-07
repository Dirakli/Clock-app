import { createGlobalStyle } from 'styled-components';
import axios from "axios";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import mobileDaytimeImage from '/assets/mobile/bg-image-daytime.jpg';
import mobileNighttimeImage from '/assets/mobile/bg-image-nighttime.jpg';
import TabletDaytimeImage from '/assets/tablet/bg-image-daytime.jpg';
import TabletNighttimeImage from '/assets/tablet/bg-image-nighttime.jpg';
import DesktopDaytimeImage from '/assets/desktop/bg-image-daytime.jpg';
import DesktopNighttimeImage from '/assets/desktop/bg-image-nighttime.jpg';
import refreshIcon from "/assets/desktop/icon-refresh.svg";
import sunIcon from "/assets/desktop/icon-sun.svg";
import moonIcon from "/assets/desktop/icon-moon.svg";
import arrowUp from "/assets/desktop/icon-arrow-up.svg";
import arrowDown from "/assets/desktop/icon-arrow-down.svg";
import TabletFooter from './TabletFooter';

function App() {
  const [randomQuote, setRandomQuote] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [timezone, setTimezone] = useState<any>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [backgroundChange, setBackgroundChange] = useState<any>();
  const [getCity, setGetCity] = useState<any>([]);
  const [sunOrMoonIcon, setSunOrMoonIcon] = useState<any>();
  const [morningEveningWord, setMorningEveningWord] = useState<any>();
  const [footerColorChange, setFooterColorChange] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<any>(false);

  const screenSize = window.outerWidth;


  const getCityFunc = () => {
    axios.get('https://ipinfo.io/62.212.37.199/json?token=93a4ed61aaea1c')
      .then(response => setGetCity(response.data))
      .catch(error => console.log(error));
  };

  function showMoreFunction() {
    console.log(isShown)
    return (
      setIsShown(!isShown)
    )
  }


  const updateTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    setTimezone(`${hours}:${minutes}:${seconds}`);
  }

  setInterval(updateTime, 1000);

  const quotesGenerator = () => {
    axios.get('https://api.quotable.io/random')
      .then(response => setRandomQuote(response.data))
      .catch(error => console.log(error));
  };

  const locationFunction = async () => {
    try {
      let resGet = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Tbilisi')
      let dataGeo = resGet.data
      console.log(dataGeo)
      setLocation(dataGeo)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let currentTime = new Date().getHours();
    console.log(currentTime);
    const updateBackgroundImage = () => {
      if (currentTime > 8 && currentTime < 19) {
        setBackgroundChange(screenSize < 768 ? mobileDaytimeImage : (screenSize > 1199 ? DesktopDaytimeImage : TabletDaytimeImage));
        setSunOrMoonIcon(sunIcon);
        setMorningEveningWord("morning");
      } else {
        setBackgroundChange(screenSize < 768 ? mobileNighttimeImage : (screenSize > 1199 ? DesktopNighttimeImage : TabletNighttimeImage));
        setSunOrMoonIcon(moonIcon);
        setMorningEveningWord("evening");
      }


    };

    const intervalId = setInterval(updateBackgroundImage, 1000);
    updateBackgroundImage();
    if (screenSize > 767) {
      console.log(shouldRender)
      setShouldRender(true);
    } else {
      setShouldRender(false)
    }
    return () => clearInterval(intervalId);

  }, [screenSize]);

  useEffect(() => {
    let currentTime = new Date().getHours();
    quotesGenerator();
    locationFunction();
    getCityFunc();
    if (currentTime > 8 && currentTime < 19) {
      setFooterColorChange(!footerColorChange);
    } else {
      setFooterColorChange(!footerColorChange);
    }

  }, [])

  return (
    <MainWrapper >
      <GlobalStyles />
      <>
        <BackgroundImage src={backgroundChange} />

        {!isShown ? <QuoteDiv>
          <QuoteAndAuthorOnly>
            <QuoteText >"{randomQuote.content}"</QuoteText>
            <AuthorText >{randomQuote.author}</AuthorText>
          </QuoteAndAuthorOnly>
          <GenerateIcon src={refreshIcon} onClick={quotesGenerator} alt="refresh icon" />
        </QuoteDiv> : ""}

        <TimeAndLocationWrapper top={!isShown ? "355px" : "99px"} topTablet={!isShown ? "593px" : "153px"} topDesktop={!isShown ? "414px" : "56px"}>
          <GoodMorningWrapper>
            <img src={sunOrMoonIcon} />
            <GoodMorningText>good {morningEveningWord}{screenSize > 767 ? ", it's currently" : ""}</GoodMorningText>
          </GoodMorningWrapper>
          <BstAndTimeWrapper>
            <Time>{timezone}</Time>
            <Bst>gmt</Bst>
          </BstAndTimeWrapper>
          <GeoLocation>IN {getCity.city}, {getCity.country}</GeoLocation>

        </TimeAndLocationWrapper>

        <MoreDiv onClick={showMoreFunction} top={!isShown ? "588px" : "332px"} topTablet={!isShown ? "904px" : "464px"} topDesktop={!isShown ? "646px" : "288px"} >
          <MoreWord>{!isShown ? "MORE" : "LESS"}</MoreWord>
          <ArrowUpAndDownWrapper >
            {!isShown ? <ArrowDown src={arrowDown} /> : <ArrowUp src={arrowUp} />}
          </ArrowUpAndDownWrapper>
        </MoreDiv>

        {shouldRender ? <>{isShown ? <TabletFooter footerColorChange={footerColorChange} location={location} /> : ""}</> : <>{isShown ? <MoreInfoWrapper color={footerColorChange ? " rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.75)"} >
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >CURRENT TIMEZONE</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.timezone}</MoreInfoResult>
          </MoreInfroMiniWrapper>
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"}  >Day of the year</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.day_of_year}</MoreInfoResult>
          </MoreInfroMiniWrapper>
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >Day of the week</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.day_of_week}</MoreInfoResult>
          </MoreInfroMiniWrapper>
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >Week number</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.week_number}</MoreInfoResult>
          </MoreInfroMiniWrapper>
        </MoreInfoWrapper> : ""}</>}





      </>

    </MainWrapper>

  )
}
const GenerateIcon = styled.img`
    cursor: pointer;
    @media (min-width: 768px) {
      margin-top: 5px;
    }
  `

const MoreInfoResult = styled.span`
    font-size: 20px;
    font-weight: 700;
    line-height: 24.2px;
    letter-spacing: 2px;
    color: ${(props) => props.color};
    text-transform: uppercase;
  `

const MoreInfroText = styled.p`
    font-size: 10px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 2px;
    color: ${(props) => props.color};
    text-transform: uppercase;
  `

const MoreInfroMiniWrapper = styled.div`
  margin-top: 16px;
    width: 323px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `

const MoreInfoWrapper = styled.div`
    padding-left: 26px;
    padding-right: 26px;
    width: 375px;
    height: 256px;
    position: absolute;
    margin-top: 411px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: ${(props) => props.color};
    backdrop-filter: blur(20.3871px);

    @media (min-width: 768px) {
    padding-left: 64px;
    padding-right: 168px;
    width: 768px;
    height: 440px;
    position: absolute;
    margin-top: 584px;
    }
    `


const ArrowUpAndDownWrapper = styled.div`
      background-color: #303030;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      :hover {
        background-color: #999999;
      }
      @media (min-width: 768px) {
      width: 40px;
      height: 40px;
      }
    `
const ArrowUp = styled.img`
        width: 100%;
        border-radius: 50%;
      `

const ArrowDown = styled.img`
      width: 40%;
      border-radius: 50%;
    `

const MoreWord = styled.span`
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 3.75px;
    color: #000000;
    opacity: 0.5;

    @media (min-width: 768px) {
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 5px;
    }
    `

const MoreDiv = styled.button<any>`
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 17px;
      justify-content: space-between;
      margin-top: ${(props) => props.top};
      position: absolute;
      border: none;
      width: 115px;
      height: 39px;
      border-radius: 28px;
      margin-left: 26px;
      background-color: #FFFFFF;

      @media (min-width: 768px) {
        width: 146px;
        height: 56px;
        margin-left: 64px;
        margin-top: ${(props) => props.topTablet};
        padding-left: 21px;
      }
      @media (min-width: 1200px) {
        margin-top: ${(props) => props.topDesktop};
        margin-left: 900px;
      }
      
    `

const GeoLocation = styled.span`
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 3px;
    color: #FFFFFF;

    @media (min-width: 768px) {
      font-size: 18px;
      letter-spacing: 3.6px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
      letter-spacing: 4.8px;
    }
  `

const Bst = styled.span`
    margin-top: 58px;
    margin-left: 5px;
    font-size: 15px;
    font-weight: 300;
    line-height: 28px;
    text-transform: uppercase;
    color: white;

    @media (min-width: 768px) {
    margin-top: 100px;
    font-size: 28px;
    }
    @media (min-width: 1200px) {
      margin-top: 120px;
      font-size: 40px;
    }

    
  `

const BstAndTimeWrapper = styled.div`
  display: flex;
  `

const Time = styled.span`
    font-size: 80px;
    font-weight: 700;
    line-height: 100px;
    letter-spacing: -2.5px;
    color: white;

    @media (min-width: 768px) {
    font-size: 150px;
    line-height: 150px;
    letter-spacing: -4.38px;
    }
    @media (min-width: 1200px) {
    font-size: 175px;
    line-height: 175px;
    letter-spacing: -5px;
    }
  `

const BackgroundImage = styled.img`
    z-index: -1;
    height: 100%;
    width: 100%;
    filter: brightness(70%);
  `

const GoodMorningText = styled.p`
    margin-left: 17px;
    font-size: 15px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: white;
    align-items: flex-end;

    @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 3.6px;
    }
    @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 4px;
    }
  `

const GoodMorningWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
  `

const TimeAndLocationWrapper = styled.div<any>`
    margin-left: 26px;
    position: absolute;
    margin-top: ${(props) => props.top};
    width: 278px;
    height: 185px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    @media (min-width: 768px) {
      width: 499px;
      height: 231px;
      margin-left: 64px;
      margin-top: ${(props) => props.topTablet};
    }
    @media (min-width: 1200px) {
      width: 619px;
      height: 288px;
      margin-left: 165px;
      margin-top: ${(props) => props.topDesktop};
    }
  `

const AuthorText = styled.h5`
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
    color: white;
    align-items: flex-end;
    
    @media (min-width: 768px) {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    }
    `

const QuoteText = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    color: white;
    align-items: flex-end;

    @media (min-width: 768px) {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    }
  `

const QuoteAndAuthorOnly = styled.div`
  width: 290px;
  height: 97px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 15px;

  @media (min-width: 768px) {
    width: 540px;
    height: 84px;
  }
`

const QuoteDiv = styled.div`
  position: absolute;
  margin-top: 32px;
  margin-left: 26px;
  width: 324px;
  height: 97px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
  margin-top: 80px;
  margin-left: 64px;
  width: 573px;
  height: 125px;
  }

  @media (min-width: 1200px) {
    margin-top: 56px;
    margin-left: 165px;
  }
`

const MainWrapper = styled.div<any>`
  overflow: hidden;
  font-size: 32px;
  margin: 0 auto;
  width: 375px;
  height: 667px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (min-width: 768px) {
    width: 768px;
    height: 1024px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
    height: 800px;
  }
`


const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration: none;
}
* {
  box-sizing: border-box;
}

textarea {
  resize: none;
}

`


export default App
