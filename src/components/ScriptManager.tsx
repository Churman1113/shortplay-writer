import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  FileText, 
  Search, 
  Filter, 
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Eye,
  ChevronRight,
  Scissors,
  X,
  Sparkles
} from 'lucide-react'
import { useScripts, type Script } from '@/hooks/useScripts'
import { useAuth } from '@/contexts/AuthContext'
import AIEpisodeSplitter from '@/components/AIEpisodeSplitter'

export default function ScriptManager() {
  const { user } = useAuth()
  const { scripts, deleteScript } = useScripts()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)

  // 过滤剧本
  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || script.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 统计
  const totalScripts = scripts.length
  const completedScripts = scripts.filter(s => s.status === 'completed').length
  const draftScripts = scripts.filter(s => s.status === 'draft').length
  const submittedScripts = scripts.filter(s => s.status === 'submitted').length

  const handleDelete = (script: Script) => {
    if (window.confirm(`确定要删除剧本"${script.title}"吗？`)) {
      deleteScript(script.id)
    }
  }

  const openInEditor = (script: Script) => {
    setSelectedScript(script)
    // 可以在此打开编辑器
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* 顶部区域 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#134E4A]">剧本管理</h1>
          <p className="text-slate-500 text-sm mt-1">
            {user ? '管理您的短剧剧本作品' : '浏览示例剧本，了解平台功能'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowAIPanel(!showAIPanel)}
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
      </div>

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
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <AIEpisodeSplitter />
            </div>
          </div>
        </div>
      )}

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#0D9488]" />
              </div>
              <div>
                <p className="text-sm text-slate-500">总剧本数</p>
                <p className="text-2xl font-bold text-[#134E4A]">{totalScripts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">创作中</p>
                <p className="text-2xl font-bold text-[#134E4A]">{draftScripts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">已完成</p>
                <p className="text-2xl font-bold text-[#134E4A]">{completedScripts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">已投稿</p>
                <p className="text-2xl font-bold text-[#134E4A]">{submittedScripts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="搜索剧本标题或题材..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#0D9488]/20 focus:border-[#0D9488]"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'draft', 'completed', 'submitted'].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? 'bg-[#0D9488] hover:bg-[#0F766E]' : ''}
                >
                  {status === 'all' ? '全部' : 
                   status === 'draft' ? '创作中' :
                   status === 'completed' ? '已完成' : '已投稿'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 剧本列表 */}
      {filteredScripts.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              {searchQuery ? '没有找到匹配的剧本' : '暂无剧本'}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchQuery ? '尝试其他关键词搜索' : '开始创作您的第一部短剧剧本吧'}
            </p>
            {!searchQuery && (
              <Link to="/editor">
                <Button className="bg-[#0D9488] hover:bg-[#0F766E] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  新建剧本
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredScripts.map(script => (
            <Card key={script.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-[#0D9488]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#134E4A] truncate">{script.title}</h3>
                          <Badge className={
                            script.status === 'completed' ? 'bg-green-100 text-green-700' :
                            script.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }>
                            {script.status === 'completed' ? '已完成' :
                             script.status === 'submitted' ? '已投稿' : '创作中'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-1 mb-2">
                          {script.synopsis || '暂无简介'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>{script.genre}</span>
                          <span>{script.completedEpisodes}/{script.episodes}集</span>
                          <span>最后编辑: {script.lastEdited}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link to={`/editor/${script.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#0D9488]">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-slate-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(script)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress 
                        value={(script.completedEpisodes / script.episodes) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-slate-400 mt-1">
                        完成度: {Math.round((script.completedEpisodes / script.episodes) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 游客提示 */}
      {!user && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#0D9488]/5 to-[#134E4A]/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#0D9488]" />
              </div>
              <div>
                <p className="font-medium text-[#134E4A]">登录后解锁完整功能</p>
                <p className="text-sm text-slate-500">创建账号，开始管理您的剧本作品</p>
              </div>
            </div>
            <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white">
              立即登录
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
