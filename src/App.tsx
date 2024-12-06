import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + TypeScript Demo</h1>
      <p>当前计数值：{count}</p>
      <div>
        <button onClick={increment} style={{ marginRight: '10px' }}>
          增加
        </button>
        <button onClick={decrement}>减少</button>
      </div>
    </div>
  );
};

export default App;
