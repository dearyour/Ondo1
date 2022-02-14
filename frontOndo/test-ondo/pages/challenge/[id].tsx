import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import useUser from 'store/hooks/userHooks';
import { Modal, Button, Col, Row, Divider, Spin } from 'antd';
import AppLayout from 'components/layout/AppLayout';
import LoggedInForm from 'components/layout/LoggedInForm';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import Router, { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import axios from 'axios';

const ReadChallenge = () => {

  const router = useRouter()
  const { id } = router.query
  const [amIParticipant, setAmIParticipant] = useState(false);
  const [challenge, setChallenge] = useState<any>({});
  const [feeds, setFeeds] = useState<any>([]);
  const [finished, setFinished] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [Rstarted, setRstarted] = useState(false);


  const asd = () => {
    const now = new Date().toDateString()
    console.log(now)
    // challenge.sdate
  }
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('Token')
      axios({
        method: 'get',
        url: process.env.BACK_EC2 + '/challenge/detail/' + String(id),
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res)
          setAmIParticipant(res.data.amIParticipate)
          setChallenge(res.data.challenge)
          setFeeds(res.data.feeds)
          setFinished(res.data.finished)
          setStarted(res.data.started)
          setLoading(false)
          const now = new Date()
          setRstarted(Number(res.data.challenge.sdate) <= Number(now.getFullYear().toString() + ("00" + (now.getMonth() + 1).toString()).slice(-2) + now.getDate().toString()))
        })
        .catch((err) => {
          console.log('상세보기 실패');

        })
    }
  }, [id])

  // 참여하기
  const participate = () => {
    const token = localStorage.getItem('Token')
    axios({
      method: 'post',
      url: process.env.BACK_EC2 + '/challenge/participate',
      headers: { Authorization: "Bearer " + token },
      data: {
        challengeId: id,
      }
    })
      .then((res) => {
        console.log(res)
        alert('참여합니다.')
        location.reload();
      })
  }

  const getDuration = (startDate: string) => {

    const sy = startDate.substring(0, 4);
    const sm = startDate.substring(4, 6);
    const sd = startDate.substring(6, 8);

    const endDate = new Date(Number(sy), Number(sm) - 1, Number(sd) + 2);
    const ey = endDate.getFullYear();
    const em = endDate.getMonth() + 1;
    const ed = endDate.getDate();

    return sy + '-' + sm + '-' + sd + ' ~ '
      + ey + '-' + (("00" + em.toString()).slice(-2)) + '-' + (("00" + ed.toString()).slice(-2));
  }

  const renderPosts = () => {
    const result = [];
    for (let i = 0; i < feeds.length; i++) {
      result.push(
        <Col xs={8} md={8} key={i}>
          <FeedImg src={feeds[i].image}></FeedImg>
        </Col>
      );
    }
    return result;
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles.container}>
          <Large>
            <Spin size='large' />
          </Large>
        </div>
      </div>
    )
  }

  return (
    <AppLayout title="도전 상세보기 | 온도">
      <Row style={{ marginTop: 20, fontFamily: 'sans-serif' }}>
        <Col xs={0} md={4} />
        <Col xs={24} md={16}>
          오늘의 도전
          <Divider style={{ borderColor: 'black' }} />
          <ChallengeWrapper>
            <ChallengeImg src={challenge.image} alt="feed-image" />
            <ChallengeContent>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <LoggedInForm />
              <ChallengeDuration>{getDuration(challenge.sdate)}</ChallengeDuration>
              <p>{challenge.content}</p>

              <BottomContent>
                <Participants>현재 {challenge.challengeParticipate.length} 명 참여 중</Participants>
                <Button.Group>
                  {/* <ParticipateOrWriteFeed>개설</ParticipateOrWriteFeed>
            <ParticipateOrWriteFeed>취소</ParticipateOrWriteFeed> */}
                  {!amIParticipant && !started && <button onClick={participate}>참여하기</button>}
                  {amIParticipant && Rstarted && !finished && <button onClick={() => { Router.push('/feed/write') }}>피드쓰기</button>}
                </Button.Group>
              </BottomContent>
            </ChallengeContent>
          </ChallengeWrapper>
          <Row gutter={8}>{renderPosts()}</Row>
        </Col>
        <Col xs={0} md={4} />
      </Row>
    </AppLayout>
  )
}

const Large = styled.div`
  width: 100%;
  margin-top: 30%;
  display: flex;
  justify-content: center;
`

const ChallengeWrapper = styled.div`
  width: 100%;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
  background: #fff8f8;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 5px;
  margin-bottom: 10px;
`

const ChallengeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  border-radius: 10px 0 0 10px;
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
const BottomContent = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

const Participants = styled.div`
  font-size: 10px;
  text-align: right;
  padding-right: 20px;
  /* right: 10px;
  bottom: 70px; */
`

export default ReadChallenge;