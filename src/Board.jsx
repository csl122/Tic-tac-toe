import React from 'react';
import Square from './Square';
import './index.css';

// 棋盘
class Board extends React.Component {
    // 制定一个特定的框框的原生函数
    renderSquare(i) {
        return (
        <Square
            position={i}
            // Game类传进来的squares props, 记录了每个按钮上的文字
            value={this.props.squares[i]}
            // Game类传进来的一个函数, 有了括号是自执行, 所以要用箭头函数来把它变成一个函数引用
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        var count = -1;
        return (
        <div>
            {
                [1,2,3].map((row) => {
                    return (
                        <div key={row} className="board-row">
                            {
                                [1,2,3].map((col) => {
                                    count++;
                                    return this.renderSquare(count);
                                    
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
        );
    }
}

export default Board;