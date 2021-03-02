import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface CarouselCardProps {
  init: boolean;
  item: CarouselCardType;
  width: number;
  interval: number;
  active?: boolean;
  onPress?: (item?: any) => void;
}

export interface CarouselCardType {
  landingUrl: string;
  imageUrl: string;
}

export const CarouselCard = ({
  init,
  item,
  active,
  width,
  interval,
  onPress,
}: CarouselCardProps) => {
  const fadeAnim = useRef(new Animated.Value(active ? 0 : 0.5));
  const styles = getStyles(width, interval);
  const onPressItem = useCallback(() => onPress?.(item), [onPress, item]);

  useEffect(() => {
    Animated.timing(fadeAnim.current, {
      duration: 200,
      toValue: active ? 0 : 0.5,
      useNativeDriver: true,
    }).start();
  }, [active, fadeAnim]);

  const overlayStyle = useMemo(
    () => ({
      opacity: fadeAnim.current,
    }),
    [fadeAnim],
  );

  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View style={styles.shape}>
        <View style={styles.imageWrapper}>
          <Image
            key={item?.landingUrl}
            style={styles.image}
            source={{uri: item.imageUrl}}
          />
          <Animated.View style={[styles.overlay, overlayStyle]} />
          {!init && <View style={styles.init} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const getStyles = (width: number, interval: number) =>
  StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
    },
    imageWrapper: {
      borderRadius: 6,
      height: width * 0.66,
      overflow: 'hidden',
      width: '100%',
    },
    init: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    overlay: {
      backgroundColor: '#000',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    shape: {
      alignItems: 'center',
      height: width * 0.66,
      justifyContent: 'center',
      marginHorizontal: interval,
      width,
    },
  });
