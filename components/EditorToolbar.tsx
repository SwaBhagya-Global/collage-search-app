"use client";

import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Image, Link, Text } from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button size="sm" variant={editor.isActive("bold") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></Button>
      <Button size="sm" variant={editor.isActive("italic") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></Button>
      <Button size="sm" variant={editor.isActive("underline") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline className="w-4 h-4" /></Button>

      <Button size="sm" variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Button>
      <Button size="sm" variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
      <Button size="sm" variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Button>

      <Button size="sm" variant={editor.isActive("bulletList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></Button>
      <Button size="sm" variant={editor.isActive("orderedList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></Button>

      <Button size="sm" variant={editor.isActive({ textAlign: 'left' }) ? "default" : "outline"} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft className="w-4 h-4" /></Button>
      <Button size="sm" variant={editor.isActive({ textAlign: 'center' }) ? "default" : "outline"} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter className="w-4 h-4" /></Button>
      <Button size="sm" variant={editor.isActive({ textAlign: 'right' }) ? "default" : "outline"} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight className="w-4 h-4" /></Button>

      <Button size="sm" onClick={() => {
        const url = prompt("Enter link URL");
        if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }}><Link className="w-4 h-4" /></Button>
    </div>
  );
}
