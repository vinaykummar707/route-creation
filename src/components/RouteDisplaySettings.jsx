import * as Tabs from "@radix-ui/react-tabs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
import LedSignBoard from "./LedSignBoard";
import DisplaySettingsForm from "./DisplaySettingsForm";
import ConfigurationForm from "./FullScreenConfigurationForm";
import SideWithSingleTextBoardConfigurationForm from "./SideWithSingleTextConfiguration";
import SideWithTwoHalfsBoard from "./SideWithTwoHalfsBoard";
import axios from "axios";
import BoardConfiguration from "./BoardConfiguration";
import FullScreenBoard from "./FullScreenBoard";
import SideWithSingleTextBoard from "./SideWithSingleTextBoard";
import Bus from "./test";

const RouteDisplaySettings = ({ route, displayConfig, handleConfigChange }) => {
  return <Bus />;
};

export default RouteDisplaySettings;
