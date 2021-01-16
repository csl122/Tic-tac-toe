import React from 'react';
import Board from './Board';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        // let obj = {value: null, hili: false};
        let squaresBase = [];
        for (let i = 0; i < 9; i++) {
            squaresBase.push(this.createSquare());
            // squaresBase.push(new Asquare());
        }
        console.log(squaresBase);
        // 三个可定义的state
        this.state = {
        // 最多九次历史记录
        history: [
            {
            // squares: [ {value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false},{value:null, hili:false}]
            squares: squaresBase
        }
        ],
        // 步数统计
        stepNumber: 0,
        // x是否是下一个
        xIsNext: true,
        ascending: true,
        tie: false
        };
    }
    createSquare() {
        return {hili: false};
    }
    Asquare() {
        this.value=null;
        this.hili=false;
    }

    // 处理点击事件
    handleClick(i) {
        // 截取一个到现在为止大小的副本
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // 取到现在的这个
        const current = history[history.length - 1];
        // 获取squares的棋盘副本
        const squares = JSON.parse(JSON.stringify(current.squares));


        // 如果点了有东西的,或者已经获胜了,不进行操作
        if (this.calculateWinner(squares) || squares[i].value) {
            console.log(this.state.tie);
        return;
        }

        this.updateTie(squares);

        // 给点的这个按钮记录上值
        squares[i].value = this.state.xIsNext ? "X" : "O";


        this.setState({
        // 最新状态接上去
        history: history.concat([
            {
            squares: squares,
            index: i
            }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
        });
    }

    updateTie(squares){
        // 平局的判定
        if (!this.calculateWinner(squares) && this.state.stepNumber >=8)
        {
            this.setState({tie: true});
        }else{
            this.setState({tie: false});
        }
    }

    // 调整步数计数和下一步的用户
    jumpTo(step) {
        // 截取一个到现在为止大小的副本
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // 取到现在的这个
        const current = history[history.length - 1];
        // 获取squares的棋盘副本
        const squares = JSON.parse(JSON.stringify(current.squares));
        this.updateTie(squares);
        this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
        });
    }


    render() {
        // 这里不需要副本
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        console.log(history);
        // 根据现在的squares来判断胜利者
        const winner = this.calculateWinner(current.squares);

        // const historyCopy = this.state.ascending?history:history.slice(0).reverse();
        // 遍历每一步的移动
        const moves = history.map((step, move) => {
        let index = this.state.ascending ? move : history.length - 1 - move;
        let currentStep = history[index];
        let currentIndex = currentStep.index+1;
        //Q1 
        const coordinate = ': (' + Math.ceil(currentIndex/3) + ',' + (currentIndex%3 ? currentIndex%3 : currentIndex%3 + 3) + ')'
        // 创建描述语句
        const desc = index ?
            'Go to move #' + index + coordinate:
            'Go to game start';

        // Q2
        return (
            <li key={index}>
            {/* 回到某一步 */}
            <button key={index} className={index===this.state.stepNumber?'button_active':''} onClick={() => {
                this.jumpTo(index);
            }}>{desc}</button>
            </li>
        );
        });

        // 定义现在的游戏状态
        let status;
        if (winner) {
        status = "Winner: " + winner;
        } else {
            if (this.state.tie)
            {
                status = "Tie";
            }
            else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            {/* Q4 */}
            <button onClick={() => this.setState({ascending: !this.state.ascending})}>{this.state.ascending?'Descending':'ascending'}</button>
            {/* 全部打印一遍每次的记录 */}
            <ol className={this.state.ascending?'':'descendingList'}>{moves}</ol>
            </div>
        </div>
        );
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                squares[a].hili=true;
                squares[b].hili=true;
                squares[c].hili=true;
                // document.getElementById(a).style.backgroundColor="yellow";
                return squares[a].value;
            }
        }
        return null;
    }
}



export default Game;