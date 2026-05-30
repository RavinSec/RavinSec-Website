import { ContentPostCard } from "@/components/sections/content-post-card";
import { GlowCard } from "@/components/ui/glow-card";
import type { ContentPost } from "@/lib/cms";

type ContentListingProps = {
  posts: ContentPost[];
  basePath: "/blog" | "/news";
  emptyMessage: string;
  showFeatured?: boolean;
};

export function ContentListing({
  posts,
  basePath,
  emptyMessage,
  showFeatured = true,
}: ContentListingProps) {
  if (posts.length === 0) {
    return (
      <GlowCard variant="border" glow={false} className="text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </GlowCard>
    );
  }

  const useFeatured = showFeatured && basePath === "/blog";
  const featuredPost = useFeatured ? posts[0] : undefined;
  const gridPosts = useFeatured ? posts.slice(1) : posts;

  return (
    <div className="space-y-8">
      {featuredPost ? (
        <ContentPostCard post={featuredPost} basePath={basePath} featured />
      ) : null}
      {gridPosts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {gridPosts.map((post) => (
            <ContentPostCard key={post.id} post={post} basePath={basePath} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
