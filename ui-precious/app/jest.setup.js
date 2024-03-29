// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { loadEnvConfig } from "@next/env";
import * as globalConfig from "../storybook/.storybook/preview";
import { setGlobalConfig } from "@storybook/testing-react";

const loadEnvironments = () => loadEnvConfig(process.cwd());

loadEnvironments();
setGlobalConfig(globalConfig);

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

jest.isolateModules(() => {
  const preloadAll = require("jest-next-dynamic");
  beforeAll(async () => {
    await preloadAll();
  });
});

const resizeObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});
window.ResizeObserver = jest.fn().mockImplementation(resizeObserverMock);
