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
  background_color: string;
  content1: string;
  content2: string;
}

export const tmpCompanies: Company[] = [
  {
    id: 1,
    name: '삼성전자',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/samsung.png',
    background_color: 'bg-[#1428A0]',
    content1:
      '삼성전자는 사람과 사회를 생각하는 글로벌 일류기업을 추구합니다. ‘경영이념, 핵심가치, 경영원칙’의 가치체계를 경영의 나침반으로 삼고, 인재와 기술을 바탕으로 최고의 제품과 서비스를 창출하여 인류사회에 공헌하는 것을 궁극적인 목표로 삼고 있습니다.',
    content2:
      '삼성전자는 고객의 삶을 풍요롭게 만들고 세상을 놀라게 할 새로운 문화를 창조합니다. 주도적으로 변화하며 끊임없이 스스로를 혁신하는 일은 삼성전자를 사랑하는 모두를 위한 노력입니다.',
  },
  {
    id: 2,
    name: '네이버',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/naver.png',
    background_color: 'bg-[#2DB400]',
    content1:
      '네이버(주)는 글로벌 ICT 기업으로서 한국 최대 검색포털 네이버를 서비스하고 있고, 그 계열사에서 모바일 메신저 라인, 동영상 카메라 스노우, 디지털 만화 서비스 네이버웹툰, 메타버스 서비스 제페토 등을 서비스하고 있습니다.',
    content2:
      '또한, 네이버(주)는 인공지능, 로보틱스, 모빌리티 등 미래 기술에 대한 지속적인 연구개발을 통해 기술 플랫폼의 변화와 혁신을 추구하며 세계 각국의 수많은 이용자와 다양한 파트너들이 함께 성장할 수 있도록 노력하고 있습니다.',
  },
  {
    id: 3,
    name: '쿠팡',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/cupang.png',
    background_color: 'bg-[#4CCDC6]',
    content1:
      '쿠팡은 고객이 앱을 여는 순간부터 주문이 집으로 배달되는 순간까지 고객을 감동시키는 것을 목표로 쇼핑 경험을 재창조하고 있습니다. 쿠팡은 고객의 일상을 바꿉니다. 쿠팡 없이 어떻게 살았을까라는 생각이 드는 세상을 만들고 있습니다.',
    content2:
      '뛰어난 엔드투엔드(end-to-end) 물류 네트워크, 그리고 고집스럽게 고객만을 생각하는 문화. 이를 통해 쿠팡은 빠른 서비스, 넓은 선택의 폭, 낮은 가격이라는 세 가지 목표를 모두 이뤄냈습니다. 신선식품을 포함한 수백만 개의 상품을 1년 365일, 단 몇 시간 내에 전국에 배송합니다.',
  },
  {
    id: 4,
    name: '현대자동차',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/hyundai.png',
    background_color: 'bg-[#4CCDC6]',
    content1:
      '현대자동차는 국내 최초로 독자 모델 포니를 개발하며 대한민국 자동차 산업의 선구자 역할을 해 왔습니다. 세계 200여 개국에 자동차를 수출하고 글로벌 생산기지를 건설해 세계적인 자동차 메이커로 자리매김했습니다.',
    content2:
      '세계 최초 양산형 수소차를 출시하고 프리미엄 브랜드 제네시스를 론칭해 시장을 확대하는 한편, 선도적 자율주행과 커넥티비티 기술을 바탕으로 미래 모빌리티 산업을 견인하고 있습니다. 현대자동차는 ‘인류애를 향한 진보’를 목표로 기술의 진화를 실현하며 인류를 위한 더 나은 방향을 모색하고 있습니다.',
  },
  {
    id: 5,
    name: '우아한형제들',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/uwa.png',
    background_color: 'bg-[#4CCDC6]',
    content1:
      '우아한형제들은 배달이 일상을 조금 더 행복하게 하도록 오늘도 달리고 있습니다. 우아한형제들은 일하는 문화를 혁신하고 있습니다. 평범한 사람들이 모여 비범한 성과를 만들어 내는 곳이 될 수 있도록 건강한 조직문화를 만드는 일에 진심을 다합니다.',
    content2:
      '우아한형제들은 대한민국을 넘어 세계를 향해 나아갑니다. 베트남 진출을 시작으로 우아한형제들은 Delivery Hero와 함께 <우아DH아시아>를 설립하고 아시아 사업을 총괄하고 있습니다.',
  },
  {
    id: 6,
    name: '카카오',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/kakao.png',
    background_color: 'bg-[#f9e000]',
    content1:
      '카카오는 모두가 편하고 안전하게 쓸 수 있는 기술로 더 나은 세상을 열어갑니다. 플랫폼을 통해 이용자 및 파트너가 보다 편리하고 효율적으로 디지털 기술의 혜택을 누릴 수 있도록 디지털 전환을 돕습니다.',
    content2:
      '카카오는 사람에 대한 이해를 바탕으로 우리에게 필요한 미래를 고민하고 기술로 그 답을 찾아왔습니다. 문제의 본질에 집중해 시대에 맞는 기술과 서비스를 만들고, 안전한 디지털 환경 조성 및 모두를 위한 사회적 가치를 추구해 나갑니다.',
  },
  {
    id: 7,
    name: '당근마켓',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/carrotmarket.png',
    background_color: 'bg-[#4CCDC6]',
    content1:
      '당근은 동네의 가치에 주목합니다. 근처에 살고 있는 이웃과의 중고 직거래를 시작으로, 전에 없던 지역 생활 커뮤니티를 만들어나가고 있어요.',
    content2:
      '이웃들은 진짜 우리 동네 이야기를 주고받을 수 있고, 가게 사장님들은 이웃의 목소리를 가장 가까이서 들을 수 있지요. 거래, 모임, 홍보, 결제까지, 동네에서 일어나는 다양한 경험을 당근으로 연결하고 있습니다.',
  },
  {
    id: 8,
    name: '쏘카',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/socar.png',
    background_color: 'bg-[#4CCDC6]',
    content1:
      '쏘카는 모든 사람이 자유롭고 행복하게 이동하는 세상을 만들기 위해 쏘카 유니버스와 함께 모빌리티 생태계를 만듭니다. 쏘카는 기술과 데이터로 이동 경험을 혁신하는 테크 플랫폼(마이크로 서비스)으로 나아갑니다.',
    content2:
      '쏘카에 합류하여 어떠한 커리어를 그려갈 수 있을지 궁금하시다면 커피챗 통해 편하게 대화 나눠보아요',
  },
  {
    id: 9,
    name: 'LG전자',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/lg.png',
    background_color: 'bg-[#A50034]',
    content1:
      "LG전자는 ‘Life's Good’ 브랜드 철학을 바탕으로 고객에게 더 나은 삶을 제공하기 위해 ▲최고의(First) ▲차별화된(Unique) ▲세상에 없던(New) F·U·N 경험을 선사하고자 항상 노력합니다.",
    content2:
      'H&A(Home Appliance & Air Solution), HE(Home Entertainment), VS(Vehicle component Solutions), BS(Business Solutions)의 사업본부로 구성되어있으며, 전 세계 130여 개 사업장에서 사업을 전개하며 가전, IT, 자동차부품, 사이니지 등 다양한 분야에서 기술혁신을 선도하는 글로벌 리더입니다.',
  },
  {
    id: 10,
    name: '라인',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/line.png',
    background_color: 'bg-[#2DB400]',
    content1:
      '라인플러스 주식회사(LINE Plus Corporation)는 LINE의 글로벌 시장 확대를 목적으로 2013년 한국에서 설립됐습니다.',
    content2:
      '라인플러스 임직원들은 30여 개국에 이르는 각기 다른 국적의 동료들과 함께 기술, 디자인, 마케팅/영업, 홍보, 제휴 등 다양한 분야의 글로벌 업무를 진행하며, 전 세계를 대상으로 라인 서비스를 전개하고 있습니다.',
  },
  {
    id: 11,
    name: '삼성SDS',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EC%82%BC%EC%84%B1SDS.png',
    background_color: 'bg-[#1428A0]',
    content1:
      '삼성SDS는 클라우드와 디지털 물류 서비스를 제공하는 기업입니다. 기업 맞춤 삼성 클라우드 플랫폼을 통해 최적화된 클라우드 환경을 구현하고, 39년간 노하우를 바탕으로 올인원 매니지드 서비스를 제공하며, 검증된 SaaS 솔루션을 통해 업무 효율과 고객 서비스 혁신을 제고합니다.',
    content2:
      '삼성SDS는 기업 환경에 최적화된 클라우드 서비스와 디지털 물류 플랫폼 기반 물류 서비스를 제공하고 있습니다. 삼성 클라우드 플랫폼 (Samsung Cloud Platform, SCP) 의 차별화된 기술력과 다양한 업종 및 프로세스에 대한 노하우를 바탕으로 Hybrid/Multi 클라우드 서비스, 업무 프로세스별 SaaS 도입과 운영, 디지털 기술을 활용하는 부분까지 클라우드 기반의 디지털 전환 서비스를 제공합니다.',
  },
  {
    id: 12,
    name: '포스코',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/posco.png',
    background_color: 'bg-[#0073C8]',
    content1:
      '포스코는 1968년 설립된 대한민국의 대표 철강회사로, 철강 산업의 중추적인 역할을 담당하며 글로벌 시장에서 독보적인 위치를 차지하고 있습니다. 포스코는 철강 생산뿐만 아니라, 신재생 에너지, 소재 및 화학 등 다양한 분야로 사업을 확장하며 지속 가능한 미래를 위한 솔루션을 제공하고 있습니다.',
    content2:
      '포스코는 고객의 요구를 최우선으로 생각하며, 지속적인 기술 혁신과 연구 개발을 통해 최첨단 철강 제품을 공급하고 있습니다. 또한, 기업의 사회적 책임을 다하기 위해 다양한 사회 공헌 활동을 전개하며, 환경 보호와 지역 사회 발전에도 기여하고 있습니다.',
  },
  {
    id: 13,
    name: 'SK텔레콤',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/sktelecom.png',
    background_color: 'bg-[#E71A0F]',
    content1:
      'SK텔레콤은 대한민국의 대표적인 통신 회사로서, 5G, AI, 빅데이터 등 첨단 기술을 활용하여 통신 및 ICT 분야에서 혁신을 선도하고 있습니다. SK텔레콤은 초고속 네트워크, 스마트 시티, 자율주행 등 다양한 미래 기술 분야에서도 앞장서고 있으며, 고객의 편리한 삶을 위해 지속적인 투자를 이어가고 있습니다.',
    content2:
      'SK텔레콤은 고객 중심의 혁신적인 서비스를 제공하기 위해 노력하고 있으며, 인공지능 플랫폼, 클라우드 서비스, 스마트 홈 솔루션 등 다양한 분야에서 혁신적인 제품과 서비스를 출시하고 있습니다. 또한, 사회적 책임을 다하기 위해 지속 가능한 경영과 환경 보호에도 적극 나서고 있습니다.',
  },
  {
    id: 14,
    name: 'CJ제일제당',
    imageUrl:
      'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/CJ%EC%A0%9C%EC%9D%BC%EC%A0%9C%EB%8B%B9.jpg',
    background_color: 'bg-[#0078A8]',
    content1:
      'CJ제일제당은 대한민국의 대표적인 식품 및 바이오 기업으로, 글로벌 시장에서 다양한 식품 및 바이오 제품을 생산하고 있습니다. 1953년 설립된 이후로 CJ제일제당은 건강과 행복을 위한 식품을 개발하며, 지속 가능한 경영을 통해 글로벌 식품 시장에서의 경쟁력을 강화하고 있습니다.',
    content2:
      'CJ제일제당은 고객의 건강과 환경을 생각하는 혁신적인 제품을 개발하며, 친환경 바이오 솔루션과 지속 가능한 농업을 통해 더 나은 미래를 만들어가고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 함께 성장하는 기업이 되기 위해 노력하고 있습니다.',
  },
  {
    id: 15,
    name: 'GS칼텍스',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/GS.jpg',
    background_color: 'bg-[#004F83]',
    content1:
      'GS칼텍스는 대한민국의 대표적인 정유 및 에너지 기업으로, 국내외에서 다양한 석유 및 에너지 제품을 생산 및 공급하고 있습니다. GS칼텍스는 지속 가능한 에너지 개발과 환경 보호를 위한 기술 혁신에 중점을 두고 있으며, 글로벌 에너지 시장에서의 경쟁력을 강화하고 있습니다.',
    content2:
      'GS칼텍스는 고객의 요구에 부응하는 고품질의 에너지 솔루션을 제공하며, 지속 가능한 미래를 위한 연구 개발에 지속적으로 투자하고 있습니다. 또한, 친환경 경영을 통해 탄소 배출을 줄이고, 다양한 사회 공헌 활동을 통해 지역 사회와 환경 보호에 기여하고 있습니다.',
  },
  {
    id: 16,
    name: '롯데그룹',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/lotte.png',
    background_color: 'bg-[#C60C30]',
    content1:
      '롯데그룹은 대한민국의 대표적인 대기업으로, 유통, 식품, 화학, 관광, 건설 등 다양한 산업 분야에서 글로벌 경쟁력을 갖추고 있습니다. 롯데그룹은 고객의 행복과 삶의 질 향상을 위해 끊임없는 혁신을 추구하며, 지속 가능한 경영을 통해 글로벌 시장에서의 위치를 공고히 하고 있습니다.',
    content2:
      '롯데그룹은 고객 중심의 경영 철학을 바탕으로 다양한 제품과 서비스를 제공하며, 글로벌 시장에서의 성장과 함께 사회적 책임을 다하기 위해 다양한 공헌 활동을 펼치고 있습니다. 또한, 환경 보호와 지속 가능한 발전을 위한 다양한 프로젝트를 추진하고 있습니다.',
  },
  {
    id: 17,
    name: '아모레퍼시픽',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/amorepacific.jpg',
    background_color: 'bg-[#005CB9]',
    content1:
      '아모레퍼시픽은 대한민국을 대표하는 글로벌 화장품 기업으로, 아시아를 넘어 전 세계에서 사랑받는 다양한 뷰티 제품을 제공하고 있습니다. 아모레퍼시픽은 자연과의 조화를 중요시하며, 혁신적인 뷰티 솔루션을 통해 고객의 아름다움과 건강을 책임지고 있습니다.',
    content2:
      '아모레퍼시픽은 글로벌 시장에서의 지속적인 성장을 위해 연구 개발에 아낌없는 투자를 하고 있으며, 친환경 경영을 실천하며 자연 보호에 앞장서고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 전 세계 고객들과 함께 더 나은 세상을 만들어가고 있습니다.',
  },
  {
    id: 18,
    name: '셀트리온',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/celltrion.png',
    background_color: 'bg-[#009F6B]',
    content1:
      '셀트리온은 대한민국의 바이오제약 분야에서 글로벌 리더로 성장한 기업으로, 바이오의약품 개발 및 생산에 있어서 세계적인 경쟁력을 갖추고 있습니다. 셀트리온은 다양한 질병을 치료하기 위한 혁신적인 바이오 의약품을 개발하며, 전 세계 환자들에게 더 나은 치료 옵션을 제공하고 있습니다.',
    content2:
      '셀트리온은 지속 가능한 바이오 혁신을 통해 글로벌 헬스케어 시장에서의 입지를 강화하고 있으며, 사회적 책임을 다하기 위해 다양한 의료 지원 활동과 사회 공헌 활동을 전개하고 있습니다. 또한, 바이오산업의 발전과 인류 건강 증진을 위해 꾸준히 노력하고 있습니다.',
  },
  {
    id: 19,
    name: 'KT',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/kt.png',
    background_color: 'bg-[#F5002F]',
    content1:
      'KT는 대한민국의 대표적인 통신 회사로, 5G 및 AI 기반의 차세대 통신 기술을 선도하고 있습니다. KT는 고객의 편리한 삶을 위해 초고속 인터넷, IPTV, 스마트 홈 솔루션 등 다양한 통신 및 ICT 서비스를 제공하고 있으며, 미래 지향적인 기술 개발에 힘쓰고 있습니다.',
    content2:
      'KT는 고객 중심의 혁신적인 서비스를 제공하기 위해 최선을 다하며, 지속 가능한 경영을 통해 환경 보호와 사회적 책임을 다하고 있습니다. 또한, 스마트 시티, 자율주행, IoT 등 첨단 기술을 바탕으로 대한민국을 넘어 글로벌 통신 시장에서의 입지를 확고히 하고 있습니다.',
  },
  {
    id: 20,
    name: '한화',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/hanwha.jpg',
    background_color: 'bg-[#FF6F00]',
    content1:
      '한화는 방산, 화학, 금융, 에너지 등 다양한 산업 분야에서 글로벌 경쟁력을 갖춘 대한민국의 대표적인 대기업입니다. 한화는 지속 가능한 발전을 위해 다양한 신사업을 추진하고 있으며, 글로벌 시장에서의 입지를 강화하고 있습니다.',
    content2:
      '한화는 기업의 사회적 책임을 다하기 위해 다양한 사회 공헌 활동을 펼치고 있으며, 환경 보호와 지속 가능한 경영을 실천하고 있습니다. 또한, 첨단 기술을 활용한 혁신적인 제품과 서비스를 통해 고객의 기대를 초과하는 가치를 제공하고 있습니다.',
  },
  {
    id: 21,
    name: '대한항공',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/koreanair.png',
    background_color: 'bg-[#0D429E]',
    content1:
      '대한항공은 대한민국을 대표하는 항공사로, 전 세계에서 안전하고 편안한 항공 서비스를 제공하고 있습니다. 대한항공은 글로벌 항공 시장에서 독보적인 위치를 차지하고 있으며, 고객의 안전과 만족을 최우선으로 생각하며 혁신적인 서비스를 제공합니다.',
    content2:
      '대한항공은 지속 가능한 항공 운송을 위해 환경 보호와 사회적 책임을 다하는 경영을 실천하고 있으며, 글로벌 시장에서의 입지를 더욱 강화하기 위해 지속적인 투자와 혁신을 이어가고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 전 세계 고객들과의 신뢰를 쌓아가고 있습니다.',
  },
  {
    id: 22,
    name: '신세계',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%A0%EC%84%B8%EA%B3%84.png',
    background_color: 'bg-[#8B0000]',
    content1:
      '신세계는 대한민국의 대표적인 유통 기업으로, 고급스러운 쇼핑 경험과 다양한 라이프스타일 서비스를 제공하고 있습니다. 신세계는 고객의 삶을 더욱 풍요롭고 행복하게 만들기 위해 끊임없는 혁신을 추구하며, 글로벌 시장에서도 높은 경쟁력을 갖추고 있습니다.',
    content2:
      '신세계는 고객 중심의 경영 철학을 바탕으로 프리미엄 제품과 서비스를 제공하며, 지속 가능한 경영을 통해 환경 보호와 사회적 책임을 다하고 있습니다. 또한, 고객의 다양한 요구에 부응하기 위해 끊임없는 연구 개발과 혁신을 이어가고 있습니다.',
  },
  {
    id: 23,
    name: '현대백화점',
    imageUrl:
      'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%ED%98%84%EB%8C%80%EB%B0%B1%ED%99%94%EC%A0%90.png',
    background_color: 'bg-[#0078B2]',
    content1:
      '현대백화점은 대한민국의 대표적인 백화점으로, 고품격 쇼핑 경험을 제공하며 고객의 다양한 라이프스타일을 만족시키고 있습니다. 현대백화점은 다양한 브랜드와 제품을 통해 고객의 삶을 더욱 풍요롭게 만들고 있으며, 프리미엄 서비스와 고급스러운 쇼핑 환경을 제공합니다.',
    content2:
      '현대백화점은 고객 중심의 경영 철학을 바탕으로 다양한 고객의 요구를 충족시키며, 지속 가능한 경영을 통해 환경 보호와 사회적 책임을 다하고 있습니다. 또한, 고객의 만족을 최우선으로 생각하며 끊임없는 혁신과 발전을 추구하고 있습니다.',
  },
  {
    id: 24,
    name: 'LG화학',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/LG%ED%99%94%ED%95%99.jpg',
    background_color: 'bg-[#A50034]',
    content1:
      'LG화학은 대한민국을 대표하는 글로벌 화학 기업으로, 지속 가능한 화학 솔루션을 통해 전 세계 시장에서 독보적인 위치를 차지하고 있습니다. LG화학은 다양한 산업 분야에서 고품질의 화학 제품을 생산하며, 환경 보호와 지속 가능한 발전을 위해 끊임없는 혁신을 추구하고 있습니다.',
    content2:
      'LG화학은 글로벌 화학 산업의 선두주자로서, 고객의 요구에 부응하는 혁신적인 솔루션을 제공하고 있으며, 친환경 경영을 통해 탄소 배출을 줄이고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 환경 보호에 기여하고 있습니다.',
  },
  {
    id: 25,
    name: '농심',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EB%86%8D%EC%8B%AC.png',
    background_color: 'bg-[#FF4500]',
    content1:
      '농심은 대한민국을 대표하는 식품 기업으로, 전 세계에 사랑받는 다양한 라면과 스낵 제품을 생산하고 있습니다. 농심은 고객의 건강과 행복을 최우선으로 생각하며, 끊임없는 혁신과 품질 향상을 통해 글로벌 식품 시장에서의 입지를 강화하고 있습니다.',
    content2:
      '농심은 지속 가능한 식품 솔루션을 제공하기 위해 친환경 경영을 실천하며, 고객의 기대를 초과하는 맛과 품질을 제공하기 위해 노력하고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 함께 성장하며, 환경 보호에도 기여하고 있습니다.',
  },
  {
    id: 26,
    name: '오뚜기',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EC%98%A4%EB%9A%9C%EA%B8%B0.jpg',
    background_color: 'bg-[#FFD700]',
    content1:
      '오뚜기는 대한민국의 대표적인 식품 기업으로, 다양한 식품 제품으로 국민들의 사랑을 받고 있습니다. 오뚜기는 건강과 안전을 최우선으로 생각하며, 고객의 신뢰를 바탕으로 끊임없는 혁신을 통해 지속 가능한 식품 솔루션을 제공하고 있습니다.',
    content2:
      '오뚜기는 고품질의 식품을 제공하기 위해 최신 기술과 연구 개발에 아낌없는 투자를 하고 있으며, 환경 보호와 지속 가능한 경영을 실천하고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 함께 성장하며, 고객의 건강과 행복을 위해 최선을 다하고 있습니다.',
  },
  {
    id: 27,
    name: '삼양식품',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EC%82%BC%EC%96%91.jpg',
    background_color: 'bg-[#FF6347]',
    content1:
      '삼양식품은 대한민국을 대표하는 라면 제조업체로, 전 세계에 사랑받는 다양한 라면 제품을 생산하고 있습니다. 삼양식품은 고객의 신뢰를 바탕으로 품질을 최우선으로 생각하며, 끊임없는 혁신과 연구 개발을 통해 글로벌 식품 시장에서의 입지를 강화하고 있습니다.',
    content2:
      '삼양식품은 고객의 기대를 초과하는 맛과 품질을 제공하기 위해 노력하고 있으며, 지속 가능한 식품 솔루션을 제공하기 위해 친환경 경영을 실천하고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 함께 성장하며, 환경 보호에도 기여하고 있습니다.',
  },
  {
    id: 28,
    name: '제주항공',
    imageUrl:
      'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%A3%BC%ED%95%AD%EA%B3%B5.png',
    background_color: 'bg-[#FF8C00]',
    content1:
      '제주항공은 대한민국의 대표적인 저비용항공사(LCC)로, 합리적인 가격과 신뢰할 수 있는 서비스를 통해 국내외 여행객들에게 사랑받고 있습니다. 제주항공은 고객의 편리하고 안전한 여행을 최우선으로 생각하며, 지속적인 혁신을 통해 항공 여행의 대중화를 선도하고 있습니다.',
    content2:
      '제주항공은 고객의 다양한 요구에 부응하기 위해 끊임없는 서비스 개선과 연구 개발에 투자하고 있으며, 지속 가능한 항공 운송을 위해 환경 보호와 사회적 책임을 다하는 경영을 실천하고 있습니다. 또한, 다양한 사회 공헌 활동을 통해 지역 사회와 함께 성장하고 있습니다.',
  },
  {
    id: 29,
    name: '하이브',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/%ED%95%98%EC%9D%B4%EB%B8%8C.jpg',
    background_color: 'bg-[#000000]',
    content1:
      '하이브는 대한민국을 대표하는 글로벌 음악 및 엔터테인먼트 기업으로, 전 세계에서 사랑받는 아티스트들과 함께 글로벌 무대에서 활약하고 있습니다. 하이브는 창의성과 혁신을 바탕으로 다양한 콘텐츠를 제작하며, 전 세계 팬들과의 소통을 통해 글로벌 엔터테인먼트 시장에서 독보적인 위치를 차지하고 있습니다.',
    content2:
      '하이브는 전 세계 팬들과 함께 성장하기 위해 다양한 혁신적인 프로젝트를 추진하고 있으며, 사회적 책임을 다하기 위해 다양한 공헌 활동을 펼치고 있습니다. 또한, 글로벌 시장에서의 입지를 더욱 강화하기 위해 지속적인 투자와 연구 개발에 아낌없는 노력을 기울이고 있습니다.',
  },
  {
    id: 30,
    name: 'CJ ENM',
    imageUrl: 'https://foss-bucket.s3.ap-northeast-2.amazonaws.com/cje%26m.jpg',
    background_color: 'bg-[#FF4500]',
    content1:
      'CJ ENM은 대한민국의 대표적인 엔터테인먼트 기업으로, 다양한 방송 프로그램, 영화, 음악 콘텐츠를 제작하며 글로벌 시장에서 큰 사랑을 받고 있습니다. CJ ENM은 창의적인 콘텐츠와 혁신적인 서비스를 통해 전 세계 시청자와 팬들에게 감동을 주며, 한류 문화를 선도하고 있습니다.',
    content2:
      'CJ ENM은 지속 가능한 콘텐츠 생태계를 구축하기 위해 아낌없는 투자를 하고 있으며, 글로벌 시장에서의 입지를 더욱 강화하기 위해 다양한 프로젝트를 추진하고 있습니다. 또한, 사회적 책임을 다하기 위해 다양한 공헌 활동을 전개하며, 전 세계 팬들과 함께 더 나은 세상을 만들어가고 있습니다.',
  },
];
