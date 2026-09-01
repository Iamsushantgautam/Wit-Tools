import React from 'react';
import {
    IconMerge,
    IconSplit,
    IconCompress,
    IconDoc,
    IconPdf,
    IconImage,
    IconPageNum,
    IconWatermark,
    IconLock,
    IconCrop,
    IconQr,
    IconCloud,
    IconVideo,
    IconShopify,
    IconChatgpt
} from '../common/Icons';

// Top direct navigation links
export const TOP_NAV_LINKS = [
    { title: 'HOME', path: '/' },
    { title: 'ABOUT', path: '/about' },
    { title: 'FAQ', path: '/faq' },
    { title: 'CONTACT', path: '/contact' },
    { title: 'CHATGPT CODES', path: '/chatgpt-tools', highlight: true }
];

// Convert PDF dropdown sections
export const CONVERT_PDF_DROPDOWN = [
    {
        title: 'CONVERT TO PDF',
        titleClass: 'title-yellow',
        badgeClass: 'badge-yellow',
        items: [
            { title: 'Image to PDF', path: '/img-to-pdf', icon: <IconPdf /> }
        ]
    },
    {
        title: 'CONVERT FROM PDF',
        titleClass: 'title-yellow',
        badgeClass: 'badge-yellow',
        items: [
            { title: 'PDF to Image', path: '/pdf-to-img', icon: <IconImage /> }
        ]
    }
];

// All Tools Mega Menu Categories (Desktop & Mobile)
export const NAV_TOOL_CATEGORIES = [
    {
        id: 'pdf',
        categoryTitle: 'PDF TOOLS',
        titleClass: 'title-red',
        items: [
            { title: 'Merge PDF', path: '/pdf-merge', iconBadgeClass: 'badge-red', icon: <IconMerge /> },
            { title: 'Split PDF', path: '/pdf-split', iconBadgeClass: 'badge-red', icon: <IconSplit /> },
            { title: 'Compress PDF', path: '/pdf-compressor', iconBadgeClass: 'badge-red', icon: <IconCompress /> },
            { title: 'Image to PDF', path: '/img-to-pdf', iconBadgeClass: 'badge-red', icon: <IconPdf /> },
            { title: 'PDF to Image', path: '/pdf-to-img', iconBadgeClass: 'badge-red', icon: <IconImage /> },
            { title: 'Add Page Numbers', path: '/pdf-page-number', iconBadgeClass: 'badge-red', icon: <IconPageNum /> },
            { title: 'PDF Lock & Security', path: '/pdf-security', iconBadgeClass: 'badge-red', icon: <IconLock /> }
        ]
    },
    {
        id: 'img',
        categoryTitle: 'IMAGE TOOLS',
        titleClass: 'title-cyan',
        items: [
            { title: 'Image Compressor', path: '/img-compressor', iconBadgeClass: 'badge-cyan', icon: <IconCompress /> },
            { title: 'Image Resizer', path: '/img-resizer', iconBadgeClass: 'badge-cyan', icon: <IconCrop /> },
            { title: 'Image Optimizer', path: '/img-optimizer', iconBadgeClass: 'badge-cyan', icon: <IconImage /> },
            { title: 'Format Converter', path: '/img-converter', iconBadgeClass: 'badge-cyan', icon: <IconImage /> },
            { title: 'PNG to WEBP', path: '/png-to-webp', iconBadgeClass: 'badge-cyan', icon: <IconImage /> },
            { title: 'Remove Background', path: '/bg-remover', iconBadgeClass: 'badge-cyan', icon: <IconCrop /> },
            { title: 'Passport Photo Maker', path: '/profile-maker', iconBadgeClass: 'badge-cyan', icon: <IconImage /> }
        ]
    },
    {
        id: 'util',
        categoryTitle: 'UTILITIES & MEDIA',
        titleClass: 'title-purple',
        items: [
            { title: 'Add Watermark', path: '/watermark', iconBadgeClass: 'badge-purple', icon: <IconWatermark /> },
            { title: 'QR Generator', path: '/qr-generator', iconBadgeClass: 'badge-purple', icon: <IconQr /> },
            { title: 'SVG Wave & Pattern', path: '/svg-generator', iconBadgeClass: 'badge-purple', icon: <IconDoc /> },
            { title: 'Video Screenshot', path: '/yt-screenshot', iconBadgeClass: 'badge-purple', icon: <IconVideo /> },
            { title: 'Drive Direct Link', path: '/google-drive-downloader', iconBadgeClass: 'badge-purple', icon: <IconCloud /> },
            { title: 'ChatGPT Secret Codes', path: '/chatgpt-tools', iconBadgeClass: 'badge-purple', icon: <IconChatgpt /> }
        ]
    },
    {
        id: 'shopify',
        categoryTitle: 'SHOPIFY & DEV',
        titleClass: 'title-green',
        items: [
            { title: 'Shopify Dev Hub', path: '/shopify-dev', iconBadgeClass: 'badge-green', icon: <IconShopify /> },
            { title: 'Shopify Apps Directory', path: '/shopify-apps', iconBadgeClass: 'badge-green', icon: <IconShopify /> }
        ]
    }
];

// Mobile Accordion Sections derived from master categories
export const MOBILE_ACCORDIONS = [
    {
        id: 'pdf',
        title: 'PDF Tools',
        items: NAV_TOOL_CATEGORIES.find(c => c.id === 'pdf').items
    },
    {
        id: 'img',
        title: 'Image Tools',
        items: NAV_TOOL_CATEGORIES.find(c => c.id === 'img').items
    },
    {
        id: 'util',
        title: 'Utility Tools',
        items: [
            ...NAV_TOOL_CATEGORIES.find(c => c.id === 'util').items,
            ...NAV_TOOL_CATEGORIES.find(c => c.id === 'shopify').items
        ]
    },
    {
        id: 'shopify',
        title: 'Shopify & Dev',
        items: [
            ...NAV_TOOL_CATEGORIES.find(c => c.id === 'shopify').items
        ]
    }
];
