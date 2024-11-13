import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export const Form = ({ dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isNumberField = ["category", "calories"].includes(e.target.name);
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: isNumberField ? +value : value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          CATEGORÍA:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          ACTIVIDAD:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          name="name"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          CALORÍAS:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías Ej. 200 o 500"
          name="calories"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold
        uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />

      {/* <button
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold
        uppercase text-white cursor-pointer disabled:opacity-10"
        disabled={!isValidActivity()}
      >
        {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      </button> */}
    </form>
  );
};
