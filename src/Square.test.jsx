import Square from './Square';
import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from "react-dom";

/*
// 以下代码是使用react-dom中的render的时候, 如果使用rtl的话就不需要了
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
//   如果要append一个不能放在div下的东西的话, 可以用下面的方式自定义
//   container = document.createElement("table");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

*/

test('renderTest ', () => {
    const fakeOnClick = jest.fn()
    const content = render(
        <Square 
            value='testButton'
            position={1}
            hili={true}
            onClick={fakeOnClick}
        />,// 下面这些通常情况下是不需要的
        {container: document.body.appendChild(document.createElement("div"))}
    );
    const getByText = content.getByText;
    expect(fakeOnClick).toBeCalledTimes(0);
    const button = getByText("testButton");
    userEvent.click(button);
    expect(fakeOnClick).toBeCalledTimes(1);
    expect(content).toMatchSnapshot();
    

})
