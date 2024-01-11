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
      <h1 className="text-xl font-bold mb-4">Editing: {snippet.title}</h1>
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
        <button
          type="submit"
          className="rounded p-2 mt-4 border-blue-500 bg-blue-500 text-white w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
