import { useReducer } from "react";

interface State {
  count: number;
  double: number;
}

type Action = { type: "INCREMENT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT": {
      const newCount = state.count + 1;
      return {
        count: newCount,
        double: newCount * 2, // always in sync
      };
    }
    default:
      return state;
  }
}

export function WithUseReducerCorrect() {
  const [state, dispatch] = useReducer(reducer, { count: 0, double: 0 });

  console.log(state);

  return (
    <div>
      <h3>useReducer (Correct)</h3>
      <p>Count: {state.count}</p>
      <p>Double: {state.double}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
    </div>
  );
}
