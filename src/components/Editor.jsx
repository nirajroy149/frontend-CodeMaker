import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/abbott.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  const themeOptions = [
    "dracula",
    "3024-day",
    "3024-night",
    "abbott",
    "abcdef",
    "cobalt",
    "ambiance",
    "ayu-dark",
    "eclipse",
    "elegant",
    "vibrant-ink",
    "rubyblue",
    "seti",
    "shadowfox",
  ];
  const modeOptions = {
    javascript: { name: "javascript", json: true },
    python: { name: "python" },
    cplusplus: { name: "text/x-c++src" },
    java: { name: "text/x-java" },
    xml: { name: "xml" },
  };

  function handleThemeChange(e) {
    const theme = e.target.value;
    editorRef.current.setOption("theme", theme);
  }

  function handleModeChange(e) {
    const mode = e.target.value;
    editorRef.current.setOption("mode", modeOptions[mode]);
  }

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("editor-textArea"),
        {
          mode: modeOptions.javascript,
          theme: "dracula",
          autoCloseTag: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      /// this will be executed when the value of textarea change.
      //on change here is the event listner of the codemirror
      // instances => editor instance
      editorRef.current.on("change", (instance, changes) => {
        //origin will be +input if something is added
        //orign will be paste if something is pasted
        //origin will be cut if someting is deleted from textarea.
        const { origin } = changes;
        //getting all the content of editor.
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code != null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <>
      {/* Controls */}
      <CustomizeButtons
        handleModeChange={handleModeChange}
        handleThemeChange={handleThemeChange}
        themeOptions={themeOptions}
      />

      <textarea id="editor-textArea"></textarea>
    </>
  );
}

function CustomizeButtons({
  handleModeChange,
  handleThemeChange,
  themeOptions,
}) {
  return (
    <>
      <div className="flex flex-wrap text-[15px] justify-between p-2">
        <div>
          <label htmlFor="theme-select">Theme:</label>
          <select
            className="text-black ml-3 cursor-pointer"
            onChange={handleThemeChange}
          >
            {themeOptions.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mode-select">Language:</label>
          <select
            className="text-black ml-3 cursor-pointer"
            onChange={handleModeChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cplusplus">C++</option>
            <option value="java">Java</option>
            <option value="xml">XML</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Editor;
