interface IDistance {
  text: string;
  value: number;
}

interface IDuration {
  text: string;
  value: number;
}

export interface ITravelTime {
  distance: IDistance;
  duration: IDuration;
}
