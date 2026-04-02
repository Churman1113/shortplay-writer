import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  FileText,
  Clock,
  TrendingUp,
  Sparkles,
  Send,
  Shield,
  ChevronRight,
  ArrowRight,
  BarChart3,
  ClipboardList,
  TrendingDown,
  Users,
  Globe,
  X,
  BookOpen,
  HelpCircle,
  Target,
  Award,
  LogIn,
  User,
  LogOut,
  Settings
} from 'lucide-react'
import IndustryReport from '@/components/IndustryReport'
import ScriptEvaluation from '@/components/ScriptEvaluation'
import OnboardingGuide from '@/components/OnboardingGuide'
import AuthModal from '@/components/AuthModal'
import { useScripts, useUserStats } from '@/hooks/useScripts'
import { INDUSTRY_DATA, GUEST_STATS, MOCK_RECENT_SCRIPTS, GENRE_TRENDS, AI_TIPS } from '@/lib/constants'

const quickActions = [
  { icon: Plus, label: '新建剧本', href: '/editor', color: 'bg-[#F97316]' },
  { icon: ClipboardList, label: '剧本评估', href: '#', color: 'bg-[#8B5CF6]', isModal: true },
  { icon: BarChart3, label: '行业报告', href: '#', color: 'bg-[#0EA5E9]', isModal: true },
  { icon: Send, label: '投稿', href: '/submission', color: 'bg-[#14B8A6]' },
]

// 新手必读数据
const newbieGuideSteps = [
  { 
    step: 1, 
    title: '了解剧本格式', 
    icon: BookOpen, 
    desc: '掌握场景、对白、旁白格式',
    link: '/learning'
  },
  { 
    step: 2, 
    title: '创建第一部剧本', 
    icon: FileText, 
    desc: '选择题材，开始创作',
    link: '/editor'
  },
  { 
    step: 3, 
    title: '完善大纲人设', 
    icon: Target, 
    desc: '规划故事走向和角色',
    link: '/editor'
  },
  { 
    step: 4, 
    title: 'AI辅助创作', 
    icon: Sparkles, 
    desc: '优化对白，生成灵感',
    link: '/ai-assistant'
  },
]

