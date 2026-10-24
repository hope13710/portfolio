import type { StaticImageData } from "next/image";

import profile from "@/assets/profile.webp";
import iconEnactus from "@/assets/icon-enactus.png";
import iconGorae from "@/assets/icon-gorae.png";
import iconTeamnimals from "@/assets/icon-teamnimals.png";
import enactusGroup from "@/assets/enactus-group.webp";
import enactusPoster from "@/assets/enactus-poster.webp";
import enactusAiSchool from "@/assets/enactus-aischool.webp";
import goraeWeb from "@/assets/gorae-web.webp";
import goraeApp from "@/assets/gorae-app.webp";
import teamnimalsScreens from "@/assets/teamnimals-screens.webp";
import teamnimalsApp from "@/assets/teamnimals-app.webp";

/** Every piece of visible copy is written in both languages. */
export type L = { ko: string; en: string };

export type Picture = {
  src: StaticImageData;
  alt: L;
  /** CSS object-position, used when the frame crops the image. */
  position?: string;
};

export type Stage = {
  id: string;
  nav: string;
  period: L;
  /** Rounded-square app icon shown beside the title. */
  icon: StaticImageData;
  title: L;
  role: L;
  summary: L;
  /** A list `detail` renders as a full-width row below the others, one item per line. */
  highlights: { value: L; detail: L | L[] }[];
  tag?: L;
  links: { label: L; href: string }[];
  /** Several inset pictures take turns in the same frame. */
  media: { main: Picture & { caption: L }; inset: Picture | Picture[] };
};

export const profileIntro = {
  id: "stage-0",
  nav: "PLAYER",
  name: { ko: "강주영", en: "Kang Ju Yeong" },
  alias: { ko: "Kang Ju Yeong · Ethan", en: "Ethan · 강주영" },
  headline: {
    ko: "사람들을 즐겁게 하는 제품을 만드는 사람",
    en: "Building products that make people happy",
  },
  body: {
    ko: "인생은 ‘게임’, 사업은 ‘종합예술’. 중학생 시절 첫 온라인 비즈니스부터 창업학회 회장까지, 기획·디자인·개발을 넘나드는 실행. 지금의 목표는 기술과 엔터테인먼트가 만나는 지점에서 전 세계 아티스트를 위한 인프라 구축.",
    en: "Life is a game; business is a total art form. From a first online business in middle school to leading a startup society, moving freely across planning, design and building. Next goal: infrastructure for artists worldwide, where technology meets entertainment.",
  },
  interests: [
    { ko: "IT / AI", en: "IT / AI" },
    { ko: "엔터테인먼트", en: "Entertainment" },
    { ko: "창업", en: "Startups" },
  ],
  photo: {
    src: profile,
    alt: { ko: "강주영 프로필 사진", en: "Portrait of Kang Ju Yeong" },
    caption: { ko: "강주영 · Ethan", en: "Kang Ju Yeong · Ethan" },
    position: "50% 30%",
  },
};

