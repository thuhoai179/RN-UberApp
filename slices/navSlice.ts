import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrigin } from '../models/origin.model';
import { ITravelTime } from '../models/travelTime.model';
import { RootState } from '../reducers';

interface IInitialState {
  origin: IOrigin | null;
  destination: IOrigin | null;
  travelTimeInformation: ITravelTime | null;
}

const initialState: IInitialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const { actions, reducer } = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<IOrigin | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<IOrigin | null>) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state, action: PayloadAction<ITravelTime | null>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfo } = actions;
export default reducer;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInfo = (state: RootState) => state.nav.travelTimeInformation;
