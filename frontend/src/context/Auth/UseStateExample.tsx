import { useState } from "react";

export default function WithUseStateManualUpdate() {
  const [count, setCount] = useState(0);
  const [double, setDouble] = useState(0);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setDouble(count * 2); // ❌ uses stale value of count
  };

  console.log("count:", count, "double:", double);

  return (
    <div>
      <h3>useState Manual Update (Broken)</h3>
      <p>Count: {count}</p>
      <p>Double: {double}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
