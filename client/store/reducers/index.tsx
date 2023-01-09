import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, Reducer } from "redux";
import { albumReducer } from "./albumReducer";
import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";

const rootReducer= combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer
})

export type RootState= ReturnType<typeof rootReducer>

export const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
