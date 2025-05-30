export interface PostFrontmatter {
  // Basic metadata
  title: string;
  date: string;
  description: string;
  thumbnailUrl?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
  relatedPosts?: string[];
  
  // SEO enhancements
  keywords?: string; // Comma-separated SEO keywords
  excerpt?: string; // Short summary for meta descriptions and snippets
  canonical?: string; // Custom canonical URL (if different from the default)
  lastModified?: string; // Last updated date for content freshness
  
  // Social Media specific
  ogImage?: string; // Custom OG image (if different from thumbnailUrl)
  ogType?: string; // Open Graph type, defaults to 'article' for posts
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'; // Twitter card type
  twitterCreator?: string; // Twitter username of content creator
  
  // Content details
  readingTime?: number; // Estimated reading time in minutes
  noIndex?: boolean; // Whether to prevent indexing of this page
  alternateLanguages?: { locale: string; url: string }[]; // Alternative language versions
  
  // Structured data
  structuredData?: {
    authorName?: string; // Author's full name
    authorUrl?: string; // Author's URL/profile
    publisherName?: string; // Publisher name (e.g., site name)
    publisherLogo?: string; // Publisher logo URL
  };
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