export const stages: Stage[] = [
  {
    id: "stage-1",
    nav: "ENACTUS",
    period: { ko: "2025", en: "2025" },
    icon: iconEnactus,
    title: { ko: "Enactus", en: "Enactus" },
    role: { ko: "회장", en: "President" },
    summary: {
      ko: "서울시립대 중앙 실전창업학회 운영 총괄",
      en: "Led the University of Seoul’s central startup society",
    },
    highlights: [
      {
        value: { ko: "해커톤 개최", en: "Hackathon host" },
        detail: {
          ko: "창업지원단과 서울시 사회문제 해결 ‘SEOUL:ution 해커톤’ 개최 · 모스랜드 등 기업 후원 유치 · 언론 보도",
          en: "Hosted the SEOUL:ution Hackathon on Seoul’s social issues with the university startup center · secured sponsors incl. Mossland · covered by the press",
        },
      },
      {
        value: { ko: "AI 교육 기획", en: "AI program" },
        detail: {
          ko: "캠퍼스타운과 학회 최초 공식 협력 · ‘AI SCHOOL’ 실습형 창업교육 기획 참여 · 역대 최대 참석자 특강 개최",
          en: "First official partnership with UOS Campus Town · co-planned the hands-on ‘AI SCHOOL’ program · hosted its best-attended talk to date",
        },
      },
      {
        value: { ko: "총장상 수상", en: "President’s Award" },
        detail: {
          ko: "‘제2공학관 → 창의혁신관’ 건물 명칭 변경 제안 등 창업 공간 브랜딩 공로",
          en: "For branding the campus startup space, including renaming Engineering Hall II to ‘Creative Innovation Hall’",
        },
      },
    ],
    tag: {
      ko: "연합 창업 아이디어톤 2학기 연속 1위",
      en: "1st place at inter-university ideathons, two semesters running",
    },
    links: [
      { label: { ko: "Instagram", en: "Instagram" }, href: "https://www.instagram.com/enactus_uos_" },
      { label: { ko: "해커톤 기사", en: "Hackathon press" }, href: "https://www.joongang.co.kr/article/25387687" },
    ],
    media: {
      main: {
        src: enactusGroup,
        alt: { ko: "2025 인액터스 서울시립대 단체사진", en: "Enactus UOS 2025 group photo" },
        caption: { ko: "2025 Enactus", en: "Enactus, 2025" },
        position: "50% 40%",
      },
      inset: [
        {
          src: enactusPoster,
          alt: { ko: "SEOUL:ution 해커톤 포스터", en: "SEOUL:ution Hackathon poster" },
          position: "50% 0%",
        },
        {
          src: enactusAiSchool,
          alt: { ko: "2025 서울시립대 캠퍼스타운 AI SCHOOL 포스터", en: "2025 UOS Campus Town AI SCHOOL poster" },
          position: "50% 0%",
        },
      ],
    },
  },
  {
    id: "stage-2",
    nav: "GORAE KOREAN",
    period: { ko: "2024.04 – 2025.08", en: "Apr 2024 – Aug 2025" },
    icon: iconGorae,
    title: { ko: "고래코리안", en: "Gorae Korean" },
    role: { ko: "공동창업자 · 서비스 기획 · UX/UI · 노코드 개발", en: "Co-founder · Product · UX/UI · No-code" },
    summary: {
      ko: "한국의 한부모 가정과 해외 학습자를 잇는 실용 한국어 회화 플랫폼",
      en: "A practical Korean conversation platform connecting single-parent families in Korea with learners abroad",
    },
    highlights: [
      {
        value: { ko: "7일 · 200명", en: "200 in 7 days" },
        detail: {
          ko: "인스타그램 무료 수업 모집으로 시장 반응 검증",
          en: "Validated demand through free Instagram classes",
        },
      },
      {
        value: { ko: "유료 학생 80명", en: "80 paying students" },
        detail: {
          ko: "Bubble 기반 웹 MVP · 자체 교재 제작 · 튜터 2명 고용까지 수익화",
          en: "Bubble-built web MVP · in-house materials · two paid tutors",
        },
      },
      {
        value: { ko: "MOU 체결", en: "MOU signed" },
        detail: {
          ko: "(사)한국미혼모가족협회와 업무협약 · 언론 보도",
          en: "With the Korean Unwed Mothers’ Families Association · in the press",
        },
      },
      {
        value: { ko: "수상", en: "Awards" },
        detail: [
          {
            ko: "중소벤처기업부 예비창업패키지 사전 인큐베이팅 우수예비기업",
            en: "Ministry of SMEs Pre-Startup Package — top team",
          },
          { ko: "현대해상 씨앗 프로그램 4위", en: "Hyundai Marine & Fire Seed Program — 4th" },
          { ko: "SDGs 소셜벤처 챔피언십 금상", en: "SDGs Social Venture Championship — Gold" },
          { ko: "시기적절 창업대회 장려상", en: "Sigijeokjeol Startup Competition — Honorable Mention" },
          { ko: "서울시립대 여름 창업경진대회 최우수상", en: "UOS Summer Startup Competition — Top Prize" },
          { ko: "서울시립대 캠퍼스타운 입주기업 선정", en: "UOS Campus Town — selected startup" },
        ],
      },
    ],
    links: [
      { label: { ko: "goraekorean.site", en: "goraekorean.site" }, href: "https://goraekorean.site" },
      { label: { ko: "MOU 기사", en: "MOU press" }, href: "https://www.startupdaily.kr/news/articleView.html?idxno=6454" },
    ],
    media: {
      main: {
        src: goraeApp,
        alt: { ko: "온라인 실용 한국어 회화 플랫폼 고래코리안", en: "Gorae Korean, an online platform for practical Korean conversation" },
        caption: { ko: "고래코리안 서비스 화면", en: "Gorae Korean app" },
      },
      inset: {
        src: goraeWeb,
        alt: { ko: "고래코리안 웹사이트 화면", en: "Gorae Korean website" },
        position: "50% 0%",
      },
    },
  },
  {
    id: "stage-3",
    nav: "TEAMNIMALS",
    period: { ko: "2025", en: "2025" },
    icon: iconTeamnimals,
    title: { ko: "팀니멀즈", en: "Teamnimals" },
    role: { ko: "기획 · AI 로직 · UX/UI · 노코드 개발 · 그로스", en: "Product · AI logic · UX/UI · No-code · Growth" },
    summary: {
      ko: "협업 성향을 16가지 동물로 보여주는 팀플 성향 테스트 + AI 팀 궁합 분석 서비스",
      en: "A team-play personality test with 16 animal types, plus AI team-chemistry analysis",
    },
    highlights: [
      {
        value: { ko: "1,000명+", en: "1,000+ users" },
        detail: {
          ko: "광고 없이 재학생 약 1/8 사용",
          en: "About 1 in 8 students, with zero ad spend",
        },
      },
      {
        value: { ko: "정규 수업 10개+", en: "10+ courses" },
        detail: {
          ko: "경영학과·영어영문학과 등 실제 수업에서 활용",
          en: "Adopted in real classes, from Business to English Literature",
        },
      },
      {
        value: { ko: "재방문율 20%", en: "20% return rate" },
        detail: {
          ko: "결과 공유 중심의 바이럴 설계 · 평균 체류 1분 47초",
          en: "Share-driven viral loop · 1m 47s average session",
        },
      },
    ],
    links: [{ label: { ko: "teamnimals.me", en: "teamnimals.me" }, href: "https://teamnimals.me" }],
    media: {
      main: {
        src: teamnimalsApp,
        alt: { ko: "팀플 성향 테스트 + AI 팀 궁합 분석 서비스", en: "Team-play personality test + AI team-chemistry analysis" },
        caption: { ko: "팀플 성향 테스트", en: "Team-play personality test" },
        position: "0% 50%",
      },
      inset: {
        src: teamnimalsScreens,
        alt: { ko: "팀니멀즈 AI 팀 궁합 분석 화면", en: "Teamnimals AI team-chemistry screens" },
        position: "65% 50%",
      },
    },
  },
];

export const contact = {
  id: "stage-4",
  nav: "NEXT STAGE",
  headline: {
    ko: "다음 스테이지를 함께할 동료를 찾는 중",
    en: "Looking for my next party",
  },
  email: "hope13710@gmail.com",
  etc: {
    label: { ko: "기타", en: "Etc." },
    period: { ko: "2026 – 2027", en: "2026 – 2027" },
    text: {
      ko: "군복무 · 합천과학화예비군훈련장 VR 영상모의사격 조교 · 일 평균 약 200명 사격 훈련 운영 지원",
      en: "Military service · VR shooting-simulator instructor at Hapcheon Reserve Forces Training Center · supporting ~200 trainees a day",
    },
  },
};
