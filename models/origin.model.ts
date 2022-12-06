import { Point } from "react-native-google-places-autocomplete";

export interface IOrigin {
    location: Point | undefined;
    description: string
}