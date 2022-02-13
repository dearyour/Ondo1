import React from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Col, Row, Space } from "antd";
import Router from 'next/router'

const ChallengeByCategory = (props: any) => {
  const challenges = [...props.categorized];
  const getDuration = (startDate: string) => {
    const sDate = startDate.substring(0, 10);
    const sy = sDate.substring(0, 4);
    const sm = sDate.substring(5, 7);
    const sd = sDate.substring(8, 10);

    const eDate = new Date(Number(sy), Number(sm) - 1, Number(sd) + 2);
    const ey = eDate.getFullYear();
    const em = eDate.getMonth() + 1;
    const ed = eDate.getDate();

    return sy + '-' + sm + '-' + sd + ' ~ '
      + ey + '-' + (("00" + em.toString()).slice(-2)) + '-' + (("00" + ed.toString()).slice(-2));
  }

  const renderCategorizedChallenges = () => {
    const result = [];
    for (let i = 0; i < challenges.length; i++) {
      result.push(
        <ChallengeWrapper onClick={() => { Router.push(`/challenge/${challenges[i].challengeId}`) }}>
          <ChallengeImg src={challenges[i].image} alt="challenge-image" />
          <ChallengeContent>
            <ChallengeTitle>{challenges[i].title}</ChallengeTitle>
            {challenges[i].owner}
            <ChallengeDuration>{getDuration(challenges[i].sdate)}</ChallengeDuration>
            <Participants>현재 {challenges[i].challengeParticipate.length} 명 참여 중</Participants>
          </ChallengeContent>
        </ChallengeWrapper>
      )
    }

    return result;
  }

  return (
    <Row>
      <Col span={22} offset={1}>
        <WriteBtnWrapper><WriteBtn onClick={() => { Router.push('/challenge/write') }}>도전 개설하기</WriteBtn></WriteBtnWrapper>
        {renderCategorizedChallenges()}
      </Col>
    </Row>
  );
}

const WriteBtnWrapper = styled.div`
  display: flex;
  justify-content: right;
`

const WriteBtn = styled.button`
  position: relative;
  background: #edbaba;
  border-radius: 3px;
  border: 2px solid #edbaba;
  color: white;
  text-align: center;
  margin: 50px 0 20px 0;
  padding: 0.25em 1em;
  width: 150px;
  height: 30px;

  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const ChallengeWrapper = styled.div`
  width: 100%;
  height: 180px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.05);
  background: #fffbfb;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  /* z-index: 10; */
  border-radius: 5px;
  margin-bottom: 30px;

  cursor: pointer;
`

const ChallengeImg = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 10px 0 0 10px;
  background: #000;
`

const ChallengeTitle = styled.h1`
  font-size: x-large;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0;
  color: palevioletred;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

const ChallengeDuration = styled.div`
  text-align: right;
  padding-right: 20px;
`

const ChallengeContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  line-height: 1.8;
  color: #141414;
  margin: 0rem 2rem;

  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  button {
      /* padding: 10px 24px;
      background: #141414;
      color: #fff;
      border: none; */
    background: #edbaba;
    border-radius: 3px;
    border: 2px solid #edbaba;
    color: white;
    text-align: center;
    margin: 0.25rem ;
    padding: 0.25em 1em;
    width: 120px;
    
    &:hover {
      cursor: pointer;
      background-color: #e7adad;
    }
  }
`

const Participants = styled.div`
  font-size: 10px;
  text-align: right;
  padding-right: 20px;
  /* right: 10px;
  bottom: 70px; */
`

export default ChallengeByCategory;