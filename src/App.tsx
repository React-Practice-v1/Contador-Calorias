import { useEffect, useMemo, useReducer } from "react";
import { Form } from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { ActivityList } from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  // console.log(state);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-lg text-center font-bold text-white uppercase">Contador de Calorias</h1>
          <button
            className="bg-red-500 hover:bg-red-800 p-2 font-bold rounded-lg uppercase text-white cursor-pointer disabled:opacity-50"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-activity" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto ">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
