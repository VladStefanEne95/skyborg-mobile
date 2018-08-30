export const AmazonInfo = {
    marketplaces : [
        {
            'id': 'A2EUQ1WTGCTBG2',
            'region': 'CA',
            'checked': false,
        },
        {
            'id': 'A1AM78C64UM0Y8',
            'region': 'MX',
            'checked': false,
        },
        {
            'id': 'ATVPDKIKX0DER',
            'region': 'US',
            'checked': false,
        },
        {
            'id': 'A2Q3Y263D00KWC',
            'region': 'BR',
            'checked': false,
        },
        {
            'id': 'A1PA6795UKMFR9',
            'region': 'DE',
            'checked': false,
        },
        {
            'id': 'A1RKKUPIHCS9HS',
            'region': 'ES',
            'checked': false,
        },
        {
            'id': 'A13V1IB3VIYZZH',
            'region': 'FR',
            'checked': false,
        },
        {
            'id': 'APJ6JRA9NG5V4',
            'region': 'IT',
            'checked': false,
        },
        {
            'id': 'A1F83G8C2ARO7P',
            'region': 'UK',
            'checked': false,
        },
        {
            'id': 'A21TJRUUN4KGV',
            'region': 'IN',
            'checked': false,
        },
        {
            'id': 'A1VC38T7YXB528',
            'region': 'JP',
            'checked': false,
        },
        {
            'id': 'AAHKV2X7AFYLW',
            'region': 'CN',
            'checked': false,
        },
    ],

    endpoints : [
        {
            'url': 'https://mws.amazonservices.com',
            'region': 'NA & BR',
        },
        {
            'url': 'https://mws-eu.amazonservices.com',
            'region': 'EU',
        },
        {
            'url': 'https://mws.amazonservices.in',
            'region': 'IN',
        },
        {
            'url': 'https://mws.amazonservices.com.cn',
            'region': 'CN',
        },
        {
            'url': 'https://mws.amazonservices.jp',
            'region': 'JP',
        },
    ],

    getRegionNameByMarketPlace(marketplace: string) : string {
        const getMarketplace = this.marketplaces.filter(m => m.id.toString() === marketplace);

        if (0 !== getMarketplace.length) {
            return getMarketplace[0].region;
        }

        return null;
    },

    marketplaceRegionEmojiMap: {
        'US': '🇺🇸  United States',
        'CA': '🇨🇦  Canada',
        'UK': '🇬🇧  United Kingdom',
        'MX': '🇲🇽  Mexico',
        'JP': '🇯🇵  Japan',
        'FR': '🇫🇷  France',
        'DE': '🇩🇪  Germany',
        'IT': '🇮🇹  Italy',
        'ES': '🇪🇸  Spain',
    },

    marketplaceEmojiMap: {
      'A2EUQ1WTGCTBG2': '🇨🇦',
      'A1AM78C64UM0Y8': '🇲🇽',
      'ATVPDKIKX0DER': '🇺🇸',
      'A2Q3Y263D00KWC': 'Brazil',
      'A1PA6795UKMFR9': '🇩🇪',
      'A1RKKUPIHCS9HS': '🇪🇸',
      'A13V1IB3VIYZZH': '🇫🇷',
      'APJ6JRA9NG5V4': '🇮🇹',
      'A1F83G8C2ARO7P': '🇬🇧',
      'A21TJRUUN4KGV': 'India',
      'A1VC38T7YXB528': '🇯🇵',
      'AAHKV2X7AFYLW': 'China'
    },

    marketplaceCurrencyMap: {
        'A2EUQ1WTGCTBG2': 'CAD',
        'A1AM78C64UM0Y8': 'MXN',
        'ATVPDKIKX0DER': 'USD',
        'A2Q3Y263D00KWC': 'BRL',
        'A1PA6795UKMFR9': 'EUR',
        'A1RKKUPIHCS9HS': 'EUR',
        'A13V1IB3VIYZZH': 'EUR',
        'APJ6JRA9NG5V4': 'EUR',
        'A1F83G8C2ARO7P': 'EUR',
        'A21TJRUUN4KGV': 'INR',
        'A1VC38T7YXB528': 'JPY',
        'AAHKV2X7AFYLW': 'CNY'
      },
};
