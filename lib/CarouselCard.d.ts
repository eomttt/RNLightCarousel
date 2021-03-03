/// <reference types="react" />
interface CarouselCardProps {
    init: boolean;
    item: CarouselCardType;
    width: number;
    interval: number;
    active?: boolean;
    onPress?: (item?: any) => void;
}
export interface CarouselCardType {
    landingUrl?: string;
    imageUrl?: string;
    backgroundColor?: string;
}
export declare const CarouselCard: ({ init, item, active, width, interval, onPress, }: CarouselCardProps) => JSX.Element;
export declare const getStyles: (width: number, interval: number, backgroundColor?: string | undefined) => {
    image: {
        height: string;
        width: string;
    };
    imageWrapper: {
        borderRadius: number;
        height: number;
        overflow: "hidden";
        width: string;
        backgroundColor: string | undefined;
    };
    init: {
        bottom: number;
        left: number;
        position: "absolute";
        right: number;
        top: number;
    };
    overlay: {
        backgroundColor: string;
        bottom: number;
        left: number;
        position: "absolute";
        right: number;
        top: number;
    };
    shape: {
        alignItems: "center";
        height: number;
        justifyContent: "center";
        marginHorizontal: number;
        width: number;
    };
};
export {};
