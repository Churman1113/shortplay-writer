import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Award,
  Star,
  Trophy,
  Flame,
  Clock,
  FileText,
  Target,
  Zap,
  BookOpen,
  Send,
  Users,
  TrendingUp,
  CheckCircle,
  Lock,
  ChevronRight,
  Gift,
  Crown,
  Medal
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'creation' | 'learning' | 'social' | 'milestone'
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  reward?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface SkillNode {
  id: string
  title: string
  description: string
  unlocked: boolean
  prerequisites: string[]
  icon: React.ReactNode
}

const achievements: Achievement[] = [
  {
    id: 'first_script',
    title: '初出茅庐',
    description: '完成第一部剧本',
    icon: <FileText className="w-5 h-5" />,
    category: 'creation',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: '2024-03-15',
    rarity: 'common'
  },
  {
    id: 'outline_master',
    title: '大纲大师',
    description: '完成10个剧本大纲',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'creation',
    progress: 6,
    maxProgress: 10,
    unlocked: false,
    reward: '解锁高级模板',
    rarity: 'rare'
  },
  {
    id: 'ten_episodes',
    title: '十集达成',
    description: '累计完成10集剧本',
    icon: <Target className="w-5 h-5" />,
    category: 'creation',
    progress: 45,
    maxProgress: 10,
    unlocked: true,
    unlockedAt: '2024-02-20',
    rarity: 'common'
  },
  {
    id: 'hundred_episodes',
    title: '百集达人',
    description: '累计完成100集剧本',
    icon: <Trophy className="w-5 h-5" />,
    category: 'milestone',
    progress: 45,
    maxProgress: 100,
    unlocked: false,
    reward: '获得达人称号',
    rarity: 'epic'
  },
  {
    id: 'first_submit',
    title: '勇敢迈出第一步',
    description: '首次投稿',
    icon: <Send className="w-5 h-5" />,
    category: 'creation',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: '2024-03-18',
    rarity: 'common'
  },
  {
    id: 'first_contract',
    title: '签约成功',
    description: '完成首次签约',
    icon: <Crown className="w-5 h-5" />,
    category: 'milestone',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: '解锁高级功能',
    rarity: 'legendary'
  },
  {
    id: 'week_streak',
    title: '连续创作一周',
    description: '连续7天创作剧本',
    icon: <Flame className="w-5 h-5" />,
    category: 'creation',
    progress: 7,
    maxProgress: 7,
    unlocked: true,
    unlockedAt: '2024-03-10',
    rarity: 'rare'
  },
  {
    id: 'month_streak',
    title: '坚持不懈',
    description: '连续30天创作剧本',
    icon: <Clock className="w-5 h-5" />,
    category: 'creation',
    progress: 12,
    maxProgress: 30,
    unlocked: false,
    reward: '获得坚持勋章',
    rarity: 'epic'
  },
  {
    id: 'learning_master',
    title: '学无止境',
    description: '完成所有新手课程',
    icon: <Star className="w-5 h-5" />,
    category: 'learning',
    progress: 3,
    maxProgress: 8,
    unlocked: false,
    reward: '解锁AI高级功能',
    rarity: 'rare'
  },
  {
    id: 'helpful_friend',
    title: '热心朋友',
    description: '在社区回复被点赞10次',
    icon: <Users className="w-5 h-5" />,
    category: 'social',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'trend_setter',
    title: '潮流先锋',
    description: '发布的话题参与人数超过100',
    icon: <TrendingUp className="w-5 h-5" />,
    category: 'social',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'golden_writer',
    title: '金笔奖',
    description: '剧本评分达到95分以上',
    icon: <Medal className="w-5 h-5" />,
    category: 'milestone',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: '首页推荐机会',
    rarity: 'legendary'
  }
]

const skillTree: SkillNode[] = [
  {
    id: 'basics',
    title: '编剧基础',
    description: '掌握剧本格式规范',
    unlocked: true,
    prerequisites: [],
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 'hook_design',
    title: '钩子设计',
    description: '学会设计吸引人的开篇',
    unlocked: true,
    prerequisites: ['basics'],
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'character_design',
    title: '人物塑造',
    description: '学会设计立体的人物',
    unlocked: false,
    prerequisites: ['basics'],
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'plot_structure',
    title: '剧情结构',
    description: '掌握起承转合的节奏',
    unlocked: false,
    prerequisites: ['hook_design', 'character_design'],
    icon: <Target className="w-5 h-5" />
  },
  {
    id: 'paid_point',
    title: '付费卡点',
    description: '学会设置付费卡点',
    unlocked: false,
    prerequisites: ['plot_structure'],
    icon: <Trophy className="w-5 h-5" />
  },
  {
    id: 'master',
    title: '编剧大师',
    description: '成为专业短剧编剧',
    unlocked: false,
    prerequisites: ['paid_point'],
    icon: <Crown className="w-5 h-5" />
  }
]

const userStats = {
  level: 12,
  title: '创作达人',
  totalWords: 45800,
  totalScripts: 3,
  totalEpisodes: 45,
  totalDays: 28,
  currentStreak: 7,
  longestStreak: 14
}

const levelProgress = {
  current: 3200,
  next: 4000,
  percentage: 80
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', glow: 'shadow-amber-200' }
    case 'epic': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', glow: 'shadow-purple-200' }
    case 'rare': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', glow: 'shadow-blue-200' }
    default: return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', glow: 'shadow-slate-200' }
  }
}

