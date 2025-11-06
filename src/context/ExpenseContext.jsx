import { createContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expense: [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expense: [...state.expense, action.payload] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expense: state.expense.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expense: state.expense.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case "SET_EXPENSE":
      return { ...state, expense: action.payload };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // save expense to  local storage when they change

  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expense));
    } catch (error) {
      console.error("Failed to save expenses to local storage: ", error);
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [state.expense]);

  return (
    <ExpenseContext.Provider value={{}}> {children} </ExpenseContext.Provider>
  );
};
