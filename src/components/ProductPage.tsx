import * as React from "react";
import type { PageContent } from "../content";
import Page from "./Page";

export type PageProps = {
  blok: PageContent;
};

function ProductPage(props: PageProps) {
  return <Page {...props} />;
}

export default ProductPage;
