# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static timeline generator built with [11ty (Eleventy)](https://www.11ty.dev/). It creates responsive timeline webpages from markdown content files. The project processes markdown files in the `content/` directory to generate a static timeline site.

## Development Commands

- `npm run serve` - Build and serve locally at http://localhost:8080 with live reload
- `npm run build` - Build static files to `_site/` directory
- `npm run prettier` - Format code using Prettier

## Architecture

### Core Structure
- **Content Processing**: Markdown files in `content/YYYY/` directories are automatically processed into timeline entries
- **Data Flow**: `plugins/content.js` → `src/_data/entries.json` → `src/_data/content.js` → templates
- **Image Processing**: `plugins/images.js` processes images from content directories and resizes them to 1280px wide

### Key Files
- `.eleventy.js` - Main Eleventy configuration with custom plugins
- `src/_data/content.js` - Main content configuration (header, footer, page metadata)
- `src/_data/entries.json` - Generated from markdown files by content plugin
- `plugins/content.js` - Processes markdown files into timeline entries
- `plugins/images.js` - Handles image resizing and processing

### Content Structure
Each timeline entry is a markdown file in `content/YYYY/filename.md` with:
- Front matter for date and categories
- H1 title becomes the entry title
- Body content becomes entry body
- Standalone links at the end become entry links
- Accompanying `.jpg` or `.png` files become entry images

### Styling
- SASS files in `src/css/` compiled with autoprefixer
- Font Awesome icons supported for timeline markers
- Responsive design with mobile/tablet support

## Content Management

Timeline entries are created by:
1. Adding markdown files to `content/YYYY/` directories
2. Including front matter with date and optional categories
3. Adding associated images with matching filenames
4. Running build process to regenerate `entries.json`

Categories automatically become filterable options in the UI.

## Deployment

The `_site/` directory contains all static files ready for deployment. GitHub Pages deployment uses `git subtree push --prefix _site origin gh-pages`.