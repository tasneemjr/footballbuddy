import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";

type CommunityPost = {
  id: string;
  title: string;
  content: string;
  user: { name: string | null };
};

type Props = { posts: CommunityPost[] };

export default function CommunityPage({ posts }: Props) {
  return (
    <div>
      <h1>Community Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/community/${post.id}`}>
              <strong>{post.title}</strong> by {post.user.name || "Anonymous"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.communityPost.findMany({
    include: { user: true },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};