export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  thumbnailUrl?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface CompiledPost {
  content: React.ReactElement;
  frontmatter: PostFrontmatter;
}
