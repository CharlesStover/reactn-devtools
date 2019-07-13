import { addCallback, getGlobal } from 'reactn';
import { Reducers, State } from 'reactn/default';
import Callback from 'reactn/types/callback';
import Dispatchers from 'reactn/types/dispatchers';
import ReactNProvider from 'reactn/types/provider';
import {
  Action,
  compose,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';



type BooleanFunction = () => boolean;

type DevToolsAction<G extends {} = State> =
  DevToolsReducerAction<G> |
  DevToolsStateChangeAction<G, 'STATE_CHANGE'>;

interface DevToolsReducerAction<G extends {} = State>
extends DevToolsStateChangeAction<G, string> {
  args: any[];
}

interface DevToolsStateChangeAction<G, T = string> extends Action<T> {
  stateChange: Partial<G>;
}

interface EnhancerOptions {
  name: string;
}

export interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (options: EnhancerOptions) =>
    typeof compose;
}



const reducer = <G extends {} = State>(
  state: G,
  action: DevToolsAction<G>,
) => ({
  ...state,
  ...action.stateChange,
});

const REDUX_DEVTOOLS_OPTIONS: EnhancerOptions = {
  name: 'ReactN',
};

declare const window: Window | void;



export default function addReactNDevTools<
  G extends {} = State,
  R extends {} = Reducers,
>(
  Provider: ReactNProvider<G, R> = null,
): BooleanFunction {

  if (
    typeof window !== 'object' ||
    !window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    return (): boolean => true;
  }

  // Enhance the store with Redux DevTools.
  const storeEnhancer: StoreEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION__(REDUX_DEVTOOLS_OPTIONS);

  // Create the store.
  const store: Store<G, DevToolsAction<G>> =
    createStore<G & any, DevToolsAction<G>, {}, {}>(
      reducer,
      Provider
        ? Provider.global
        : getGlobal<G>(),
      storeEnhancer,
    );

  const callback: Callback<G, R> = (
    _newGlobalState: G,
    _dispatch: Dispatchers<G, R>,
    stateChange: Partial<G>,
    reducerName?: string,
    reducerArgs?: any[],
  ): null => {
    if (reducerArgs) {
      store.dispatch({
        args: reducerArgs,
        stateChange,
        type: reducerName,
      });
    }
    else {
      store.dispatch({
        stateChange,
        type: 'STATE_CHANGE',
      });
    }
    return null;
  };

  if (Provider) {
    return Provider.addCallback(callback);
  }
  return addCallback(callback);
}
