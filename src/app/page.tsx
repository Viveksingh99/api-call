"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ApiCallWithReduxToolkit from "@/components/ApiCallWithReduxToolkit";

export default function Home() {
  return (
    <Provider store={store}>
      {/* <SimpleApiCall /> */}
      <ApiCallWithReduxToolkit />
    </Provider>
  );
}
