/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { CarouselCardType } from './CarouselCard';
interface CarouselProps {
    style?: StyleProp<ViewStyle>;
    countStyle?: StyleProp<ViewStyle>;
    items: CarouselCardType[];
    carouselWidth: number;
    carouselGap: number;
    onPress: (params?: CarouselCardType, index?: number) => void;
}
export declare const Carousel: ({ style, countStyle, items, carouselWidth, carouselGap, onPress, }: CarouselProps) => JSX.Element;
export {};
