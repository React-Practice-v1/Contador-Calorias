import { Activity } from "../types";

export type ActivityActions = {
  type: "save-activity";
  payload: {
    newActivity: Activity;
  };
};

type ActivityState = {
  activities: Activity[];
};

export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
  if (action.type === "save-activity") {
    // ACA SE ACTUALIZA EL STATE
    // console.log(action.payload.newActivity);
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }

  return state;
};
