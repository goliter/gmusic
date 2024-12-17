import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

interface IProps {
  children?: ReactNode
}
const TopBanner: FC<IProps> = () => {
  const [current, setCurrent] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  function handlePrevClick() {
    bannerRef.current?.prev()
  }

  function handleNextClick() {
    bannerRef.current?.next()
  }
  function handleBeforeChange() {
    // setCurrent(-1)
  }
  function handleAfterChange(current: number) {
    setCurrent(current)
  }
  let bgImageUrl
  if (current >= 0 && banners.length > 0) {
    bgImageUrl = banners[current]?.imageUrl + '?imageView&blur=40x20'
  }

  return (
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}')
  center center/6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            dots={false}
            autoplay
            ref={bannerRef}
            autoplaySpeed={2000}
            effect="fade"
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img src={item.imageUrl} className="image" />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === current
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
