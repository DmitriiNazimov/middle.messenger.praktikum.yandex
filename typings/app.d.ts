import { Block, Route } from '../src/utils';

declare global {
  export type RouteType = null | Route;

  export type RouteProps = {
    pathname: string;
    blockClass: typeof Block<{}>;
    requestAuthorization: boolean;
    title?: string;
    data?: {};
    rootSelector?: string;
  };

  export type Routes = Record<string, RouteProps>;

  export type BlockComponent = Block<{}>;
  export type BlockClass = typeof Block<{}>;

  export type ValidateResult = Record<string, string[] | boolean>;

}
export {};
