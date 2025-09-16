"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from '@tiptap/extension-text-style';
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import EditorToolbar from "./EditorToolbar";

interface ClientOnlyEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function ClientOnlyEditor({ content, onChange }: ClientOnlyEditorProps) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link,
      Image,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "border rounded-md p-4 min-h-[150px] max-h-[200px] overflow-y-auto focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => setMounted(true), []);

  if (!mounted || !editor) return <div>Loading editor...</div>;

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
