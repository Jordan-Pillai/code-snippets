"use client";

import { useState } from "react";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";

import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div className="mt-8">
      <Editor
        height="60vh"
        theme="vs-dark"
        defaultValue={snippet.code}
        language="javascript"
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="my-2 p-2 border">
          Save
        </button>
      </form>
    </div>
  );
}
