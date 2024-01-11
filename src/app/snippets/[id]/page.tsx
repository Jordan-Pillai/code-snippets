import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";

import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-xl font-bold"> {snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/`} className="p-2 border rounded">
            Home
          </Link>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border rounded text-white p-2 border-blue-500 bg-blue-500"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded border-red-500 bg-red-500 text-white">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code className="whitespace-pre-wrap">{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
