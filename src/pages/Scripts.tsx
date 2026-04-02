import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft, FileText, Clock, Send, CheckCircle2, PlayCircle,
  MoreVertical, Star, Plus, Search, Trash2, Pencil, Eye, Sparkles
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useScripts } from '@/hooks/useScripts'
import AIEpisodeSplitter from '@/components/AIEpisodeSplitter'

export default function ScriptsPage() {
  const { user } = useAuth()
  const { scripts, deleteScript, saveScript } = useScripts()
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAIPanel, setShowAIPanel] = useState(false)

  // 虚拟剧本数据（游客可见）
  const mockScripts = [
    { id: 'mock-1', title: '霸道总裁的小娇妻', genre: '甜宠', episodes: 80, completedEpisodes: 45, lastEdited: '2小时前', status: 'draft' as const, quality: 82 },
    { id: 'mock-2', title: '重生之我是王妃', genre: '古装', episodes: 100, completedEpisodes: 100, lastEdited: '1天前', status: 'completed' as const, quality: 88 },
    { id: 'mock-3', title: '都市神医', genre: '都市', episodes: 60, completedEpisodes: 60, lastEdited: '3天前', status: 'submitted' as const, quality: 76 },
    { id: 'mock-4', title: '萌宝来袭', genre: '家庭', episodes: 40, completedEpisodes: 30, lastEdited: '5小时前', status: 'draft' as const, quality: 79 },
    { id: 'mock-5', title: '契约恋人', genre: '都市', episodes: 80, completedEpisodes: 80, lastEdited: '1周前', status: 'completed' as const, quality: 85 },
    { id: 'mock-6', title: '豪门惊梦', genre: '悬疑', episodes: 70, completedEpisodes: 70, lastEdited: '2天前', status: 'submitted' as const, quality: 81 },
  ]

  // 根据登录状态选择数据源
  const displayScripts = user ? scripts : mockScripts

  // 过滤剧本
  const filteredScripts = displayScripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.genre.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false
    if (tab === 'all') return true
    if (tab === 'draft') return script.status === 'draft'
    if (tab === 'completed') return script.status === 'completed'
    if (tab === 'submitted') return script.status === 'submitted'
    return true
  })

  const stats = {
    total: displayScripts.length,
    draft: displayScripts.filter(s => s.status === 'draft').length,
    completed: displayScripts.filter(s => s.status === 'completed').length,
    submitted: displayScripts.filter(s => s.status === 'submitted').length,
    totalEpisodes: displayScripts.reduce((sum, s) => sum + s.completedEpisodes, 0),
  }

  const statusMap: Record<string, { label: string; className: string; icon: any }> = {
    draft: { label: '创作中', className: 'bg-yellow-100 text-yellow-700', icon: PlayCircle },
    completed: { label: '已完成', className: 'bg-green-100 text-green-700', icon: CheckCircle2 },
    submitted: { label: '已投稿', className: 'bg-blue-100 text-blue-700', icon: Send },
  }

  const handleDelete = (e: React.MouseEvent, scriptId: string) => {
    e.stopPropagation()
    if (window.confirm('确定要删除这个剧本吗？')) {
      deleteScript(scriptId)
    }
  }

  const handleEpisodesGenerated = (episodes: any[], scriptTitle: string) => {
    // 保存分集结果
    const newScript = {
      id: `script_${Date.now()}`,
      title: scriptTitle,
      genre: '待定',
      episodes: episodes.length,
      completedEpisodes: episodes.filter(e => e.content).length,
      lastEdited: new Date().toLocaleString('zh-CN'),
      status: 'draft' as const,
      synopsis: `共${episodes.length}集，由AI自动分集生成`
    }
    saveScript(newScript)
    setShowAIPanel(false)
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* AI分集面板 */}
      {showAIPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-xl font-bold text-[#134E4A]">AI智能分集</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIPanel(false)}
                className="text-slate-500"
              >
                关闭
              </Button>
            </div>
            <div className="p-6">
              <AIEpisodeSplitter onEpisodesGenerated={handleEpisodesGenerated} />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
        </Link>
        <div className="h-6 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A]">剧本管理</h1>
        <div className="flex-1" />
        <Button
          onClick={() => setShowAIPanel(true)}
          className="bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:opacity-90 text-white"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI分集
        </Button>
        <Link to="/editor">
          <Button className="bg-[#0D9488] hover:bg-[#0F766E] text-white">
            <Plus className="h-4 w-4 mr-2" />
            新建剧本
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="border-0 shadow-sm bg-[#0D9488]/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#0D9488]">{stats.total}</div>
            <div className="text-xs text-slate-500">全部剧本</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-yellow-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
            <div className="text-xs text-slate-500">创作中</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-slate-500">已完成</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
            <div className="text-xs text-slate-500">投稿中/已投稿</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalEpisodes}</div>
            <div className="text-xs text-slate-500">累计完成集数</div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索栏 */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="搜索剧本标题或题材..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#0D9488]/20 focus:border-[#0D9488]"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="all">全部 ({stats.total})</TabsTrigger>
          <TabsTrigger value="draft">创作中 ({stats.draft})</TabsTrigger>
          <TabsTrigger value="completed">已完成 ({stats.completed})</TabsTrigger>
          <TabsTrigger value="submitted">投稿 ({stats.submitted})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredScripts.map((script) => {
                  const StatusIcon = statusMap[script.status].icon
                  return (
                    <div
                      key={script.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/editor/${script.id}`)}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-[#0D9488]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-[#134E4A] group-hover:text-[#0D9488] truncate">
                              {script.title}
                            </h3>
                            {'quality' in script && script.quality && script.quality >= 85 && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs bg-[#0D9488]/10 text-[#0D9488]">
                              {script.genre}
                            </Badge>
                            <span className="text-xs text-slate-400">{script.lastEdited}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm text-slate-600">
                            {script.completedEpisodes}/{script.episodes}集
                          </div>
                          <Progress
                            value={(script.completedEpisodes / script.episodes) * 100}
                            className="w-20 h-1.5 mt-1"
                          />
                        </div>
                        <Badge className={`${statusMap[script.status].className} text-xs`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusMap[script.status].label}
                        </Badge>
                        {'quality' in script && script.quality && (
                          <div className="text-sm font-medium text-slate-400 w-10 text-right">
                            {script.quality}分
                          </div>
                        )}
                        {user && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/editor/${script.id}`)
                              }}
                              className="text-slate-500"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDelete(e, script.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {filteredScripts.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{searchQuery ? '没有找到匹配的剧本' : '暂无剧本'}</p>
          <Link to="/editor">
            <Button className="mt-4 bg-[#0D9488]">
              <Plus className="h-4 w-4 mr-2" />
              新建剧本
            </Button>
          </Link>
        </div>
      )}

      {/* 游客提示 */}
      {!user && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#0D9488]/5 to-[#134E4A]/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-[#0D9488]" />
              <div>
                <p className="font-medium text-[#134E4A]">登录后解锁完整功能</p>
                <p className="text-sm text-slate-500">创建账号，管理您的剧本作品</p>
              </div>
            </div>
            <Link to="/login">
              <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white">
                立即登录
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
