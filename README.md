# RNLightCarousel

## Install
> yarn add RNLightCarousel

or
> npm install RNLightCarousel

## Usage

![](https://maruzzing.github.io/images/rn_carousel_01.png)

```tsx
  interface CarouselCardType {
    landingUrl: string;
    imageUrl: string;
  }

  interface CarouselProps {
    style?: StyleProp<ViewStyle>;
    countStyle?: StyleProp<ViewStyle>;
    items: CarouselCardType[];
    carouselWidth: number;
    carouselGap: number;
    onPress: (params?: CarouselCardType, index?: number) => void;
  }

  <Carousel
    items={[]}
    carouselWidth={5}
    carouselGap={5}
    onPress={() => {}}
    style={styles.style}
    countStyle={styles.countStyle}
  />
```

## 참고

[참고 블로그](https://maruzzing.github.io/study/rnative/React-Native-%EC%BA%90%EB%9F%AC%EC%85%80(carousel)-%EB%A7%8C%EB%93%A4%EA%B8%B0/)
