# MDX Blog System Documentation

This guide explains how to use the MDX blog system in this project. The system allows you to create blog posts using MDX files that will automatically generate blog pages at build time.

## File Structure

Blog posts are stored in the `/posts` directory, with each post in its own subdirectory:

```
posts/
  post-slug/
    index.mdx
    images/ (optional)
```

## Creating a New Blog Post

To create a new blog post:

1. Create a new directory in the `/posts` folder with a name that will become the URL slug for your post (e.g., `my-new-post`)
2. Inside that directory, create an `index.mdx` file
3. Add your content to the MDX file, starting with the required frontmatter

### Required Frontmatter

Each blog post must begin with frontmatter - metadata about the post enclosed in triple dashes (`---`). Here's what you should include:

```mdx
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A brief description of your post (will appear in previews and meta descriptions)"
thumbnailUrl: "/Images/posts/your-image.jpg"
category: "Your Category"
tags: ["Tag1", "Tag2", "Tag3"]
author: "Author Name"
featured: false
status: "published"
---

Your content goes here...
```

### Frontmatter Fields

- **title**: The title of your blog post
- **date**: Publication date in YYYY-MM-DD format
- **description**: A brief summary (160-200 characters recommended)
- **thumbnailUrl**: Path to the featured image (should be in `/public/Images/posts/`)
- **category**: Primary category for the post
- **tags**: Array of related tags
- **author**: Name of the post author
- **featured**: (Optional) Set to `true` to mark as a featured post
- **status**: Use "published" or "draft" (drafts won't appear in production)

## Custom MDX Components

The blog system includes several custom components you can use in your MDX:

### Callout

```mdx
<Callout type="info" title="Optional Title">
  This is an information callout box.
</Callout>
```

Available types: `info`, `warning`, `error`, `success`

### Figure (Image with Caption)

```mdx
<Figure
  src="/Images/posts/your-image.jpg"
  alt="Alt text for accessibility"
  caption="Optional caption text"
  width={800}
  height={450}
/>
```

### Step (for Tutorials)

```mdx
<Step number={1} title="First Step">
  Content explaining the first step goes here.
</Step>

<Step number={2} title="Second Step">
  Content explaining the second step goes here.
</Step>
```

### Card (for Related Links)

```mdx
<Card
  href="/some-path"
  title="Card Title"
  description="Brief description of the linked content"
/>
```

## Markdown Syntax

In addition to the custom components, you can use all standard Markdown syntax:

- **Headings**: Use `#` to `######` for headings
- **Bold**: `**bold text**`
- **Italic**: `*italicized text*`
- **Links**: `[link text](https://www.example.com)`
- **Lists**: Use `*` or `1.` for bullets or numbered lists
- **Code**: \`inline code\` or \```language\n code block \```

## Building and Deployment

When you build the site, the system will:

1. Parse all MDX files in the `/posts` directory
2. Generate static pages for each post at `/blog/[slug]`
3. Create category and tag pages automatically
4. Exclude draft posts from production builds

## Images

Store images for your blog posts in the `/public/Images/posts/` directory. You can then reference them in your MDX files using:

```mdx
![Alt text](/Images/posts/your-image.jpg)
```

Or use the `<Figure>` component for more control:

```mdx
<Figure
  src="/Images/posts/your-image.jpg"
  alt="Alt text"
  caption="A caption for this image"
/>
```

## Example Post

Check out the sample post at `/posts/understanding-financial-calculators/index.mdx` for a complete example of the MDX blog system in action.
