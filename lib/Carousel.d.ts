/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { CarouselCardType } from './CarouselCard';
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
export declare const Carousel: ({ style, countStyle, items, carouselWidth, carouselGap, autoPlay, autoPlayTime, onPress, }: CarouselProps) => JSX.Element;
export {};
