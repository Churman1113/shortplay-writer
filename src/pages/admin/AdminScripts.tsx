import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Search,
  FileText,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  User,
  Calendar,
  Tag,
  BookOpen,
} from 'lucide-react'

interface Script {
  id: number
  title: string
  author: string
  authorId: number
  genre: string
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'published'
  episodes: number
  words: number
  createdAt: string
  updatedAt: string
  rating: number
  views: number
}

const genreOptions = ['全部类型', '甜宠', '战神', '赘婿', '重生复仇', '虐恋', '都市', '悬疑']

export default function AdminScripts() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('全部类型')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedScripts, setSelectedScripts] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const mockScripts: Script[] = [
      { id: 1, title: '霸道总裁爱上我', author: '张三', authorId: 1, genre: '甜宠', status: 'published', episodes: 80, words: 120000, createdAt: '2025-12-01', updatedAt: '2026-03-15', rating: 4.8, views: 12500 },
      { id: 2, title: '重生之我是首富', author: '李四', authorId: 2, genre: '重生复仇', status: 'approved', episodes: 100, words: 150000, createdAt: '2026-01-10', updatedAt: '2026-03-20', rating: 4.6, views: 8900 },
      { id: 3, title: '都市修仙传', author: '王五', authorId: 3, genre: '都市', status: 'pending', episodes: 60, words: 90000, createdAt: '2026-03-20', updatedAt: '2026-03-25', rating: 0, views: 0 },
      { id: 4, title: '甜蜜暴击2', author: '赵六', authorId: 4, genre: '甜宠', status: 'rejected', episodes: 45, words: 67500, createdAt: '2026-02-15', updatedAt: '2026-03-10', rating: 0, views: 0 },
      { id: 5, title: '战神归来做奶爸', author: '孙八', authorId: 6, genre: '战神', status: 'published', episodes: 90, words: 135000, createdAt: '2025-11-20', updatedAt: '2026-02-28', rating: 4.9, views: 15600 },
      { id: 6, title: '隐婚三年后', author: '周九', authorId: 7, genre: '虐恋', status: 'pending', episodes: 70, words: 105000, createdAt: '2026-03-22', updatedAt: '2026-03-28', rating: 0, views: 0 },
      { id: 7, title: '赘婿当道', author: '吴十', authorId: 8, genre: '赘婿', status: 'draft', episodes: 30, words: 45000, createdAt: '2026-03-28', updatedAt: '2026-03-30', rating: 0, views: 0 },
      { id: 8, title: '萌宝来袭', author: '郑十一', authorId: 9, genre: '甜宠', status: 'pending', episodes: 50, words: 75000, createdAt: '2026-03-25', updatedAt: '2026-03-29', rating: 0, views: 0 },
      { id: 9, title: '天价前妻', author: '冯十二', authorId: 10, genre: '虐恋', status: 'approved', episodes: 85, words: 127500, createdAt: '2026-01-05', updatedAt: '2026-03-18', rating: 4.5, views: 7800 },
      { id: 10, title: '我的七个姐姐', author: '张三', authorId: 1, genre: '都市', status: 'published', episodes: 75, words: 112500, createdAt: '2025-10-15', updatedAt: '2026-01-20', rating: 4.7, views: 11200 },
    ]
    setTimeout(() => {
      setScripts(mockScripts)
      setLoading(false)
    }, 500)
  }, [])

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          script.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = genreFilter === '全部类型' || script.genre === genreFilter
    const matchesStatus = statusFilter === 'all' || script.status === statusFilter
    return matchesSearch && matchesGenre && matchesStatus
  })

  const totalPages = Math.ceil(filteredScripts.length / itemsPerPage)
  const paginatedScripts = filteredScripts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSelectAll = () => {
    if (selectedScripts.length === paginatedScripts.length) {
      setSelectedScripts([])
    } else {
      setSelectedScripts(paginatedScripts.map(s => s.id))
    }
  }

  const handleSelectScript = (id: number) => {
    setSelectedScripts(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    )
  }

  const handleViewScript = (script: Script) => {
    setSelectedScript(script)
    setShowDetailModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"><Edit className="h-3 w-3" />草稿</span>
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700"><Clock className="h-3 w-3" />待审核</span>
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><CheckCircle className="h-3 w-3" />已通过</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="h-3 w-3" />已拒绝</span>
      case 'published':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><Send className="h-3 w-3" />已发布</span>
      default:
        return null
    }
  }

  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      '甜宠': 'bg-pink-100 text-pink-700',
      '战神': 'bg-red-100 text-red-700',
      '赘婿': 'bg-purple-100 text-purple-700',
      '重生复仇': 'bg-orange-100 text-orange-700',
      '虐恋': 'bg-gray-100 text-gray-700',
      '都市': 'bg-blue-100 text-blue-700',
      '悬疑': 'bg-indigo-100 text-indigo-700',
    }
    return colors[genre] || 'bg-slate-100 text-slate-700'
  }

  const stats = {
    total: scripts.length,
    draft: scripts.filter(s => s.status === 'draft').length,
    pending: scripts.filter(s => s.status === 'pending').length,
    approved: scripts.filter(s => s.status === 'approved').length,
    published: scripts.filter(s => s.status === 'published').length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-sm text-slate-500">剧本总数</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <Edit className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-600">{stats.draft}</p>
                <p className="text-sm text-slate-500">草稿</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-sm text-slate-500">待审核</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
                <p className="text-sm text-slate-500">已通过</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                <p className="text-sm text-slate-500">已发布</p>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索剧本名称或作者..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              {genreOptions.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="all">全部状态</option>
              <option value="draft">草稿</option>
              <option value="pending">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
              <option value="published">已发布</option>
            </select>

            {selectedScripts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">已选择 {selectedScripts.length} 项</span>
                <button className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  批量通过
                </button>
                <button className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  批量删除
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 剧本列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedScripts.length === paginatedScripts.length && paginatedScripts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">剧本信息</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">类型</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">状态</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">集数/字数</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">数据</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">更新时间</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : paginatedScripts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-500">
                      未找到匹配的剧本
                    </td>
                  </tr>
                ) : (
                  paginatedScripts.map((script) => (
                    <tr key={script.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedScripts.includes(script.id)}
                          onChange={() => handleSelectScript(script.id)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-slate-800 hover:text-teal-600 cursor-pointer" onClick={() => handleViewScript(script)}>
                            {script.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            <User className="h-3 w-3" />
                            <span>{script.author}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(script.genre)}`}>
                          {script.genre}
                        </span>
                      </td>
                      <td className="px-5 py-4">{getStatusBadge(script.status)}</td>
                      <td className="px-5 py-4">
                        <div className="text-sm">
                          <p className="text-slate-800">{script.episodes}集</p>
                          <p className="text-slate-500">{(script.words / 10000).toFixed(1)}万字</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="text-slate-800">{script.rating > 0 ? script.rating.toFixed(1) : '-'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-800">{script.views > 0 ? script.views.toLocaleString() : '-'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{script.updatedAt}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewScript(script)}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="查看详情"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {script.status === 'pending' && (
                            <>
                              <button
                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="审核通过"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="拒绝"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredScripts.length)} 条，共 {filteredScripts.length} 条
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-teal-500 text-white'
                        : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 剧本详情弹窗 */}
      {showDetailModal && selectedScript && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-semibold text-lg text-slate-800">剧本详情</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGenreColor(selectedScript.genre)}`}>
                    {selectedScript.genre}
                  </span>
                  {getStatusBadge(selectedScript.status)}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedScript.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <User className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">作者</p>
                    <p className="text-sm font-medium text-slate-800">{selectedScript.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">更新时间</p>
                    <p className="text-sm font-medium text-slate-800">{selectedScript.updatedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">集数</p>
                    <p className="text-sm font-medium text-slate-800">{selectedScript.episodes}集</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Tag className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">字数</p>
                    <p className="text-sm font-medium text-slate-800">{(selectedScript.words / 10000).toFixed(1)}万字</p>
                  </div>
                </div>
              </div>

              {selectedScript.status === 'published' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Star className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-xs text-amber-600">评分</p>
                      <p className="text-lg font-bold text-amber-700">{selectedScript.rating.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-blue-600">浏览量</p>
                      <p className="text-lg font-bold text-blue-700">{selectedScript.views.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                查看内容
              </button>
              <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                编辑剧本
              </button>
              {selectedScript.status === 'pending' && (
                <>
                  <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    审核通过
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    拒绝
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
