import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {CarouselCard, CarouselCardType} from './CarouselCard';

const AUTOPLAY_TIME = 3000;
const AUTOPLAY_DRAG_TIME = 300;
const MINIMUM_ITEMS = 2;

const isAndroid = () => Platform.OS === 'android';

interface CarouselProps {
  style?: StyleProp<ViewStyle>;
  countStyle?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  autoPlayTime?: number;
  items: CarouselCardType[];
  carouselWidth: number;
  carouselGap: number;
  onPress?: (params?: CarouselCardType, index?: number) => void;
}

const useLoopItems = (
  cardCountInoffset: number,
  items: CarouselCardType[],
  setScrollIndex: (index: number) => void,
) =>
  useMemo(() => {
    const {length: itemsLen} = items;
    // 기본적으로 [last - 1, last, 0, 1, 2, 3 ...]
    let newItems = [
      ...items.slice(-MINIMUM_ITEMS),
      ...items.slice(0, itemsLen - MINIMUM_ITEMS),
    ];
    setScrollIndex(MINIMUM_ITEMS);

    // 갯수가 3라면 다음과 같이 되기 때문에 [1, 2, 0] 3 개 부터는 밑의 로직을 따름
    // [0, 1, 2, 0, 1, 2, 0, 1, 2] <- 3
    // [0, 1, 0, 1, 0, 1] <- 2
    // [0, 0, 0] <- 1
    if (itemsLen <= MINIMUM_ITEMS + 1) {
      newItems = [...items, ...items, ...items];
      setScrollIndex(itemsLen);
    }

    // offset 에서 보여지는 카드 갯수가 작은 경우
    if (MINIMUM_ITEMS <= cardCountInoffset) {
      // item 갯수 자체가 작은경우 clone 하여 갯수를 맞춰준다.
      if (itemsLen <= cardCountInoffset * 3) {
        newItems = [];
        while (newItems.length <= cardCountInoffset * 3) {
          newItems = [...newItems, ...items];
        }
        const centerItemsLen = Math.floor(newItems.length / itemsLen / 2);
        setScrollIndex(centerItemsLen * itemsLen);
      } else {
        // item 갯수는 적절한데 MINIMUM_ITEMS 보다 offset 에서 보여지는 갯수가 작은 경우, 반으로 나눠서 붙여준다.
        const half = Math.floor(itemsLen / 2);
        newItems = [...items.slice(-half), ...items.slice(0, itemsLen - half)];
        setScrollIndex(half);
      }
    }
    return newItems;
  }, [cardCountInoffset, items, setScrollIndex]);

// 참고: https://maruzzing.github.io/study/rnative/React-Native-%EC%BA%90%EB%9F%AC%EC%85%80(carousel)-%EB%A7%8C%EB%93%A4%EA%B8%B0/
const AnimatedView = Animated.createAnimatedComponent(View);

