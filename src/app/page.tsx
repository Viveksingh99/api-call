"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ApiCallWithReduxToolkit from "@/components/ApiCallWithReduxToolkit";
// import InputField from "@/components/InputField";
import ScheduleComponent from "@/components/ScheduleComponent";
import SelectFlightComponent from "@/components/SelectFlightState";
import SignupComponent from "@/components/SignUP";

export default function Home() {
  return (
    <Provider store={store}>
      {/* <InputField/> */}
      {/* <SimpleApiCall /> */}
      <SignupComponent/>
      <ApiCallWithReduxToolkit />
      <ScheduleComponent/>
      <SelectFlightComponent/>
    </Provider>
  );
}
