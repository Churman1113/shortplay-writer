/**
 * 投稿平台与模拟剧本数据
 * 从 Submission.tsx 抽离，保持组件精简
 */

export interface Platform {
  id: string;
  name: string;
  logo: string;
  requirements: string;
  responseTime: string;
  status: 'open' | 'closed' | 'limited';
  categories: string[];
  priceRange: string;
  preferredGenres: string[];
  url: string;
  submissionEmail?: string;
  policy?: string;
  submissionFormat?: string;
  minEpisodes?: number;
  maxEpisodes?: number;
  acceptedTypes?: string[];
  notes?: string[];
}

export const platforms: Platform[] = [
  {
    id: '1',
    name: '九州文化',
    logo: 'JZ',
    requirements: '前3-5集正文+大纲+人物小传',
    responseTime: '2个工作日',
    status: 'open',
    categories: ['男频', '女频'],
    priceRange: '2万保底+1%分成',
    preferredGenres: ['战神', '赘婿', '神医', '豪门总裁', '甜宠', '虐恋'],
    url: 'https://www.jxjzwh.cn',
    submissionEmail: 'lichenyang@jxjzwh.cn',
    policy: '男女频题材不限，保底2万起+1%分成，爆款可申请提高保底',
    submissionFormat: '剧本名+前3-5集正文+大纲+人物小传+付费卡点设计',
    minEpisodes: 3,
    maxEpisodes: 100,
    acceptedTypes: ['原创', 'IP改编', '爆款短剧二创'],
    notes: ['需注明创意来源', '建议附上第一卡点前每集细纲', '可加QQ:389743650催询'],
  },
  {
    id: '2',
    name: '点众科技',
    logo: 'DZ',
    requirements: '大纲+人设+前10集+付费卡点',
    responseTime: '3个工作日',
    status: 'open',
    categories: ['女频', '男频'],
    priceRange: '保底+分成',
    preferredGenres: ['甜宠', '虐恋', '战神', '赘婿', '逆袭', '世情', '悬疑'],
    url: 'https://dznovel.ssread.cn',
    submissionEmail: 'contribute@dianzhongtech.com',
    policy: '原创和IP改编都收，女频头部平台，需符合"黄金三集"节奏',
    submissionFormat: '大纲+人物设定+前10集剧本正文+付费卡点设计',
    minEpisodes: 10,
    maxEpisodes: 80,
    acceptedTypes: ['原创', 'IP改编'],
    notes: ['素人可投稿', '需设计付费卡点', '接受抖音/七猫等IP改编'],
  },
  {
    id: '3',
    name: '麦芽传媒',
    logo: 'MY',
    requirements: '大纲+人物小传+正文',
    responseTime: '3个工作日',
    status: 'open',
    categories: ['女频', '男频'],
    priceRange: '保底+分成',
    preferredGenres: ['现代', '古装', '甜宠', '虐恋', '逆袭', '战神', '神豪'],
    url: 'https://www.maiyawx.com',
    submissionEmail: 'maiya@maiyawx.com',
    policy: '现代优先，男女频不限，40-80集，精品化内容导向',
    submissionFormat: '剧本名+大纲+人物介绍+正文（建议标准剧本格式）',
    minEpisodes: 40,
    maxEpisodes: 80,
    acceptedTypes: ['原创', '改编'],
    notes: ['现代题材优先', '不收校园/灵异/恐怖/政治题材', '前三集必须有强冲突和悬念'],
  },
  {
    id: '4',
    name: '红果短剧',
    logo: 'HG',
    requirements: '30集初稿+完整大纲',
    responseTime: '1-3个工作日',
    status: 'open',
    categories: ['男频', '女频'],
    priceRange: '最高200万保底+40%分成',
    preferredGenres: ['民国悬疑', '非遗传承', '甜宠', '逆袭', '都市', '仿真人剧'],
    url: 'https://dramaland.com',
    submissionEmail: 'hongguojingpin@bytedance.com',
    policy: '个人直投无门槛，爆款剧本最高200万保底，需实名认证',
    submissionFormat: '剧本+故事大纲+版权证明（可信时间戳认证）',
    minEpisodes: 30,
    maxEpisodes: 100,
    acceptedTypes: ['原创', '授权改编'],
    notes: ['首次投稿需满30集', '完稿不少于80集', '禁止一稿多投', '单集600-800字'],
  },
  {
    id: '5',
    name: '映宇宙',
    logo: 'YZ',
    requirements: '大纲+人物小传+正文',
    responseTime: '5个工作日',
    status: 'open',
    categories: ['甜宠', '逆袭', '古装', '非遗'],
    priceRange: '保底+分成',
    preferredGenres: ['甜宠', '都市情感', '非遗传承', '历史文化'],
    url: 'http://www.inkeverse.com',
    submissionEmail: 'drama@inkeverse.com',
    policy: '小程序短剧头部平台，国内外全覆盖，注重内容创新',
    submissionFormat: '剧本大纲+人物小传+正文',
    minEpisodes: 10,
    maxEpisodes: 80,
    acceptedTypes: ['原创', 'IP改编'],
    notes: ['起步较早的国内小程序短剧平台', '支持海外市场拓展', '注重内容创新'],
  },
  {
    id: '6',
    name: '天桥短剧',
    logo: 'TQ',
    requirements: '大纲+人物小传+正文',
    responseTime: '7个工作日',
    status: 'open',
    categories: ['战神', '赘婿', '神医'],
    priceRange: '3-10万保底',
    preferredGenres: ['战神', '神医', '赘婿', '都市', '玄幻'],
    url: 'http://zztianqiao.com',
    submissionEmail: 'drama@zztianqiao.com',
    policy: '自有编剧100+与200+签约编剧，题材多样化，主编制度确保质量',
    submissionFormat: '完整大纲+人物小传+剧本正文',
    minEpisodes: 10,
    maxEpisodes: 100,
    acceptedTypes: ['原创'],
    notes: ['河南省TOP1短剧平台', '行业TOP5', '合作共赢理念', '支持商务洽谈'],
  },
]

export const mockScript = {
  title: '《豪门千金归来》',
  genre: '都市重生',
  targetAudience: '18-35岁女性',
  totalEpisodes: 80,
  completedEpisodes: 25,
  synopsis: '女主前世被陷害致死，重生后手撕渣男绿茶，逆袭成为商业女强人',
  characters: [
    { name: '林若雪', role: '女主', description: '聪明果敢，重生后复仇心切但不失善良', age: '25' },
    { name: '顾景琛', role: '男主', description: '霸道总裁，外冷内热，暗中守护女主', age: '28' },
    { name: '苏婉儿', role: '女配', description: '心机绿茶，表里不一，是女主前世的闺蜜', age: '24' },
  ],
}
