import { ReactNProvider } from 'reactn/build/create-provider';
import { Reducers, State } from 'reactn/default';
import {
  composeWithDevTools,
  devToolsEnhancer,
} from 'redux-devtools-extension/developmentOnly';
import addReactNDevTools, { Window } from '../src/index';


declare module 'reactn/default' {
  interface State {
    x: boolean;
    y: number;
    z: string;
  }
}

type A = [ ReactNProvider<State, Reducers>? ];

type BooleanFunction = () => boolean;



declare const global: { window: Window };



describe('ReactN DevTools', (): void => {

  beforeEach(async (): Promise<void> => {
    global.window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn(devToolsEnhancer);
    global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
      jest.fn(composeWithDevTools);
  });

  afterEach(async (): Promise<void> => {
    delete global.window.__REDUX_DEVTOOLS_EXTENSION__;
    delete global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  });



  it('should be a function with 1 argument', (): void => {
    expect(addReactNDevTools).toBeInstanceOf(Function);
    expect(addReactNDevTools.length).toBe(1);
  });

  it('should return a function that returns true', (): void => {
    const removeReactNDevTools: BooleanFunction = addReactNDevTools();
    expect(removeReactNDevTools).toBeInstanceOf(Function);
    expect(removeReactNDevTools.length).toBe(0);
    expect(removeReactNDevTools()).toBe(true);
  });

  it('should call Redux DevTools extension', (): void => {
    addReactNDevTools();
    expect(global.window.__REDUX_DEVTOOLS_EXTENSION__).toBeCalledTimes(1);
  });
});
