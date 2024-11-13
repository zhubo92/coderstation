import React, {useMemo, useState} from 'react';
import TestComponent from "../components/TestComponent";
import {Button} from "antd";

function Test() {
    const [count, setCount] = useState(1);
    const [isRefresh, setIsRefresh] = useState(false);
    console.log('Test渲染了');

    return (
        <div>
            <div>count:{count}</div>
            <Button onClick={() => setCount( count + 1)}>+1</Button>
            <Button onClick={() => setIsRefresh(!isRefresh)}>show</Button>
            <TestComponent />
        </div>
    );
}

export default Test;