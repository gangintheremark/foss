import samsungLogo from '@assets/image/samsung2.png';
import naverLogo from '@assets/image/naver2.png';
import cupangLogo from '@assets/image/coupang2.png';
import hyundaiLogo from '@assets/image/hyundai2.png';
import woowaLogo from '@assets/image/uwa.png';
import kakaoLogo from '@assets/image/kakao2.png';
import carrotLogo from '@assets/image/carrotmarket2.png';
import socarLogo from '@assets/image/socar2.png';
import lgLogo from '@assets/image/lg2.png';
import lineLogo from '@assets/image/line2.png';
import hanabank from '@assets/image/hanabank.png';
import uribank from '@assets/image/uribank.png';
import shinhanbank from '@assets/image/shinhanbank.png';
import nhbank from '@assets/image/nhbank.png';
import kbbank from '@assets/image/kbbank.png';

export interface Company {
  id: number;
  name: string;
  imageUrl: string;
  backgroud_color: string;
  content1: string;
  content2: string;
}

export const tmpCompanies: Company[] = [
  {
    id: 1,
    name: '삼성전자',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성전자는 사람과 사회를 생각하는 글로벌 일류기업을 추구합니다.`,
    content2: `‘경영이념, 핵심가치, 경영원칙’의 가치체계를 경영의 나침반으로 삼고, 인재와 기술을 바탕으로 최고의 제품과 서비스를 창출하여 인류사회에 공헌하는 것을 궁극적인 목표로 삼고 있습니다.`,
  },
  {
    id: 2,
    name: '삼성SDS',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성SDS는 삼성 그룹의 IT 서비스 및 솔루션을 제공하는 선도적인 기업으로, 디지털 전환과 혁신을 통해 고객의 비즈니스 가치를 극대화합니다.`,
    content2: `데이터 분석 등 최신 기술을 활용하여 글로벌 시장에서 경쟁력을 강화하고 있습니다.`,
  },
  {
    id: 3,
    name: '삼성SDI',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성 SDI는 전세계적인 배터리 및 에너지 저장 솔루션의 선도적 기업으로, 혁신적인 기술을 통해 지속 가능한 미래를 창출합니다.`,
    content2: `전기차, 모바일 기기, 산업용 배터리 등 다양한 분야에 고성능 배터리 솔루션을 제공하며 글로벌 시장에서 신뢰받는 파트너입니다.`,
  },
  {
    id: 4,
    name: '삼성디스플레이',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성디스플레이는 혁신적인 디스플레이 기술을 통해 글로벌 시장에서 선도적인 위치를 차지하고 있으며, 모바일, TV, 모니터 등 다양한 제품에 최첨단 디스플레이 솔루션을 제공합니다.`,
    content2: `OLED와 QD(Quantum Dot) 기술을 통해 뛰어난 화질과 성능을 실현하며, 디스플레이 산업의 미래를 선도하고 있습니다.`,
  },
  {
    id: 5,
    name: '삼성전기',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성전기는 첨단 전자 부품과 솔루션을 제공하는 글로벌 리더로, 반도체, 디스플레이 패널, 커넥터 등 다양한 분야에서 혁신을 선도합니다.`,
    content2: `지속적인 기술 개발과 품질 향상을 통해 전 세계 고객들에게 신뢰받는 제품과 서비스를 제공합니다.`,
  },
  {
    id: 6,
    name: '삼성바이오로직스',
    imageUrl: samsungLogo,
    backgroud_color: 'bg-[#1428A0]',
    content1: `삼성바이오로직스는 세계적인 바이오의약품 위탁 생산 및 개발 서비스를 제공하는 선도 기업으로, 첨단 생명공학 기술을 통해 글로벌 제약사와 협력하고 있습니다.`,
    content2: `최첨단 시설과 품질 관리 시스템을 바탕으로 고객 맞춤형 솔루션을 제공하며, 생명과학 산업의 발전에 기여하고 있습니다.`,
  },
  {
    id: 7,
    name: 'KB국민은행',
    imageUrl: kbbank,
    backgroud_color: 'bg-[#FFBC00]',
    content1: `KB국민은행은 국내 주요 은행으로서 광범위한 금융 서비스를 제공하며, 고객의 금융 편의를 극대화하기 위해 혁신적인 디지털 솔루션을 지속적으로 발전시키고 있습니다.`,
    content2: `안정성과 신뢰를 바탕으로 개인과 기업 고객 모두에게 맞춤형 금융 서비스를 제공합니다.`,
  },
  {
    id: 8,
    name: 'NH농협은행',
    imageUrl: nhbank,
    backgroud_color: 'bg-[#FFB300]',
    content1: `NH농협은행은 농업과 지역 경제를 지원하는 종합 금융 기관으로, 고객 중심의 다양한 금융 서비스를 통해 지역사회와 상생하며 성장하고 있습니다.`,
    content2: `현대적 금융 기술과 안정적인 서비스로 개인 및 기업 고객의 신뢰를 받고 있습니다.`,
  },
  {
    id: 9,
    name: '하나은행',
    imageUrl: hanabank,
    backgroud_color: 'bg-[#008485]',
    content1: `하나은행은 글로벌 금융 네트워크를 통해 다양한 금융 서비스를 제공하며, 혁신적인 디지털 솔루션으로 고객의 금융 편의를 극대화하고 있습니다.`,
    content2: `국제적 경쟁력을 바탕으로 개인과 기업 고객에게 신뢰받는 파트너입니다.`,
  },
  {
    id: 10,
    name: '우리은행',
    imageUrl: uribank,
    backgroud_color: 'bg-[#0067ac]',
    content1: `우리은행은 포괄적인 금융 서비스를 통해 고객의 다양한 금융 요구를 충족하며, 지역사회와의 연계를 통해 사회적 책임을 다하고 있습니다.`,
    content2: `최신 금융 기술을 활용해 편리하고 안전한 금융 환경을 제공합니다.`,
  },
  {
    id: 11,
    name: '신한은행',
    imageUrl: shinhanbank,
    backgroud_color: 'bg-[#0046ff]',
    content1: `신한은행은 글로벌 금융 시장에서 경쟁력을 갖춘 종합 금융 기관으로, 고객 맞춤형 서비스와 혁신적인 디지털 솔루션을 통해 높은 신뢰를 받고 있습니다.`,
    content2: `안정성과 효율성을 바탕으로 개인과 기업 고객의 금융 니즈를 충족합니다.`,
  },
  {
    id: 12,
    name: '네이버',
    imageUrl: naverLogo,
    backgroud_color: 'bg-[#2DB400]',
    content1: `네이버(주)는 글로벌 ICT 기업으로서 한국 최대 검색포털 네이버를 서비스하고 있고, 그 계열사에서 모바일 메신저 라인, 동영상 카메라 스노우, 디지털 만화 서비스 네이버웹툰, 메타버스 서비스 제페토 등을 서비스하고 있습니다.`,
    content2: `또한, 네이버(주)는 인공지능, 로보틱스, 모빌리티 등 미래 기술에 대한 지속적인 연구개발을 통해 기술 플랫폼의 변화와 혁신을 추구하며 세계 각국의 수많은 이용자와 다양한 파트너들이 함께 성장할 수 있도록 노력하고 있습니다.`,
  },
  {
    id: 13,
    name: '쿠팡',
    imageUrl: cupangLogo,
    backgroud_color: 'bg-[#4CCDC6]',
    content1: `쿠팡은 고객이 앱을 여는 순간부터 주문이 집으로 배달되는 순간까지 고객을 감동시키는 것을 목표로 쇼핑 경험을 재창조하고 있습니다.`,
    content2: `쿠팡은 고객의 일상을 바꿉니다. “쿠팡 없이 어떻게 살았을까”라는 생각이 드는 세상을 만들고 있습니다.`,
  },
  {
    id: 14,
    name: '현대자동차',
    imageUrl: hyundaiLogo,
    backgroud_color: 'bg-[#4CCDC6]',
    content1: `현대자동차는 국내 최초로 독자 모델 포니를 개발하며 대한민국 자동차 산업의 선구자 역할을 해 왔습니다.\n
      세계 200여 개국에 자동차를 수출하고 글로벌 생산기지를 건설해 세계적인 자동차 메이커로 자리매김했습니다.`,
    content2: `세계 최초 양산형 수소차를 출시하고 프리미엄 브랜드 제네시스를 론칭해 시장을 확대하는 한편, 선도적 자율주행과 커넥티비티 기술을 바탕으로 미래 모빌리티 산업을 견인하고 있습니다.\n
      현대자동차는 ‘인류애를 향한 진보’를 목표로 기술의 진화를 실현하며 인류를 위한 더 나은 방향을 모색하고 있습니다.`,
  },
  {
    id: 15,
    name: '우아한형제들',
    imageUrl: woowaLogo,
    backgroud_color: 'bg-[#4CCDC6]',
    content1: `우아한형제들은 '배달의 민족'과 같은 혁신적인 플랫폼을 통해 음식 배달 및 외식 산업의 디지털 전환을 선도하는 기업입니다.`,
    content2: `고객 중심의 서비스와 기술 혁신을 바탕으로, 식음료 분야에서 차별화된 가치를 제공하고 있습니다.`,
  },
  {
    id: 16,
    name: '카카오',
    imageUrl: kakaoLogo,
    backgroud_color: 'bg-[#f9e000]',
    content1: `카카오는 모두가 편하고 안전하게 쓸 수 있는 기술로 더 나은 세상을 열어갑니다.`,
    content2: `지인과 관심사, 비즈니스 관계와 일상을 연결함에 있어서 이용자 여러분의 다양성, 기술과 서비스의 포용성을 가장 먼저 생각합니다.`,
  },
  {
    id: 17,
    name: '당근마켓',
    imageUrl: carrotLogo,
    backgroud_color: 'bg-[#4CCDC6]',
    content1: `당근은 동네의 가치에 주목합니다. 근처에 살고 있는 이웃과의 중고 직거래를 시작으로, 전에 없던 지역 생활 커뮤니티를 만들어나가고 있어요.`,
    content2: `이웃들은 진짜 우리 동네 이야기를 주고받을 수 있고, 가게 사장님들은 이웃의 목소리를 가장 가까이서 들을 수 있지요. 거래, 모임, 홍보, 결제까지, 동네에서 일어나는 다양한 경험을 당근으로 연결하고 있습니다.`,
  },
  {
    id: 18,
    name: '쏘카',
    imageUrl: socarLogo,
    backgroud_color: 'bg-[#4CCDC6]',
    content1: `쏘카는 모든 사람이 자유롭고 행복하게 이동하는 세상을 만들기 위해 쏘카 유니버스와 함께 모빌리티 생태계를 만듭니다.\n
    쏘카는 기술과 데이터로 이동 경험을 혁신하는 테크 플랫폼(마이크로 서비스)으로 나아갑니다.`,
    content2: `쏘카에 합류하여 어떠한 커리어를 그려갈 수 있을지 궁금하시다면 커피챗 통해 편하게 대화 나눠보아요`,
  },
  {
    id: 19,
    name: 'LG전자',
    imageUrl: lgLogo,
    backgroud_color: 'bg-[#A50034]',
    content1: `LG전자는 ‘Life's Good’ 브랜드 철학을 바탕으로 고객에게 더 나은 삶을 제공하기 위해 ▲최고의(First) ▲차별화된(Unique) ▲세상에 없던(New) F·U·N 경험을 선사하고자 항상 노력합니다.`,
    content2: `H&A(Home Appliance & Air Solution), HE(Home Entertainment), VS(Vehicle component Solutions), BS(Business Solutions)의 사업본부로 구성되어있으며, 전 세계 130여 개 사업장에서 사업을 전개하며 가전, IT, 자동차부품, 사이니지 등 다양한 분야에서 기술혁신을 선도하는 글로벌 리더입니다.`,
  },
  {
    id: 20,
    name: '라인',
    imageUrl: lineLogo,
    backgroud_color: 'bg-[#2DB400]',
    content1: `라인플러스 주식회사(LINE Plus Corporation)는 LINE의 글로벌 시장 확대를 목적으로 2013년 한국에서 설립됐습니다.`,
    content2: `라인플러스 임직원들은 30여 개국에 이르는 각기 다른 국적의 동료들과 함께 기술, 디자인, 마케팅/영업, 홍보, 제휴 등 다양한 분야의 글로벌 업무를 진행하며, 전 세계를 대상으로 라인 서비스를 전개하고 있습니다.`,
  },
];
