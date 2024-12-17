import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { message, Slider } from 'antd'
import { BarControl, BarOperator, BarPlayerInfo, PlayerBarWrapper } from './style'
import { Link } from 'react-router-dom'
import { appShallowEqual, useAppDispatch, useAppSelector } from '@/store'
import { } from '@reduxjs/toolkit'
import { formatTime, getImageSize } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import { changeLyricsIndexAction, changeMusicAction, changePlayModeAction } from '../store/player'
interface IProps {
  children?: ReactNode
}
const AppPlayerBar: FC<IProps> = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
    lyrics: state.player.lyrics,
    lyricIndex: state.player.lyricIndex,
    playMode: state.player.playMode
  }), appShallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // 1.播放音乐
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    console.log(audioRef.current);

    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败:', err)
      })

    setDuration(currentSong.dt)
  }, [currentSong])

  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  function handleTimeUpdate() {
    const currentTime = audioRef.current!.currentTime
    if (!isSliding) {
      const progress = (currentTime * 1000 / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime * 1000)
    }

    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime * 1000) {
        index = i - 1
        break
      }
    }
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricsIndexAction(index))

    message.open({
      content: lyrics[index].text,
      key: 'lyric',
      style: {
        bottom: '60px'
      },
      duration: 0
    })
  }

  function handleSliderChanged(value: number) {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  function handleChangePlayMode() {
    const newPlayMode = (playMode + 1) % 3
    dispatch(changePlayModeAction(newPlayMode))
  }

  function handleChangeMusic(isNext=true){
    dispatch(changeMusicAction(isNext)) 
  }

  function handleSliderChanging(value: number) {
    setIsSliding(true)
    setProgress(value)
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  function handleTimeEnded(){
    if(playMode===2){
      audioRef.current!.currentTime=0
      audioRef.current?.play()
    }else{
      handleChangeMusic(true)
    }
  }

  return <PlayerBarWrapper className='sprite_playbar'>
    <div className="content wrap-v2" >
      <BarControl isPlaying={isPlaying}>
        <button className='btn sprite_playbar prev' onClick={()=>{handleChangeMusic(false)}}></button>
        <button className='btn sprite_playbar play' onClick={handlePlayBtnClick}></button>
        <button className='btn sprite_playbar next' onClick={()=>{handleChangeMusic()}}></button>
      </BarControl>
      <BarPlayerInfo>
        <Link to="/player">
          <img className='image' src={getImageSize(currentSong?.al?.picUrl, 50)} alt="" />
        </Link>
        <div className="info">
          <div className="song">
            <span className="song-name">{currentSong.name}</span>
            <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
          </div>
          <div className="progress">
            <Slider value={progress} step={0.5} tooltip={{ formatter: null }} onAfterChange={handleSliderChanged} onChange={handleSliderChanging} />
            <div className="time">
              <span className="current">{formatTime(currentTime)}</span>
              <span className="divider">/</span>
              <span className="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </BarPlayerInfo>
      <BarOperator playMode={playMode}>
        <div className="left">
          <button className='btn pip'></button>
          <button className='btn sprite_playbar favor'></button>
          <button className='btn sprite_playbar share'></button>
        </div>
        <div className="right sprite_playbar">
          <button className='btn sprite_playbar volume'></button>
          <button className='btn sprite_playbar loop' onClick={handleChangePlayMode}></button>
          <button className='btn sprite_playbar playlist'></button>
        </div>
      </BarOperator>
    </div>
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleTimeEnded}
    />
  </PlayerBarWrapper>


}
export default memo(AppPlayerBar)

