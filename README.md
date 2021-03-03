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
    style?: StyleProp<ViewStyle>;
    countStyle?: StyleProp<ViewStyle>;
    autoPlay?: boolean; // Default false
    autoPlayTime?: number; // Default 3000
    items: CarouselCardType[];
    carouselWidth: number;
    carouselGap: number;
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

## 참고

![](https://maruzzing.github.io/images/rn_carousel_01.png)

[참고 블로그](https://maruzzing.github.io/study/rnative/React-Native-%EC%BA%90%EB%9F%AC%EC%85%80(carousel)-%EB%A7%8C%EB%93%A4%EA%B8%B0/)
