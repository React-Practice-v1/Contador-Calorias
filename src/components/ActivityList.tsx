/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, Dispatch } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivitiesProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivitiesProps) => {
  // console.log(activities);

  const categoryName = useMemo(
    () => (category: Activity["category"]) => categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmptyActivities = useMemo(() => activities.length == 0, [activities]);
  return (
    <>
      <h2 className="text-3xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

      {isEmptyActivities ? (
        <p className="text-center mt-5 text-xl">No hay actividades aun</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow-xl">
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
              ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5"> {activity.name} </p>
              <p className="font-black text-4xl text-lime-500"> {activity.calories} </p>
            </div>
            <div>
              <button onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}>
                <PencilSquareIcon className="size-8 text-gray-800" />
              </button>
              <button onClick={() => dispatch({ type: "remove-activity", payload: { id: activity.id } })}>
                <XCircleIcon className="size-8 text-red-800" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
