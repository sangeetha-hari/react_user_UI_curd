import React from "react";

export default function (probs) {
  return (
    <div>
      <button
        style={{ backgroundColor: `${probs.count%2==0? 'red': 'green'}` }}
        onClick={probs.handler}
      >
        Increment
      </button>

      {probs.count}
    </div>
  );
}
