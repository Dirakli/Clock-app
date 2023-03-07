import { useState } from 'react';
import styled from 'styled-components';



function TabletFooter({footerColorChange, location}: {footerColorChange: any, location: any}) {
  console.log('this is location', location)
  return (
    <MoreInfoWrapper color={footerColorChange ? " rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.75)"} >
      <InsideBox>
        <Divider>
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >CURRENT TIMEZONE</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.timezone}</MoreInfoResult>
          </MoreInfroMiniWrapper>
          {<Column></Column>}
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"}  >Day of the year</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.day_of_year}</MoreInfoResult>
          </MoreInfroMiniWrapper>
        </Divider>
        
        <Divider>
          <MoreInfroMiniWrapper>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >Day of the week</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.day_of_week}</MoreInfoResult>
          </MoreInfroMiniWrapper>
          <Column style={{marginLeft: window.outerWidth > 1365 ? "91px" : "40px"}} ></Column>
          <MoreInfroMiniWrapper style={{ marginRight: "26px" }}>
            <MoreInfroText color={footerColorChange ? "#FFFFFF" : "#303030"} >Week number</MoreInfroText>
            <MoreInfoResult color={footerColorChange ? "#FFFFFF" : "#303030"} >{location.week_number}</MoreInfoResult>
          </MoreInfroMiniWrapper>
        </Divider>
      </InsideBox>
    </MoreInfoWrapper>
  )
}

const Column = styled.div`
  width: 1px;
  height: 126px;
  opacity: 25%;
  background-color: #FFFFFF;
`

const Divider = styled.div`
      width: 538px;
      display: flex;
      justify-content: space-between;
      @media (min-width: 1200px) {
        width: 844px;
      }
`


const MoreInfoResult = styled.span`
    font-size: 40px;
    font-weight: 700;
    line-height: 48.41px;
    color: ${(props) => props.color};
    @media (min-width: 1200px) {
    font-size: 56px;
    line-height: 67.77px;
    }
  `

const MoreInfroText = styled.p`
    font-size: 13px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 2.6px;
    color: ${(props) => props.color};
    text-transform: uppercase;
    @media (min-width: 1200px) {
      letter-spacing: 3px;
      font-size: 15px;
    }
  `

const MoreInfroMiniWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `
const InsideBox = styled.div`
  width: 538px;
  height: 202px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 1200px) {
    width: 844px;
    height: 252px;
    margin-left: 165px;
    margin-top: 74px;
  }
`

const MoreInfoWrapper = styled.div`
    width: 768px;
    height: 440px;
    position: absolute;
    margin-top: 584px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.color};
    backdrop-filter: blur(20.3871px);
    @media (min-width: 1200px) {
      width: 1200px;
      height: 400px;
      margin-top: 400px;
      justify-content: flex-start;
      align-items: baseline;
    } 
`

export default TabletFooter;