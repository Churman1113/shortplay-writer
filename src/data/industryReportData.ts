/**
 * 行业报告数据
 * 从 IndustryReport.tsx 抽离，保持组件精简
 */

import { INDUSTRY_DATA } from '@/lib/constants'

export const industryReportData = {
  marketScale: {
    title: '市场规模',
    current: INDUSTRY_DATA.marketSize,
    currentYear: String(INDUSTRY_DATA.marketSizeYear),
    next: '1000亿元',
    nextYear: '2026',
    growth: INDUSTRY_DATA.marketGrowth,
    note: '持续高速增长，市场规模破千亿在即',
  },
  userScale: {
    title: '用户规模',
    current: INDUSTRY_DATA.userScale,
    currentYear: '2025.12',
    next: '7.5亿+',
    nextYear: '2026',
    penetration: '78%',
    note: '短视频用户渗透率持续攀升',
  },
  revenue: {
    title: '出海收入',
    current: INDUSTRY_DATA.overseasRevenue,
    currentYear: '2025全年',
    growth: INDUSTRY_DATA.overseasGrowth,
    downloads: '15亿次',
    downloadsGrowth: '+105%',
  },
  topPlatforms: [
    { name: '红果短剧', company: '字节跳动', mau: '2.8亿', feature: '免费+广告模式绝对领先' },
    { name: '河马剧场', company: '点众科技', mau: '5800万', feature: 'IAP付费模式头部' },
    { name: '九州文化', company: '九州文化', mau: '3200万', feature: '内容版权储备第一' },
    { name: '番茄小说', company: '字节', dau: '1.5亿', feature: '书剧联动生态完善' },
  ],
  overseasPlatforms: [
    { name: 'ReelShort', share: '28.5%', feature: '北美市场绝对领先' },
    { name: 'DramaBox', dau: '800万', feature: '累计用户超2亿' },
    { name: 'Chapters', share: '18%', feature: '互动阅读转型成功' },
  ],
  genres: [
    { name: '甜宠', percentage: '32%', trend: 'down' },
    { name: '战神/赘婿', percentage: '25%', trend: 'stable' },
    { name: '重生复仇', percentage: '22%', trend: 'up' },
    { name: '虐恋', percentage: '12%', trend: 'stable' },
    { name: '其他', percentage: '9%', trend: 'stable' },
  ],
  monetization: [
    { mode: '广告模式(IAA)', percentage: '55%', scale: '375亿', growth: '+50%' },
    { mode: '付费模式(IAP)', percentage: '38%', scale: '260亿', growth: '+20%' },
    { mode: '电商模式', percentage: '7%', scale: '48亿', growth: '+80%' },
  ],
  trends: [
    {
      title: 'AI全面赋能',
      description: 'AIGC覆盖剧本创作、拍摄、后期全流程，制作效率提升300%',
      icon: 'TrendingUp',
    },
    {
      title: '免费模式主导',
      description: 'IAA模式占比超55%，红果短剧日活突破2.8亿',
      icon: 'Monitor',
    },
    {
      title: '出海持续爆发',
      description: `出海收入破${INDUSTRY_DATA.overseasRevenue}，同比增长${INDUSTRY_DATA.overseasGrowth}，北美市场份额扩大`,
      icon: 'Globe',
    },
    {
      title: '精品化升级',
      description: '单集制作成本从3万提升至8-15万，质量成为核心竞争力',
      icon: 'Smartphone',
    },
    {
      title: '短剧+电商融合',
      description: '直播带货+短剧成为新变现模式，GMV增长80%',
      icon: 'PieChart',
    },
    {
      title: '题材多元化',
      description: '重生复仇题材崛起，都市职场题材增速明显',
      icon: 'BarChart3',
    },
  ],
  userBehavior: [
    { metric: '人均单日使用时长', value: '115分钟', note: '超越即时通讯' },
    { metric: '日均观看超1小时', value: '38%', note: '高粘性用户增长' },
    { metric: '付费用户比例', value: '52%', note: '付费意愿持续提升' },
    { metric: '35岁以下用户', value: '65%', note: '年轻用户占主导' },
  ],
  sources: [
    { name: '艾瑞咨询', report: '2024年中国微短剧行业研究报告' },
    { name: '36氪', report: '2025微短剧最新数据' },
    { name: '广告门', report: '2024年微短剧行业白皮书' },
    { name: '中商产业研究院', report: '2025年中国短剧行业市场前景预测研究报告' },
    { name: '艾媒咨询', report: '2025-2029年中国微短剧市场研究报告' },
    { name: '前瞻产业研究院', report: '2024年中国网络短剧行业全景图谱' },
    { name: '秒针系统', report: '2025中国微短剧行业研究报告' },
    { name: 'Sensor Tower', report: '2025年短剧出海市场洞察报告' },
  ],

  startupOpportunity: {
    coreLogic: '短剧行业爆发 → 编剧需求激增 → 需要效率工具 → AI编剧工具成刚需',
    competitors: [
      {
        name: 'StoryPlay',
        features: [
          { icon: 'Lightbulb', text: '灵感策划 — AI生成多个故事设定方案' },
          { icon: 'Users', text: '人物小传 — AI生成角色档案、人物关系图谱' },
          { icon: 'FileText', text: '剧本正文 — AI辅助写作、单集润色' },
          { icon: 'BarChart3', text: '短剧拉片 — 整合播放量/热力值数据，一键拆解热门剧本' },
          { icon: 'Send', text: '剧本分发 — 剧本转视频' },
        ],
        userReview: '效果的确不错，这软件是目前AI里针对短剧体验最好的AI创作软件',
      },
      {
        name: '其他工具',
        features: [
          { icon: 'X', text: '大多数工具偏通用，不够垂直' },
          { icon: 'X', text: '缺乏对中国短剧平台规则的深度理解' },
          { icon: 'X', text: '分发环节弱' },
          { icon: 'X', text: '缺少数据分析能力' },
          { icon: 'X', text: '没有形成社区氛围' },
        ],
      },
    ],
    painPoints: {
      writers: [
        '创意枯竭、灵感匮乏',
        '剧本格式复杂、学习成本高',
        '创作效率低、周期长',
        '不了解平台喜好和爆款规律',
        '投稿渠道不透明',
      ],
      studios: [
        '编剧人才稀缺、培养周期长',
        '内容产能受限、难以规模化',
        'IP版权管理混乱',
        '数据分析能力弱',
        '多平台分发效率低',
      ],
    },
    opportunities: [
      '垂直领域专业工具',
      '深度理解平台规则（红果、九州等）',
      '一键分发至多平台',
      '数据洞察+热点分析',
      '社区氛围+投稿激励',
    ],
    recommendation: '短剧编剧工具 + 数据洞察 + 社区',
  },

  aiApplications: {
    currentUsage: '30-40%的短剧公司尝试使用AI辅助剧本',
    tools: ['GPT-4', 'Claude', '文心一言', '通义千问'],
    scenarios: ['剧情梗概', '对话生成', '爽点设计', '标题生成'],
    efficiencyImprovement: '剧本创作效率提升3-5倍',
    limitations: [
      '精品剧本仍需人工润色',
      '爆款剧本的"灵光一现"难以复制',
      'AI生成内容同质化风险',
    ],
    aigcCases: [
      { title: 'AIGC科幻短剧集', desc: '2024年出现首部AIGC科幻短剧集，AI生成画面+AI配音+AI剧本，全程无真人演员' },
      { title: '制作周期缩短80%', desc: '制作成本降低90%' },
      { title: '但品质仍与传统有差距', desc: '行业评价：目前品质仍与传统有差距' },
    ],
    digitalHuman: {
      costCompare: '数字人降低演员成本60-80%',
      applicable: [
        '知识类短剧（法律、理财、职场）',
        '动画类短剧（AI生成画面+配音）',
        '标准化小程序短剧（低成本快速）',
        '出海本地化（多语言配音）',
      ],
      notApplicable: ['情感类', '演技要求高的短剧'],
    },
    overseasLocalize: {
      status: '至少50家中国企业入局海外市场',
      key: '本土化能力成为出海成功关键',
    },
  },

  genreAnalysis: {
    mainGenres: [
      {
        name: '霸总/甜宠',
        percentage: '32%',
        elements: '豪门婚姻、先婚后爱、甜宠虐恋',
        storyline: '女主意外与霸总发生关系 → 暗恋+误解 → 最终圆满',
        reason: '满足女性对完美爱情的幻想',
        users: '18-30岁女性为主',
      },
      {
        name: '大女主/逆袭',
        percentage: '25%',
        elements: '重生复仇、扮猪吃虎、身份逆袭',
        storyline: '女主被陷害 → 重生/隐忍 → 逆袭打脸',
        reason: '"爽感"密集，情绪价值高',
        users: '25-45岁女性为主',
      },
      {
        name: '古风/穿越',
        percentage: '22%',
        elements: '宫斗、宅斗、帝王将相',
        storyline: '现代女主穿越古代 → 宫廷斗争 → 最终上位',
        reason: '代入感强，文化认同',
        users: '20-40岁女性为主',
      },
    ],
    trends: [
      '"重生复仇"题材强势崛起，2025年最大黑马',
      '都市职场题材增速明显',
      '男频题材（战神、赘婿）稳步增长',
      '悬疑/惊悚题材开始破圈',
    ],
  },

  regulations: {
    timeline: [
      { year: '2023', event: '微短剧备案制度开始实施' },
      { year: '2024', event: '内容审核标准趋严，低质内容加速出清' },
      { year: '2025', event: '精品内容获政策支持，行业进入规范化阶段' },
    ],
    redLines: [
      '严禁内容：政治敏感、暴力血腥、封建迷信',
      '禁止：恶俗情节、擦边内容',
      '限制：过度消费悲剧、放大社会焦虑',
    ],
    trend: {
      shortTerm: [
        '短剧备案制度全面实施',
        '内容审核标准趋严',
        '低质内容加速出清',
        '精品内容获政策支持',
      ],
      longTerm: [
        '行业门槛提高',
        '内容品质整体提升',
        '有利于头部公司',
        '行业进入成熟期',
      ],
    },
  },
}
