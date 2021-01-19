import Square from "./Square";
import Board from "./Board";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from "react-dom";

const func = () => {
  return <button> hello </button>;
};

jest.mock("./Square", () => func);

afterAll(() => {
  jest.restoreAllMocks();
});

test("renderBoardTest", () => {
  const renderSquareSpy = jest
    .spyOn(Board.prototype, "renderSquare")
    .mockImplementation((i) => {
      return <Square key={i} />;
    });

  const content = render(<Board />);
  expect(content).toMatchSnapshot();
  expect(renderSquareSpy).toBeCalledTimes(9);
});
