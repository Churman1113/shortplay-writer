/**
 * 应用常量配置
 * 集中管理硬编码数据，便于维护和更新
 */

// 行业数据配置
export const INDUSTRY_DATA = {
  // 市场规模
  marketSize: '683亿',
  marketSizeUnit: '元',
  marketSizeYear: 2025,
  marketGrowth: '+35.2%',

  // 用户规模
  userScale: '7.2亿',

  // 出海收入
  overseasRevenue: '40亿美元',

  // 内容出海增长
  overseasGrowth: '+162%',
}

// 热门题材趋势配置
export const GENRE_TRENDS = [
  { name: '甜宠', percent: 92, trend: 'up' as const, color: 'from-pink-400 to-pink-500' },
  { name: '战神/赘婿', percent: 88, trend: 'stable' as const, color: 'from-blue-400 to-blue-500' },
  { name: '重生复仇', percent: 95, trend: 'up' as const, color: 'from-purple-400 to-purple-500' },
  { name: '虐恋', percent: 72, trend: 'down' as const, color: 'from-slate-400 to-slate-500' },
]

// 游客默认统计数据
export const GUEST_STATS = {
  totalScripts: '12',
  completedScripts: '8',
  submittedScripts: '3',
}

// 虚拟剧本数据（游客可见）
export const MOCK_RECENT_SCRIPTS = [
  { id: 'mock-1', title: '霸道总裁的小娇妻', genre: '甜宠', episodes: 80, completedEpisodes: 45, lastEdited: '2小时前', status: 'draft' as const },
  { id: 'mock-2', title: '重生之我是王妃', genre: '古装', episodes: 100, completedEpisodes: 100, lastEdited: '1天前', status: 'completed' as const },
  { id: 'mock-3', title: '都市神医', genre: '都市', episodes: 60, completedEpisodes: 60, lastEdited: '3天前', status: 'submitted' as const },
]

// AI 创作建议
export const AI_TIPS = [
  { text: '近期"重生复仇"题材热度上升，建议关注', color: '#F97316' },
  { text: '《霸道总裁》第8集付费卡点可以加强', color: '#0D9488' },
  { text: '本周最佳投稿时间：周三、周五', color: '#14B8A6' },
]
