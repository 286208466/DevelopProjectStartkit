/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.png" {
  const src: string;
  export default src;
}

//声明window上的自定义属性
declare interface Window {
  Cesium: any;
  maptalks: any;
}
