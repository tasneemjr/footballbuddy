import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    user: { name: string | null };
    comments: { id: string; content: string; user?: { name: string | null } }[];
  } | null;
};

export default function CommunityPostPage({ post }: Props) {
  if (!post) return <div>Post not found</div>;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>by {post.user.name || "Anonymous"}</p>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id}>
            {c.content} — {c.user?.name || "Anonymous"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const post = await prisma.communityPost.findUnique({
    where: { id },
    include: {
      user: true,
      comments: { include: { user: true } },
    },
  });
  return {
    props: {
      post: post ? JSON.parse(JSON.stringify(post)) : null,
    },
  };
};
import { useState } from "react";
// ...other imports...

type matchProps = {
  match: {
    id: string;
    preview?: { content: string };
  } | null;
};

export function matchPage({ match }: matchProps) {
  const [preview, setPreview] = useState(match?.preview?.content || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (match) {
      await fetch(`/api/match/${match.id}/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: preview }),
      });
    }
    setSaving(false);
    // Optionally, show a success message or reload data
  };

  return (
    <div>
      {/* ...existing match display... */}
      <h2>Edit Preview</h2>
      <form onSubmit={handleSave}>
        <textarea
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Preview"}
        </button>
      </form>
    </div>
  );
}