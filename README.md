# RNLightCarousel

## Install
> yarn add RNLightCarousel

or
> npm install RNLightCarousel

## Usage

![](https://im4.ezgif.com/tmp/ezgif-4-a2d9267e35f9.gif)

```tsx
  interface CarouselCardType {
    landingUrl?: string;
    imageUrl?: string;
    backgroundColor?: string;
  }

  interface CarouselProps {
    style?: StyleProp<ViewStyle>; // Carousel list wrapper style
    countStyle?: StyleProp<ViewStyle>; // Carousel count style
    autoPlay?: boolean; // Default false
    autoPlayTime?: number; // Default 3000
    items: CarouselCardType[];
    carouselWidth: number; // 하단 그림 참조
    carouselGap: number; // 하단 그림 참조
    onPress?: (params?: CarouselCardType, index?: number) => void;
  }

  <Carousel
    items={[]}
    carouselWidth={5}
    carouselGap={5}
    style={styles.style}
    countStyle={styles.countStyle}
  />
```

![](https://user-images.githubusercontent.com/22593217/109735857-c6aff380-7c06-11eb-9d4a-e6bebe360c78.png)

## [참고](https://maruzzing.github.io/study/rnative/React-Native-%EC%BA%90%EB%9F%AC%EC%85%80(carousel)-%EB%A7%8C%EB%93%A4%EA%B8%B0/)