export const Carousel = ({
  style,
  countStyle,
  items,
  carouselWidth,
  carouselGap,
  autoPlay,
  autoPlayTime = AUTOPLAY_TIME,
  onPress,
}: CarouselProps) => {
  const carouselRef = useRef<FlatList<any>>();
  const {width} = useWindowDimensions();

  const [autoplayTimeout, setAutoplayTimeout] = useState<any>();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [initLayout, setInitLayout] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const fowardAnim = useRef(new Animated.Value(0)).current;
  const backwardAnim = useRef(new Animated.Value(0)).current;

  const snapInterval = useMemo(() => carouselWidth + carouselGap, [
    carouselGap,
    carouselWidth,
  ]);
  const offset = useMemo(
    () => (width - (carouselWidth + carouselGap * 2)) / 2,
    [width, carouselGap, carouselWidth],
  );
  // offset 영역에 들어가는 캐러셀 카드 갯수
  const cardCountInoffset = useMemo(
    () => Math.ceil(offset / (carouselWidth + carouselGap)),
    [offset, carouselGap, carouselWidth],
  );

  const itemsLen = useMemo(() => items.length, [items.length]);
  const loopItems = useLoopItems(cardCountInoffset, items, setScrollIndex);

  const [data, setData] = useState([...loopItems]);
  const [page, setPage] = useState(1);

  const carouselStyle = useMemo(
    () => ({
      transform: [
        {
          translateX: fowardAnim.interpolate({
            inputRange: [0, 1],
            // 초기 렌더링시에 array가 0 -> scrollIndex 로 이동하는데, 덜컥거리는 문제가 있어서
            // 초기 렌더링 전에는 transform 하여 덜컥거리는 효과를 방지해본다 ㅠㅠ
            outputRange: [initLayout ? 0 : -snapInterval, -snapInterval],
          }),
        },
        {
          // 안드로이드에서 드래그 스크롤시에 깜빡이는 문제가 있는데 애니메이션으로 눈속임이 가능 ㅎㅎ
          // 헌데 foward animation만 있어서 backward animation 도 추가
          translateX: backwardAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, snapInterval],
          }),
        },
      ],
    }),
    [fowardAnim, backwardAnim, initLayout, snapInterval],
  );

  const onLayout = useCallback(() => {
    if (carouselRef.current) {
      carouselRef?.current.scrollToIndex({
        animated: false,
        index: scrollIndex,
      });
      setInitLayout(true);
    }
  }, [scrollIndex]);

  const getItemLayout = useCallback(
    // eslint-disable-next-line no-shadow
    (data, index: number) => ({
      index,
      length: carouselWidth,
      offset: snapInterval * index,
    }),
    [carouselWidth, snapInterval],
  );

  const setFowardScroll = useCallback(() => {
    setData((prev) => {
      const item = prev.slice(0, 1)[0];
      return [...prev.slice(1), item];
    });
    setPage((prev) => {
      const next = prev + 1;
      if (next > itemsLen) {
        return 1;
      }
      return next;
    });
  }, [itemsLen]);

  const fowardScrollAnim = useCallback(
    (duration: number) => {
      Animated.timing(fowardAnim, {
        duration,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        setFowardScroll();
        fowardAnim.setValue(0);
      });
    },
    [fowardAnim, setFowardScroll],
  );

  const setBackwardScroll = useCallback(() => {
    setData((prev) => {
      const item = prev.slice(-1)[0];
      return [item, ...prev.slice(0, -1)];
    });
    setPage((prev) => {
      const next = prev - 1;
      if (next < 1) {
        return itemsLen;
      }
      return next;
    });
  }, [itemsLen]);

  const backwardScrollAnim = useCallback(
    (duration: number) => {
      Animated.timing(backwardAnim, {
        duration,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        setBackwardScroll();
        backwardAnim.setValue(0);
      });
    },
    [backwardAnim, setBackwardScroll],
  );

  const startAutoplay = useCallback(() => {
    clearTimeout(autoplayTimeout);
    const timer = setTimeout(() => {
      carouselRef.current?.scrollToIndex({
        index: scrollIndex,
      });
      fowardScrollAnim(AUTOPLAY_DRAG_TIME);
    }, autoPlayTime);
    setAutoplayTimeout(timer);
  }, [autoPlayTime, autoplayTimeout, scrollIndex, fowardScrollAnim]);

  const stopAutoplay = useCallback(() => {
    clearTimeout(autoplayTimeout);
    setAutoplayTimeout(null);
  }, [autoplayTimeout]);

  const onScrollBeginDrag = useCallback(() => {
    setScrolling(true);
    stopAutoplay();
  }, [stopAutoplay]);

  const moveScrollAndroid = useCallback(
    (isFowardScroll: boolean) => {
      if (isFowardScroll) {
        fowardScrollAnim(10);
      } else {
        backwardScrollAnim(10);
      }
    },
    [backwardScrollAnim, fowardScrollAnim],
  );

  const moveScroll = useCallback(
    (isFowardScroll: boolean) => {
      if (isFowardScroll) {
        setFowardScroll();
      } else {
        setBackwardScroll();
      }
    },
    [setBackwardScroll, setFowardScroll],
  );

  const onScrollEndDrag = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset} = nativeEvent;
      const index = Math.floor(contentOffset.x / snapInterval);
      const isFowardScroll = index >= scrollIndex;

      carouselRef.current?.scrollToIndex({
        animated: false,
        index: scrollIndex,
      });

      if (isAndroid()) {
        moveScrollAndroid(isFowardScroll);
      } else {
        moveScroll(isFowardScroll);
      }

      setScrolling(false);
    },
    [snapInterval, scrollIndex, moveScrollAndroid, moveScroll],
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <AnimatedView style={carouselStyle}>
        <CarouselCard
          init={initLayout}
          item={item}
          width={carouselWidth}
          interval={carouselGap / 2}
          active={index === scrollIndex}
          onPress={() => onPress?.(item, index)}
        />
      </AnimatedView>
    ),
    [
      carouselStyle,
      initLayout,
      scrollIndex,
      carouselWidth,
      carouselGap,
      onPress,
    ],
  );

  useEffect(() => {
    if (!scrolling && autoPlay) {
      startAutoplay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, scrolling, autoPlay]);

  return (
    <View style={[styles.wrapper, style]}>
      <FlatList
        ref={carouselRef as any}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          marginHorizontal: offset + carouselGap / 2,
        }}
        getItemLayout={getItemLayout}
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `${item.id}`}
        pagingEnabled
        renderItem={renderItem}
        initialNumToRender={itemsLen}
        snapToInterval={snapInterval}
        snapToAlignment="start"
        onLayout={onLayout}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={isAndroid() ? undefined : onScrollEndDrag}
        onMomentumScrollEnd={isAndroid() ? onScrollEndDrag : undefined}
      />
      <View style={[styles.shape, countStyle]}>
        <Text style={styles.text}>
          {page} / {itemsLen}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shape: {
    backgroundColor: '#0004',
    borderColor: '#FFF2',
    borderRadius: 15,
    borderWidth: 1,
    bottom: 22,
    paddingHorizontal: 12,
    paddingVertical: 5,
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  wrapper: {
    marginBottom: 14,
    marginTop: 10,
  },
});