const getRarityLabel = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return '传说'
    case 'epic': return '史诗'
    case 'rare': return '稀有'
    default: return '普通'
  }
}

export default function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory)

  const unlockedCount = achievements.filter(a => a.unlocked).length

  const categories = [
    { id: 'all', label: '全部', count: achievements.length },
    { id: 'creation', label: '创作', count: achievements.filter(a => a.category === 'creation').length },
    { id: 'learning', label: '学习', count: achievements.filter(a => a.category === 'learning').length },
    { id: 'social', label: '社交', count: achievements.filter(a => a.category === 'social').length },
    { id: 'milestone', label: '里程碑', count: achievements.filter(a => a.category === 'milestone').length }
  ]

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* 顶部返回栏 */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回
          </Button>
        </Link>
        <div className="h-5 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A]">成就系统</h1>
      </div>

      {/* 头部 */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#134E4A]">成就系统</h2>
            <p className="text-slate-600">完成成就，解锁奖励，提升称号</p>
          </div>
        </div>
      </div>

      {/* 用户等级卡片 */}
      <Card className="mb-6 border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Award className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-[#134E4A]">Lv.{userStats.level}</h2>
                <Badge className="bg-amber-100 text-amber-700">{userStats.title}</Badge>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <Progress value={levelProgress.percentage} className="flex-1 h-2" />
                <span className="text-sm text-slate-500">{levelProgress.current}/{levelProgress.next} 经验</span>
              </div>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>创作天数: {userStats.totalDays}</span>
                <span>剧本数: {userStats.totalScripts}</span>
                <span>连续创作: {userStats.currentStreak}天</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{unlockedCount}</div>
              <div className="text-sm text-slate-500">已解锁成就</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-[#0D9488] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#134E4A]">{userStats.totalScripts}</div>
            <div className="text-sm text-slate-500">剧本数</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#134E4A]">{userStats.totalEpisodes}</div>
            <div className="text-sm text-slate-500">完成集数</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#134E4A]">{userStats.currentStreak}</div>
            <div className="text-sm text-slate-500">连续创作(天)</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#134E4A]">{unlockedCount}/{achievements.length}</div>
            <div className="text-sm text-slate-500">成就解锁</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 成就列表 */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">成就列表</CardTitle>
            </CardHeader>
            <CardContent>
              {/* 分类筛选 */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#0D9488] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>

              {/* 成就网格 */}
              <div className="grid grid-cols-2 gap-3">
                {filteredAchievements.map((achievement) => {
                  const rarity = getRarityColor(achievement.rarity)
                  const progressPercent = (achievement.progress / achievement.maxProgress) * 100

                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? `${rarity.border} ${rarity.bg}`
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          achievement.unlocked ? rarity.bg : 'bg-slate-200'
                        }`}>
                          {achievement.unlocked ? (
                            <div className={rarity.text}>{achievement.icon}</div>
                          ) : (
                            <Lock className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${
                              achievement.unlocked ? 'text-[#134E4A]' : 'text-slate-500'
                            }`}>
                              {achievement.title}
                            </h4>
                            <Badge className={`text-xs ${rarity.bg} ${rarity.text}`}>
                              {getRarityLabel(achievement.rarity)}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 mb-2">{achievement.description}</p>

                          {!achievement.unlocked && achievement.maxProgress > 1 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                                <span className="text-[#0D9488]">
                                  {Math.round(progressPercent)}%
                                </span>
                              </div>
                              <Progress value={progressPercent} className="h-1.5" />
                            </div>
                          )}

                          {achievement.unlocked && achievement.unlockedAt && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              已解锁
                            </div>
                          )}

                          {achievement.reward && !achievement.unlocked && (
                            <div className="flex items-center gap-1 text-xs text-amber-600">
                              <Gift className="w-3 h-3" />
                              {achievement.reward}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 技能树 */}
        <div>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">技能成长树</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillTree.map((skill, index) => (
                  <div key={skill.id}>
                    <div
                      className={`p-3 rounded-xl border-2 transition-all ${
                        skill.unlocked
                          ? 'border-[#0D9488] bg-[#0D9488]/5'
                          : 'border-slate-200 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          skill.unlocked ? 'bg-[#0D9488] text-white' : 'bg-slate-200 text-slate-400'
                        }`}>
                          {skill.unlocked ? skill.icon : <Lock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            skill.unlocked ? 'text-[#134E4A]' : 'text-slate-500'
                          }`}>
                            {skill.title}
                          </h4>
                          <p className="text-xs text-slate-500">{skill.description}</p>
                        </div>
                        {skill.unlocked && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                    {index < skillTree.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className={`w-0.5 h-4 ${
                          skill.unlocked && skillTree[index + 1].prerequisites.every(p =>
                            skillTree.find(s => s.id === p)?.unlocked
                          ) ? 'bg-[#0D9488]' : 'bg-slate-200'
                        }`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 奖励预告 */}
          <Card className="border-0 shadow-md mt-4 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                成就奖励预告
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
                  <Award className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">解锁高级模板</p>
                    <p className="text-xs text-slate-500">大纲完成10个后</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
                  <Zap className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">解锁AI高级功能</p>
                    <p className="text-xs text-slate-500">完成所有课程后</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
                  <Crown className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">获得专属称号</p>
                    <p className="text-xs text-slate-500">完成首次签约后</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
