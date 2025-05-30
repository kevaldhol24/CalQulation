import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import MDXComponents from '@/components/mdx';
import { Post, PostFrontmatter } from './types/blog';

// Path to our blog posts
const postsDirectory = path.join(process.cwd(), 'posts');

// MDX components imported from our custom components file
const components = {
    ...MDXComponents,
};

// Options for rehype-pretty-code
const options = {
    theme: 'github-dark',
};

// Get all post slugs
export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

// Get post data by slug
export function getPostBySlug(slug: string): Post {
    const fullPath = path.join(postsDirectory, `${slug}/index.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);


    return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
    };
}

// Get all posts with frontmatter (metadata)
export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();

    const posts = slugs
        .map((slug) => {
            try {
                return getPostBySlug(slug);
            } catch (error) {
                console.error(`Error processing post ${slug}:`, error);
                return null;
            }
        })
        .filter((item) => !!item) // Remove any null entries
        .sort((post1, post2) => {
            // Sort by date if available, latest first
            const date1 = post1.frontmatter.date ? new Date(post1.frontmatter.date) : new Date(0);
            const date2 = post2.frontmatter.date ? new Date(post2.frontmatter.date) : new Date(0);
            return date2.getTime() - date1.getTime();
        });

    return process.env.NODE_ENV === "production"
        ? posts.filter((post) => post.frontmatter.status !== "draft")
        : posts

}

export const getAllCategories = (): Record<string, number> => {
    const posts = getAllPosts();
    const categoriesSet: Record<string, number> = {};

    posts.forEach((post) => {
        if (post.frontmatter.category) {
            categoriesSet[post.frontmatter.category] = (categoriesSet[post.frontmatter.category] || 0) + 1;
        }
    });

    return categoriesSet;
}

export const getAllTags = (): Record<string, number> => {
    const posts = getAllPosts();
    const tagsSet: Record<string, number> = {};

    posts.forEach((post) => {
        if (post.frontmatter.tags) {
            post.frontmatter.tags.forEach((tag) => {
                tagsSet[tag] = (tagsSet[tag] || 0) + 1;
            });
        }
    });

    return tagsSet;
}

export const getNameFromSlug = (slug: string): string => {
    return slug.split('-').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

export const getPostsByCategory = (categorySlug: string): Post[] => {
    const category = getNameFromSlug(categorySlug);
    const allPosts = getAllPosts();
    return allPosts.filter(
        (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
    );
}

export const getPostsByTag = (tagSlug: string): Post[] => {
    const tag = getNameFromSlug(tagSlug);
    const allPosts = getAllPosts();
    return allPosts.filter(
        (post) => post.frontmatter.tags?.map(getNameFromSlug).includes(tag)
    );
}

// Compile MDX content with all plugins
export async function compileMDXContent(content: string) {
    const { content: compiledContent, frontmatter } = await compileMDX({
        source: content,
        components,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, options],
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
                remarkPlugins: [remarkGfm],
            },
        },
    });

    return { content: compiledContent, frontmatter };
}
