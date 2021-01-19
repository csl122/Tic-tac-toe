import Square from "./Square";
import Board from "./Board";
import Game from "./Game";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from "react-dom";

jest.mock('./Board', () => () => <div/>);

test('renderGameTest', () => {
    
    const content = render(<Game />);
    expect(content).toMatchSnapshot();
    const getByText = content.getByText;
    getByText("Next player: X");
    const reverseButton = getByText("Descending");
    const historyButton = getByText("Go to game start");
    reverseButton.click();
    getByText("ascending");
    historyButton.click();
});