// 新手提示数据
const newbieTips = [
  { icon: HelpCircle, label: '帮助中心', color: 'bg-[#8B5CF6]', href: '/learning', desc: '常见问题解答' },
  { icon: Target, label: '投稿指南', color: 'bg-[#F97316]', href: '/submission', desc: '投稿全流程' },
  { icon: Award, label: '成就系统', color: 'bg-[#14B8A6]', href: '/achievements', desc: '解锁更多奖励' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { scripts } = useScripts()
  const stats = useUserStats()
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // 根据登录状态选择显示的剧本
  const recentScripts = user ? scripts.slice(0, 3) : MOCK_RECENT_SCRIPTS

  // 根据登录状态选择统计数据
  const displayStats = user ? [
    { label: '创作剧本', value: String(stats.totalScripts), icon: FileText, href: '/scripts' },
    { label: '已完成', value: String(stats.completedScripts), icon: TrendingUp, href: '/scripts' },
    { label: '投稿中', value: String(stats.submittedScripts), icon: Send, href: '/submission' },
    { label: '行业规模', value: INDUSTRY_DATA.marketSize, icon: Globe, highlight: `${INDUSTRY_DATA.marketSizeYear}市场规模`, isHighlight: true },
  ] : [
    { label: '创作剧本', value: GUEST_STATS.totalScripts, icon: FileText, href: '/scripts' },
    { label: '已完成', value: GUEST_STATS.completedScripts, icon: TrendingUp, href: '/scripts' },
    { label: '投稿中', value: GUEST_STATS.submittedScripts, icon: Send, href: '/submission' },
    { label: '行业规模', value: INDUSTRY_DATA.marketSize, icon: Globe, highlight: `${INDUSTRY_DATA.marketSizeYear}市场规模`, isHighlight: true },
  ]

  const handleOpenOnboarding = () => {
    setShowOnboarding(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 主容器 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* 新手指引 */}
        <OnboardingGuide
          isNewUser={showOnboarding}
          onComplete={() => setShowOnboarding(false)}
        />

        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between">
          {/* 左侧留给 Layout 的导航栏 Logo */}
          <div></div>
          
          {/* 右侧用户区域 */}
          <div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:bg-[#0D9488]/10">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#0D9488] text-white text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-[#134E4A] font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#134E4A]">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                      {user.role === 'admin' && (
                        <span className="text-xs text-[#0D9488] font-medium mt-1">管理员</span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer text-[#0D9488]">
                          <Shield className="mr-2 h-4 w-4" />
                          管理后台
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      个人中心
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white gap-2 shadow-lg shadow-[#0D9488]/20"
              >
                <LogIn className="h-4 w-4" />
                登录 / 注册
              </Button>
            )}
          </div>
        </div>

        {/* 欢迎横幅 */}
        <div className="bg-gradient-to-r from-[#0D9488] via-[#0F766E] to-[#134E4A] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-[#0D9488]/20">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full translate-y-1/2" />
          <div className="absolute top-4 left-1/3 w-32 h-32 bg-white/5 rounded-full" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            {/* 左侧内容 */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center text-center">
                {user ? (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                      欢迎回来，{user.name}！
                    </h1>
                    <p className="text-white/80 text-sm md:text-base max-w-xl leading-tight mt-1">
                      今天是个创作的好日子，让灵感化为精彩的短剧故事
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight">
                      剧灵
                    </h1>
                    <p className="text-white/80 text-sm md:text-base max-w-xl leading-tight mt-1">
                      专业短剧编剧创作平台，助您制作爆款短剧作品
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* 右侧快捷入口 */}
            <div className="flex flex-wrap gap-3">
              {user ? (
                <>
                  <Link to="/editor">
                    <Button className="bg-white text-[#0D9488] hover:bg-white/90 gap-2 shadow-lg">
                      <Plus className="h-4 w-4" />
                      新建剧本
                    </Button>
                  </Link>
                  <Link to="/scripts">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                      <FileText className="h-4 w-4" />
                      我的剧本
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white text-[#0D9488] hover:bg-white/90 gap-2 shadow-lg h-10 px-5"
                  >
                    <LogIn className="h-4 w-4" />
                    立即开始
                  </Button>
                  <Link to="/learning">
                    <Button className="bg-[#F8FAFC] text-[#0D9488] hover:bg-white font-bold shadow-lg gap-2 h-10 px-5">
                      <BookOpen className="h-4 w-4" />
                      新手指南
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 快捷操作区 */}
        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#134E4A]">快捷操作</h2>
            <span className="text-xs text-slate-400">点击开始使用</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {/* 新建剧本 */}
            <Link to="/editor" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">新建剧本</span>
              </div>
            </Link>
            
            {/* 剧本评估 */}
            <div onClick={() => setShowEvaluation(true)} className="group cursor-pointer">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">剧本评估</span>
              </div>
            </div>
            
            {/* 行业报告 */}
            <div onClick={() => setShowReport(true)} className="group cursor-pointer">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">行业报告</span>
              </div>
            </div>
            
            {/* 投稿 */}
            <Link to="/submission" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Send className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">投稿</span>
              </div>
            </Link>
            
            {/* AI辅助 */}
            <Link to="/ai-assistant" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">AI辅助</span>
              </div>
            </Link>
            
            {/* 版权保护 */}
            <Link to="/copyright" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#134E4A] to-[#042f2e] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">版权保护</span>
              </div>
            </Link>
            
            {/* 帮助中心 */}
            <Link to="/learning" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">帮助中心</span>
              </div>
            </Link>
            
            {/* 成就系统 */}
            <Link to="/achievements" className="group">
              <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#DB2777] text-white transition-all hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">成就系统</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 新手指南 + 数据统计 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 新手创作指南 */}
          <Card 
            className="border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
            onClick={handleOpenOnboarding}
          >
            <div className="bg-gradient-to-br from-[#0D9488] to-[#134E4A] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">新手创作指南</h3>
                  <p className="text-white/70 text-sm">完成6步，快速成为短剧编剧</p>
                </div>
              </div>
            </div>
            <CardContent className="p-5 bg-white">
              <div className="grid grid-cols-2 gap-3">
                {newbieGuideSteps.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-[#0D9488]/5 transition-colors">
                      <div className="w-8 h-8 bg-[#0D9488] rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#134E4A] truncate">{item.title}</p>
                        <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-center text-[#0D9488] font-medium">
                <span className="text-sm">点击查看完整指南</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </CardContent>
          </Card>

          {/* 剧本统计 */}
          <Link to="/scripts" className="lg:col-span-2 group">
            <Card className="border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all h-full overflow-hidden">
              <div className="bg-gradient-to-br from-[#0D9488] to-[#134E4A] p-5 text-white h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">剧本管理</h3>
                      <p className="text-white/70 text-sm">管理您的所有剧本作品</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/60 group-hover:translate-x-2 transition-transform" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {displayStats.slice(0, 3).map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors">
                        <Icon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* 行业数据 + 最近创作 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 行业数据 */}
          <div onClick={() => setShowReport(true)} className="cursor-pointer group">
            <Card className="border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all h-full overflow-hidden">
              <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-5 text-white h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-white/80" />
                    <span className="text-white/80 text-sm">2025市场规模</span>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <p className="text-4xl font-bold">{INDUSTRY_DATA.marketSize}元</p>
                <p className="text-white/70 text-sm mt-1">同比增长 {INDUSTRY_DATA.marketGrowth}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">用户规模</span>
                    <span className="font-bold">{INDUSTRY_DATA.userScale}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">出海收入</span>
                    <span className="font-bold">{INDUSTRY_DATA.overseasRevenue}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">内容出海</span>
                    <span className="font-bold">{INDUSTRY_DATA.overseasGrowth}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-center text-white text-sm group-hover:gap-2 transition-all">
                  <span>查看完整报告</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          </div>

          {/* 最近创作 */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl shadow-slate-200/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                <div>
                  <CardTitle className="text-[#134E4A] text-lg">最近创作</CardTitle>
                  <CardDescription className="text-[#134E4A]/60">继续您的短剧创作</CardDescription>
                </div>
                <Link to="/editor">
                  <Button variant="ghost" size="sm" className="text-[#0D9488] hover:bg-[#0D9488]/10">
                    查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {recentScripts.map((script) => (
                    <Link key={script.id} to={`/editor/${script.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#0D9488]/5 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0D9488]/10 to-[#0D9488]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <FileText className="h-6 w-6 text-[#0D9488]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-[#134E4A] group-hover:text-[#0D9488] transition-colors truncate">
                              {script.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge variant="secondary" className="text-xs bg-[#0D9488]/10 text-[#0D9488] border-0">
                                {script.genre}
                              </Badge>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {script.lastEdited}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <Badge 
                            className={`text-xs ${
                              script.status === 'completed' ? 'bg-green-100 text-green-700 border-0' :
                              script.status === 'submitted' ? 'bg-blue-100 text-blue-700 border-0' :
                              'bg-amber-100 text-amber-700 border-0'
                            }`}
                          >
                            {script.status === 'completed' ? '已完成' :
                             script.status === 'submitted' ? '已投稿' : '创作中'}
                          </Badge>
                          <p className="text-xs text-slate-400 mt-1">
                            {script.completedEpisodes}/{script.episodes}集
                          </p>
                          <Progress 
                            value={(script.completedEpisodes / script.episodes) * 100} 
                            className="w-20 h-1.5 mt-2 bg-slate-100"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI建议 + 热门题材 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI创作建议 */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-[#F97316]" />
                AI创作建议
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {AI_TIPS.map((tip, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-[#F97316]/5 to-transparent border-l-2" style={{ borderLeftColor: tip.color }}>
                    <p className="text-sm text-[#134E4A]">{tip.text}</p>
                  </div>
                ))}
              </div>
              <Link to="/ai-assistant">
                <Button className="w-full mt-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm">
                  获取更多建议
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 热门题材 */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] text-sm">热门题材趋势</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                {GENRE_TRENDS.map((genre, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#134E4A]">{genre.name}</span>
                      <div className="flex items-center gap-1">
                        {genre.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : genre.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <span className="w-4 h-4 text-center text-slate-400">-</span>
                        )}
                        <span className="text-sm font-bold text-[#134E4A]">{genre.percent}%</span>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${genre.color} transition-all`}
                        style={{ width: `${genre.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowReport(true)}
                className="w-full mt-4 text-sm text-[#0D9488] hover:text-[#0F766E] flex items-center justify-center gap-1"
              >
                查看详细分析
                <ArrowRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>

          {/* 行业洞察 */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-[#8B5CF6]" />
                行业洞察
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#0D9488]/5 rounded-xl">
                  <p className="text-3xl font-bold text-[#0D9488]">{INDUSTRY_DATA.marketSize}</p>
                  <p className="text-xs text-slate-500 mt-1">{INDUSTRY_DATA.marketSizeYear}年市场规模</p>
                </div>
                <div className="text-center p-4 bg-[#F97316]/5 rounded-xl">
                  <p className="text-3xl font-bold text-[#F97316]">{INDUSTRY_DATA.userScale}</p>
                  <p className="text-xs text-slate-500 mt-1">用户规模</p>
                </div>
                <div className="text-center p-4 bg-[#8B5CF6]/5 rounded-xl">
                  <p className="text-3xl font-bold text-[#8B5CF6]">{INDUSTRY_DATA.marketGrowth}</p>
                  <p className="text-xs text-slate-500 mt-1">年增长率</p>
                </div>
              </div>
              <button
                onClick={() => setShowReport(true)}
                className="w-full mt-4 text-sm text-[#0D9488] hover:text-[#0F766E] flex items-center justify-center gap-1"
              >
                查看完整报告
                <ArrowRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* 底部版权 */}
        <div className="text-center py-6 text-sm text-slate-400">
          <p>© 2025 剧灵 · 短剧编剧创作平台 · 让创作更简单</p>
        </div>
      </div>

      {/* 剧本评估弹窗 */}
      {showEvaluation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold text-[#134E4A]">剧本评估</h2>
              <button
                onClick={() => setShowEvaluation(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <ScriptEvaluation />
            </div>
          </div>
        </div>
      )}

      {/* 行业报告弹窗 */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold text-[#134E4A]">2025-2026中国短剧行业研究报告</h2>
              <button
                onClick={() => setShowReport(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <IndustryReport />
            </div>
          </div>
        </div>
      )}

      {/* 登录/注册弹窗 */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
