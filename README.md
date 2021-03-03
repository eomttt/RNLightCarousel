# RNLightCarousel

## Install
> yarn add react-native-light-carousel

or
> npm i react-native-light-carousel

## Usage

![](https://user-images.githubusercontent.com/22593217/109741073-b3edec80-7c0f-11eb-83e0-599bcb30df73.gif)
![](https://user-images.githubusercontent.com/22593217/109741063-b18b9280-7c0f-11eb-9efd-764ed60093a6.gif)

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
