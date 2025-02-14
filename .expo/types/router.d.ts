/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/trial`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/aiCover` | `/aiCover`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/myWork` | `/myWork`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/record` | `/record`; params?: Router.UnknownInputParams; } | { pathname: `${'/(subscribe)'}/subscribe` | `/subscribe`; params?: Router.UnknownInputParams; } | { pathname: `${'/(user-plan)'}/user-plan` | `/user-plan`; params?: Router.UnknownInputParams; } | { pathname: `/search/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/trial`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(record)'}/aiCover` | `/aiCover`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(record)'}/myWork` | `/myWork`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(record)'}/record` | `/record`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(subscribe)'}/subscribe` | `/subscribe`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(user-plan)'}/user-plan` | `/user-plan`; params?: Router.UnknownOutputParams; } | { pathname: `/search/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/trial${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(record)'}/aiCover${`?${string}` | `#${string}` | ''}` | `/aiCover${`?${string}` | `#${string}` | ''}` | `${'/(record)'}/myWork${`?${string}` | `#${string}` | ''}` | `/myWork${`?${string}` | `#${string}` | ''}` | `${'/(record)'}/record${`?${string}` | `#${string}` | ''}` | `/record${`?${string}` | `#${string}` | ''}` | `${'/(subscribe)'}/subscribe${`?${string}` | `#${string}` | ''}` | `/subscribe${`?${string}` | `#${string}` | ''}` | `${'/(user-plan)'}/user-plan${`?${string}` | `#${string}` | ''}` | `/user-plan${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/trial`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/aiCover` | `/aiCover`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/myWork` | `/myWork`; params?: Router.UnknownInputParams; } | { pathname: `${'/(record)'}/record` | `/record`; params?: Router.UnknownInputParams; } | { pathname: `${'/(subscribe)'}/subscribe` | `/subscribe`; params?: Router.UnknownInputParams; } | { pathname: `${'/(user-plan)'}/user-plan` | `/user-plan`; params?: Router.UnknownInputParams; } | `/search/${Router.SingleRoutePart<T>}` | { pathname: `/search/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
