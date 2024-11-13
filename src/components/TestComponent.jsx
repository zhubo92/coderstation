import React, {memo} from 'react';

function TestComponent() {

    console.log('TestComponent渲染了');
    return (
        <div>TestComponent</div>
    );
}

export default memo(TestComponent);