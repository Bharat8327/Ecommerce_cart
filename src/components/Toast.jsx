import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useCallback,
} from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const ToastContext = createContext();

const toastTimeouts = new Map();

const addToRemoveQueue = (toastId, dispatch) => {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId, action.dispatch);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, action.dispatch);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t,
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

export function ToastProvider({ children }) {
  const [state, dispatchBase] = useReducer(reducer, { toasts: [] });

  // Wrap dispatch to inject itself for side effects
  const dispatch = useCallback(
    (action) => {
      if (action.type === actionTypes.DISMISS_TOAST) {
        dispatchBase({ ...action, dispatch });
      } else {
        dispatchBase(action);
      }
    },
    [dispatchBase],
  );

  const toast = useCallback(
    ({ ...props }) => {
      const id = genId();
      const dismiss = () =>
        dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
      const update = (props) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        });

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss();
          },
        },
      });

      return { id, dismiss, update };
    },
    [dispatch],
  );

  const dismiss = useCallback(
    (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    [dispatch],
  );

  return (
    <ToastContext.Provider value={{ ...state, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
