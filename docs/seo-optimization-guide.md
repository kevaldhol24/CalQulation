# MDX Blog SEO Optimization Guide

This guide explains how to optimize your MDX blog posts for search engines using our enhanced SEO features.

## Available SEO Frontmatter Fields

Our MDX blog system supports the following frontmatter fields to maximize SEO performance:

### Basic Metadata

| Field | Description | Required? |
|-------|-------------|----------|
| `title` | The title of your blog post | Yes |
| `date` | Publication date (YYYY-MM-DD format) | Yes |
| `description` | Brief description of the post content | Yes |
| `thumbnailUrl` | Path to the featured image | No |
| `category` | Main category of the post | No |
| `tags` | Array of related topics | No |
| `author` | Content author | No |
| `featured` | Whether the post should be featured (boolean) | No |
| `status` | Publication status: "draft" or "published" | No |
| `relatedPosts` | Array of related post slugs | No |

### SEO Enhancements

| Field | Description | Required? |
|-------|-------------|----------|
| `keywords` | Comma-separated SEO keywords | No |
| `excerpt` | Short summary for meta descriptions (if different from description) | No |
| `canonical` | Custom canonical URL (if different from the default) | No |
| `lastModified` | Last updated date for content freshness | No |

### Social Media Optimization

| Field | Description | Required? |
|-------|-------------|----------|
| `ogImage` | Custom Open Graph image (if different from thumbnailUrl) | No |
| `ogType` | Open Graph type, defaults to "article" | No |
| `twitterCard` | Twitter card type: "summary", "summary_large_image", etc. | No |
| `twitterCreator` | Twitter username of content creator | No |

### Content Details

| Field | Description | Required? |
|-------|-------------|----------|
| `readingTime` | Estimated reading time in minutes | No |
| `noIndex` | Whether to prevent indexing of this page (boolean) | No |
| `alternateLanguages` | Alternative language versions | No |

### Structured Data

| Field | Description | Required? |
|-------|-------------|----------|
| `structuredData.authorName` | Author's full name | No |
| `structuredData.authorUrl` | Author's URL/profile | No |
| `structuredData.publisherName` | Publisher name (e.g., site name) | No |
| `structuredData.publisherLogo` | Publisher logo URL | No |

## SEO Best Practices

1. **Always include key metadata**
   - Title should be descriptive and include target keywords (50-60 characters)
   - Description should summarize content value (150-160 characters)
   - Include relevant keywords naturally in both title and description

2. **Use meaningful URLs**
   - The post folder name becomes the URL slug
   - Use descriptive, keyword-rich slugs separated by hyphens
   - Keep URLs relatively short

3. **Optimize images**
   - Always include thumbnailUrl for social sharing
   - Use descriptive file names for images
   - Ensure images are optimized for web (compressed, appropriate dimensions)

4. **Provide rich content**
   - Structure content with proper heading hierarchy (H1, H2, H3)
   - Include internal links to related content
   - Use the `relatedPosts` field to suggest relevant articles

5. **Keep content fresh**
   - Update older posts when information changes
   - Always update the `lastModified` date when making significant changes

6. **Leverage structured data**
   - Fill out structuredData fields for better rich snippets in search results
   - Ensure authorName, authorUrl, publisherName and publisherLogo are accurate

7. **Social media optimization**
   - Customize ogImage for better social media sharing
   - Set appropriate twitterCard type based on content

## Example Post

```yaml
---
# Basic metadata
title: "Complete Guide to SEO-Optimized Financial Calculators"
date: "2025-05-30"
description: "Learn how to use financial calculators for better planning, investment decisions, and retirement preparation."
thumbnailUrl: "/Images/posts/a.jpg"
category: "Financial Tools"
tags: ["Financial Planning", "Calculators", "Personal Finance"]
author: "Calqulation Team"
featured: true
status: "published"
relatedPosts: ["understanding-financial-calculators"] 

# SEO enhancements
keywords: "financial calculators, investment tools, retirement planning calculators"
excerpt: "Financial calculators are powerful tools that simplify complex calculations. This guide explores different types of calculators."
lastModified: "2025-05-30"

# Social Media specific
ogImage: "/Images/posts/financial-calculators-social.jpg"
ogType: "article"
twitterCard: "summary_large_image"
twitterCreator: "@calqulation"

# Content details
readingTime: 8
noIndex: false

# Structured data
structuredData:
  authorName: "Finance Expert Team"
  authorUrl: "https://calqulation.com/about-us/team"
  publisherName: "Calqulation Finance"
  publisherLogo: "https://calqulation.com/Calqulation.png"
---
```

## How Our System Uses This Data

Our blog system automatically:

1. Generates appropriate metadata tags for search engines
2. Creates JSON-LD structured data for rich search results
3. Configures Open Graph tags for social media sharing
4. Sets up Twitter Card metadata for Twitter sharing
5. Manages canonical URLs to prevent duplicate content issues
6. Displays reading time and last updated information
7. Controls indexing behavior with robots meta tags
8. Provides alternate language URLs when specified

By filling out these frontmatter fields properly, your content will be optimized for discovery and engagement across search engines and social platforms.
