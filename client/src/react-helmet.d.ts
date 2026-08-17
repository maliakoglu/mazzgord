declare module "react-helmet" {
  import * as React from "react";
  interface HelmetProps extends React.HTMLAttributes<HTMLHeadElement> {
    children?: React.ReactNode;
  }
  export class Helmet extends React.Component<HelmetProps> {}
  export default Helmet;
}
