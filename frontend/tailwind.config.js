/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '640px' },
      tablet: { min: '641px', max: '1279px' },
      desktop: { min: '1280px', max: '1660px' },
    },
    backgroundSize: {
      full: '100%',
    },

    fontFamily: {
      notoKR: 'Noto Sans KR',
      notoKR_Bold: ['Noto_Sans_KR-Bold', 'Helvetica'],
      notoKR_DemiLight: ['Noto_Sans_KR-DemiLight', 'Helvetica'],
      Inter_Regular: ['Inter-Regular', 'Helvetica'],
    },
    extend: {
      backgroundImage: {
        laptop: "url('./assets/img/FeedBackFrame.png')",
      },
      boxShadow: {
        toggle: '2px 4px 16px 0px rgba(0,0,0,0.04)',
        card: '0px 2px 16px 0px rgba(0,0,0,0.04)',
        feedback: '4px 8px 10px 0px rgba(0,0,0,0.1)',
      },
      colors: {
        // 민트 색깔 기준
        'main-color': '#4CCDC6',
        'main-color-light': '#f5fcfc',
        'main-hover-color': '#68E0D6',
        'main-color-active': '#20ACA7',
        // footer 색깔
        'footer-color': '#FAFAFA',
        // 기본 text color
        'text-color': '#292A34',
        // 회색 unable을 쓰고 싶을 때
        'gray': '#DCDCDC',
        'gray-light': '#F3F3F3',
        'purple': '#8F49DE',
        'purple-light': '#F5F4FA',
        'bg-gray': '#F9FAFB',
        'nav-gray-color': '#4E5968',
      },
    },
  },
  plugins: [],
};
