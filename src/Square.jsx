// 一个正方形的框框,使用button作为一个框框
function Square(props) {
    return (
        // 没有括号不是自执行函数
        <button
            key={props.value}
            id={props.position}
            className={props.hili ? "hiliSquare" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;
