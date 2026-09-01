import React from 'react';
import internalTools from './internalTools.json';
import shopifyTools from './shopifyTools.json';
import chromeExtensions from './chromeExtensions.json';
import usefulExtensions from './UsefullChromeExtensions.json';
import usefulWebsites from './usefulWebsites.json';
import myOwnWebsites from './myOwnWebsites.json';
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
    UserIcon,
    WitcetIcon,
    ScreelyIcon,
    ShopifyIcon,
    ChromeIcon,
    IconChatgpt
} from '../components/common/Icons';

export {
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
    UserIcon,
    WitcetIcon,
    ScreelyIcon,
    ShopifyIcon,
    ChromeIcon,
    IconChatgpt
};

const iconMap = {
    IconMerge: <IconMerge />,
    IconSplit: <IconSplit />,
    IconCompress: <IconCompress />,
    IconDoc: <IconDoc />,
    IconPdf: <IconPdf />,
    IconImage: <IconImage />,
    IconPageNum: <IconPageNum />,
    IconWatermark: <IconWatermark />,
    IconLock: <IconLock />,
    IconCrop: <IconCrop />,
    IconQr: <IconQr />,
    IconCloud: <IconCloud />,
    IconVideo: <IconVideo />,
    UserIcon: <UserIcon />,
    WitcetIcon: <WitcetIcon />,
    ScreelyIcon: <ScreelyIcon />,
    ShopifyIcon: <ShopifyIcon />,
    ChromeIcon: <ChromeIcon />,
    IconChatgpt: <IconChatgpt />,
    ChatGPTIcon: <IconChatgpt />
};

export const HOME_CATEGORY_ORDER = [
    'Image Tools',
    'PDF Tools',
    'Utility Tools',
    'Shopify Tools',
    'My Websites',
    'Chrome Extension',
    'Useful Extensions',
    'Design & Icon Websites',
    'AI & Research Websites',
    'Developer & Cloud Websites'
];

const allRawTools = [
    ...internalTools,
    ...shopifyTools,
    ...myOwnWebsites,
    ...chromeExtensions,
    ...usefulExtensions,
    ...usefulWebsites
];

export const tools = allRawTools.map(tool => ({
    ...tool,
    icon: typeof tool.icon === 'string' && tool.icon.trim().startsWith('<svg')
        ? <span className="custom-svg-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: tool.icon }} />
        : (iconMap[tool.icon] || tool.icon || <IconDoc />)
}));
