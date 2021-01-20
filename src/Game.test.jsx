import Square from "./Square";
import Board from "./Board";
import Game from "./Game";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from "react-dom";

afterEach(() => {
    jest.restoreAllMocks();
  });

//   mock了以后 全部都这样了 reset 有bug
jest.mock('./Board', () => () => <div/>);

test('renderGameTest', () => {

    // jest.resetModules() 这个说是有bug
    // 注意顺序, 如果写在render后面就不会保存到第一次被call的数据了
    const calculateWinnerSpy = jest.spyOn(Game.prototype, "calculateWinner");
    const jumpToSpy = jest.spyOn(Game.prototype, "jumpTo");
    const content = render(<Game />);
    expect(content).toMatchSnapshot();
    
    expect(calculateWinnerSpy).toBeCalledTimes(1);

    const getByText = content.getByText;
    getByText("Next player: X");

    const reverseButton = getByText("Descending");
    const historyButton = getByText("Go to game start");
    reverseButton.click();
    getByText("ascending");
    historyButton.click();
    expect(jumpToSpy).toBeCalledTimes(1);

});

test('calculateWinnerTest', () => {
    const fakeSquares = [
        {hili: true, value: "X"},
        {hili: true, value: "X"},
        {hili: true, value: "X"},
        {hili: true, value: "O"},
        {hili: true, value: "O"},
        {hili: false},
        {hili: false},
        {hili: false},
        {hili: false}
    ];
    const func = Game.prototype.calculateWinner;
    const winner = func(fakeSquares);
    expect(winner).toBe("X");
});

test('should get (2,1)', () => {
    // const obj = new Game();
    const func = Game.prototype.getCoordinate;
    const coordinate = func(4);
    expect(coordinate).toBe(": (2,1)");
});

test('should return hili: false', () => {
    const func = Game.prototype.createSquare;
    const square = func();
    expect(square).toStrictEqual({hili: false});
});

test('should handleClick', () => {
    jest.spyOn(Game.prototype, "setState").mockImplementation(jest.fn());
    const game = new Game();
    game.handleClick(0);
    console.log(game.state.history)
    // handle click 还是得在render的时候测outcome 不要单独在这里测
    // setstate相关的不能直接用这种方式测 会被拒绝
});