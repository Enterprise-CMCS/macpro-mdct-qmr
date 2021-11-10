import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.React = React;
configure({ adapter: new Adapter() });
