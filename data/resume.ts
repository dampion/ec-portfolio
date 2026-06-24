export type Locale = 'zh' | 'en'

export type LocalizedText = Record<Locale, string>
export type LocalizedList = Record<Locale, string[]>

export interface ResumeLink {
  label: string
  url: string
}

export interface ExperienceItem {
  company: LocalizedText
  role: LocalizedText
  period: string
  highlights: LocalizedList
}

export interface CompetencyItem {
  title: LocalizedText
  highlights: LocalizedList
}

export interface SkillItem {
  name: string
  level: number
}

export interface EducationItem {
  school: LocalizedText
  degree: LocalizedText
  period: string
}

export interface ResumeData {
  profile: {
    name: LocalizedText
    brand: string
    title: LocalizedText
    summary: LocalizedText
    email: string
    location: LocalizedText
    links: ResumeLink[]
  }
  experience: ExperienceItem[]
  competencies: CompetencyItem[]
  skills: SkillItem[]
  education: EducationItem[]
}

export const resume: ResumeData = {
  profile: {
    name: {
      zh: '陳冠鈞',
      en: 'Evan Chen',
    },
    brand: 'EC',
    title: {
      zh: '前端工程師',
      en: 'Web Developer',
    },
    summary: {
      zh: '專注於 Vue 與 Hybrid App 開發的前端開發者，擅長 Web / H5 高還原切版、API 串接與前端效能優化。重視程式碼品質、使用者體驗與跨團隊協作，具備 Git flow、Code Review 與 CI/CD 實務經驗。',
      en: 'Frontend Developer specializing in Vue and Hybrid App development. Experienced in high-fidelity Web / H5 implementation, API integration, and front-end performance optimization. Committed to code quality, user experience, and cross-functional collaboration with hands-on Git flow, code review, and CI/CD experience.',
    },
    email: 'evanchen79@gmail.com',
    location: {
      zh: '台灣',
      en: 'Taiwan',
    },
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/evan-chen-6a9308b5/' },
      { label: 'GitHub', url: 'https://github.com/dampion' },
    ],
  },
  experience: [
    {
      company: { zh: '斐亞米有限公司', en: 'Feiyami Ltd.' },
      role: { zh: '前端工程師 Lead', en: 'Frontend Engineer Lead' },
      period: '— 2026/06/30',
      highlights: {
        zh: [
          '負責 Web / H5 / Hybrid App 開發，依 Figma 設計稿進行高還原切版與 RWD 響應式實作',
          '運用 Vue 3 進行核心 SPA 架構開發與組件化設計，串接 API 實現複雜前後端數據整合',
          '進行前端效能優化與程式重構，提升專案可維護性與頁面載入速度',
          '主導 Git flow、Code Review 與跨職能協作，確保交付品質與開發效率',
        ],
        en: [
          'Led Web / H5 / Hybrid App development with high-fidelity implementation from Figma designs and responsive layouts',
          'Built core SPA architecture and component design with Vue 3, integrating APIs for complex front-end and back-end data flows',
          'Drove front-end performance optimization and refactoring to improve maintainability and page load speed',
          'Led Git flow, code review, and cross-functional collaboration to ensure delivery quality and team efficiency',
        ],
      },
    },
    {
      company: { zh: '中佑資訊有限公司', en: 'Chung Yu Information Co., Ltd.' },
      role: { zh: '前端工程師', en: 'Frontend Engineer' },
      period: '2018/11 – 2020/03',
      highlights: {
        zh: [
          '熟悉 HTML、CSS、JavaScript、RWD、Vue.js，略懂 React.js；使用 Vuex、Vue-router、RxJS 及 iView、Element、Vant、Vuetify 等 UI 框架',
          '與後端 API Server 整合，熟悉前端跨瀏覽器解決方案與互動功能開發',
          '負責網站前端開發，優化功能設計及效能；具備專案效能優化、多程序與 reactive 資料流處理經驗',
          '與視覺設計師、後端工程師協作，具備整合流程自動化測試經驗',
          '具備 Git 版本控制經驗；遊戲產業開發 2 年以上，曾與歐洲廠商跨國合作開發視訊產品',
          '帶領四人以下團隊，分派工作任務與專案進度控管；曾調組支援其他組別即時需求',
          '略懂 d3.js 視覺化資料、Linux 作業系統（VM、Server 設定、建置流程）與前端部署 Hook',
          '非精通後端 API 開發，但可協作基本 API 開發；對團隊溝通配合態度開放、易於協作',
        ],
        en: [
          'Proficient in HTML, CSS, JavaScript, RWD, and Vue.js with basic React.js; experienced with Vuex, Vue-router, RxJS, and UI libraries such as iView, Element, Vant, and Vuetify',
          'Integrated with backend API servers and implemented cross-browser compatible interactive front-end features',
          'Led website front-end development with focus on feature design and performance; experienced in project performance optimization, multi-process flows, and reactive data handling',
          'Collaborated with visual designers and backend engineers; experienced in automated testing for integrated workflows',
          'Proficient in Git version control; 2+ years in game industry development with cross-border collaboration on video products with European partners',
          'Led teams of up to four members, assigning tasks and managing project progress; supported other teams for urgent cross-group needs',
          'Basic knowledge of d3.js data visualization, Linux (VM, server setup, build processes), and front-end deployment hooks',
          'Not a backend API specialist but able to collaborate on basic API development; open and adaptable in team communication',
        ],
      },
    },
  ],
  competencies: [
    {
      title: {
        zh: 'Front-End Web & Hybrid App Development',
        en: 'Front-End Web & Hybrid App Development',
      },
      highlights: {
        zh: [
          '使用 Vue、React、JavaScript、HTML、CSS 開發 Web 與 H5 頁面。',
          '根據 Figma 設計稿進行高還原切版，處理 RWD 響應式設計、跨瀏覽器相容與互動細節。',
          '串接後端 API，處理列表、表單、登入狀態、權限判斷、Loading、錯誤提示與非同步資料流程。',
          '開發與維護前端元件，整理共用邏輯，提升程式碼可讀性與後續維護效率；參與 Hybrid App / WebView 頁面開發，配合行動裝置情境調整畫面與操作體驗。',
        ],
        en: [
          'Develop Web and H5 pages using Vue, React, JavaScript, HTML, and CSS.',
          'Implement high-fidelity layouts from Figma designs, handling responsive design, cross-browser compatibility, and interaction details.',
          'Integrate backend APIs for lists, forms, auth state, permission checks, loading states, error handling, and async data flows.',
          'Build and maintain front-end components with shared logic for readability and maintainability; develop Hybrid App / WebView pages optimized for mobile contexts.',
        ],
      },
    },
    {
      title: {
        zh: 'Vue Front-End Development',
        en: 'Vue Front-End Development',
      },
      highlights: {
        zh: [
          '熟悉 Vue 3 Composition API、元件化開發、資料綁定與狀態管理。',
          '具備 SPA 架構開發經驗，熟悉路由管理、頁面拆分與模組化組織。',
          '了解 SSR、SSG 等渲染模式概念，能依產品需求評估適合的架構方案。',
          '針對公開頁面處理 title、meta description、OG tag、語意化 HTML、圖片 alt 與基本 SEO 優化。',
        ],
        en: [
          'Proficient in Vue 3 Composition API, component-based development, data binding, and state management.',
          'Experienced in SPA architecture with routing, page decomposition, and modular organization.',
          'Familiar with rendering modes such as SSR and SSG; able to evaluate suitable architecture based on product needs.',
          'Optimize public pages with title, meta description, OG tags, semantic HTML, image alt text, and basic SEO.',
        ],
      },
    },
    {
      title: {
        zh: 'Front-End Performance and Optimization',
        en: 'Front-End Performance and Optimization',
      },
      highlights: {
        zh: [
          '進行前端效能優化，例如圖片壓縮、lazy loading、路由懶加載、元件拆分與減少不必要的 API 請求。',
          '使用 Vite / Webpack 進行專案建置與基本打包優化。',
          '重構既有程式碼，降低重複邏輯，提升專案可維護性與穩定性。',
          '關注使用者體驗，優化頁面載入速度、操作流程與錯誤回饋。',
        ],
        en: [
          'Optimize front-end performance through image compression, lazy loading, route-based code splitting, component decomposition, and reduced API calls.',
          'Build and optimize projects with Vite / Webpack bundling.',
          'Refactor legacy code to reduce duplication and improve maintainability and stability.',
          'Focus on user experience by improving page load speed, interaction flows, and error feedback.',
        ],
      },
    },
    {
      title: {
        zh: 'Team Collaboration, Engineering, and Code Review',
        en: 'Team Collaboration, Engineering, and Code Review',
      },
      highlights: {
        zh: [
          '熟悉 Git 版本控管流程，能配合分支管理、Pull Request、Code Review 與版本發布流程。',
          '與設計師、後端工程師、PM 協作，釐清需求、API 格式、畫面狀態與互動流程。',
          '參與程式碼審查，針對可讀性、可維護性、邏輯正確性與潛在風險提出建議。',
          '能接受團隊回饋並調整實作方式，重視溝通、交付品質與開發效率。',
        ],
        en: [
          'Proficient in Git workflows including branching, pull requests, code review, and release processes.',
          'Collaborate with designers, backend engineers, and PMs to clarify requirements, API contracts, UI states, and interaction flows.',
          'Participate in code reviews focusing on readability, maintainability, correctness, and potential risks.',
          'Open to team feedback and iterative improvement, prioritizing communication, delivery quality, and efficiency.',
        ],
      },
    },
    {
      title: {
        zh: 'Testing, Automation, and Development Workflow',
        en: 'Testing, Automation, and Development Workflow',
      },
      highlights: {
        zh: [
          '具備 Jest / Vitest 單元測試基礎概念，理解關鍵邏輯與共用元件測試的重要性。',
          '使用 Shell Script 協助處理開發、建置、部署或備份流程。',
          '具備 CI/CD 基礎概念，了解 Jenkins、GitLab Runner 等自動化流程。',
          '善用 AI 工具協助理解文件、分析錯誤、產生測試案例與提升開發效率，但會依照官方文件與實際專案情境確認結果。',
        ],
        en: [
          'Understand unit testing fundamentals with Jest / Vitest, including the importance of testing critical logic and shared components.',
          'Use shell scripts to support development, build, deployment, and backup workflows.',
          'Familiar with CI/CD concepts and automation tools such as Jenkins and GitLab Runner.',
          'Leverage AI tools for documentation, error analysis, and test case generation while validating results against official docs and project context.',
        ],
      },
    },
    {
      title: {
        zh: 'Problem Solving and Product Thinking',
        en: 'Problem Solving and Product Thinking',
      },
      highlights: {
        zh: [
          '能獨立分析問題，釐清需求、限制與可能風險後提出可執行解法。',
          '在快速迭代的開發環境中，仍重視程式品質、使用者體驗與後續維護成本。',
          '不只完成畫面與功能，也會思考流程是否順暢、架構是否合理、是否方便後續擴充。',
          '持續學習前端技術、官方文件與實務最佳做法，提升產品開發效率與品質。',
        ],
        en: [
          'Independently analyze problems, clarify requirements, constraints, and risks before proposing actionable solutions.',
          'Maintain focus on code quality, user experience, and long-term maintenance cost even in fast-paced iteration cycles.',
          'Go beyond UI and features to evaluate flow usability, architecture soundness, and extensibility.',
          'Continuously learn front-end technologies, official documentation, and best practices to improve product delivery.',
        ],
      },
    },
  ],
  skills: [
    { name: 'Vue', level: 5 },
    { name: 'React', level: 4 },
    { name: 'Flutter', level: 4 },
    { name: 'Electron', level: 3 },
    { name: 'JavaScript', level: 5 },
    { name: 'TypeScript', level: 4 },
    { name: 'HTML / CSS', level: 5 },
    { name: 'Figma', level: 4 },
    { name: 'Vite / Webpack', level: 4 },
    { name: 'Jest / Vitest', level: 3 },
    { name: 'Git', level: 5 },
    { name: 'CI/CD', level: 4 },
  ],
  education: [
    {
      school: { zh: '國立中山大學', en: 'National Sun Yat-sen University' },
      degree: {
        zh: '材料與光電科學學系 · 學士',
        en: 'Materials and Optoelectronic Science · B.S.',
      },
      period: '',
    },
  ],
}

export function pickLocalized<T extends LocalizedText | LocalizedList>(
  value: T,
  locale: Locale,
): T extends LocalizedText ? string : string[] {
  return value[locale] as T extends LocalizedText ? string : string[]
}
