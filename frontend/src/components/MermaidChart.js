import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

export default function MermaidChart({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.innerHTML = `<div class="mermaid">${chart}</div>`;
      try {
        mermaid.init(undefined, ref.current);
      } catch (e) {
        ref.current.innerHTML = `<pre style="color:red">${e.message}</pre>`;
      }
    }
  }, [chart]);

  return <div ref={ref} />;
}
