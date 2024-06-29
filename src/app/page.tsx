"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ApiCallWithReduxToolkit from "@/components/ApiCallWithReduxToolkit";
import InputField from "@/components/InputField";

export default function Home() {
  return (
    <Provider store={store}>
      <InputField/>
      {/* <SimpleApiCall /> */}
      <ApiCallWithReduxToolkit />
    </Provider>
  );
}
