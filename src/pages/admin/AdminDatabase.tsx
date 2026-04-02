import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Database,
  Table,
  HardDrive,
  Server,
  Activity,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Search,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react'

interface TableInfo {
  name: string
  records: number
  size: string
  lastUpdate: string
}

interface QueryResult {
  columns: string[]
  rows: any[][]
}

export default function AdminDatabase() {
  const [activeTab, setActiveTab] = useState<'tables' | 'query'>('tables')
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [sqlQuery, setSqlQuery] = useState('')
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [copied, setCopied] = useState(false)

  const tables: TableInfo[] = [
    { name: 'users', records: 156, size: '2.3 MB', lastUpdate: '2026-04-01 14:30' },
    { name: 'scripts', records: 423, size: '15.8 MB', lastUpdate: '2026-04-01 14:25' },
    { name: 'sessions', records: 89, size: '0.5 MB', lastUpdate: '2026-04-01 14:00' },
    { name: 'logs', records: 15234, size: '45.2 MB', lastUpdate: '2026-04-01 14:45' },
  ]

  const sampleData: Record<string, any[]> = {
    users: [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'writer', created_at: '2025-01-15' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'studio', created_at: '2025-02-20' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'writer', created_at: '2026-03-25' },
    ],
    scripts: [
      { id: 1, title: '霸道总裁爱上我', user_id: 1, status: 'published', episodes: 80 },
      { id: 2, title: '重生之我是首富', user_id: 2, status: 'approved', episodes: 100 },
      { id: 3, title: '都市修仙传', user_id: 3, status: 'pending', episodes: 60 },
    ],
  }

  const handleExecuteQuery = () => {
    if (!sqlQuery.trim()) return
    // 模拟查询执行
    setQueryResult({
      columns: ['id', 'name', 'email', 'created_at'],
      rows: [
        [1, '张三', 'zhangsan@example.com', '2025-01-15'],
        [2, '李四', 'lisi@example.com', '2025-02-20'],
      ],
    })
  }

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(sqlQuery)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportTable = (tableName: string) => {
    const data = sampleData[tableName]
    if (!data) return
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tableName}.json`
    a.click()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">4</p>
                <p className="text-sm text-slate-500">数据表</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Table className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">15,912</p>
                <p className="text-sm text-slate-500">总记录数</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <HardDrive className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">63.8 MB</p>
                <p className="text-sm text-slate-500">数据库大小</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-100">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">在线</p>
                <p className="text-sm text-slate-500">服务状态</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab切换 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'tables'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                数据表
              </div>
            </button>
            <button
              onClick={() => setActiveTab('query')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'query'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                SQL查询
              </div>
            </button>
          </div>

          {/* 数据表视图 */}
          {activeTab === 'tables' && (
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {tables.map((table) => (
                  <div
                    key={table.name}
                    onClick={() => setSelectedTable(table.name)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedTable === table.name
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <Table className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className="font-medium text-slate-800">{table.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">记录数</span>
                        <span className="font-medium">{table.records.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">大小</span>
                        <span className="font-medium">{table.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 选中表的数据预览 */}
              {selectedTable && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-800">{selectedTable}</h3>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">
                        {sampleData[selectedTable]?.length || 0} 条记录
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExportTable(selectedTable)}
                        className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        导出
                      </button>
                      <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        导入
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          {Object.keys(sampleData[selectedTable]?.[0] || {}).map((col) => (
                            <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sampleData[selectedTable]?.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="px-4 py-3 text-sm text-slate-700">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SQL查询视图 */}
          {activeTab === 'query' && (
            <div className="p-5">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">SQL语句</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyQuery}
                      className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="输入SQL语句... 例如: SELECT * FROM users LIMIT 10;"
                  className="w-full h-40 px-4 py-3 font-mono text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handleExecuteQuery}
                  disabled={!sqlQuery.trim()}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Server className="h-4 w-4" />
                  执行查询
                </button>
                <button
                  onClick={() => setSqlQuery('')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  重置
                </button>
              </div>

              {/* 查询结果 */}
              {queryResult && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-4 bg-green-50 border-b border-green-100 flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">查询成功，返回 {queryResult.rows.length} 条记录</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          {queryResult.columns.map((col) => (
                            <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {queryResult.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            {row.map((val, j) => (
                              <td key={j} className="px-4 py-3 text-sm text-slate-700">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 快捷查询 */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">快捷查询</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'SELECT * FROM users LIMIT 10',
                    'SELECT * FROM scripts WHERE status = "pending"',
                    'SELECT COUNT(*) FROM users',
                    'SELECT COUNT(*) FROM scripts',
                  ].map((query, i) => (
                    <button
                      key={i}
                      onClick={() => setSqlQuery(query)}
                      className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-mono"
                    >
                      {query.length > 30 ? query.slice(0, 30) + '...' : query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 数据库维护 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">数据库维护</h3>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw className="h-5 w-5 text-teal-600" />
                <span className="font-medium text-slate-800">优化表</span>
              </div>
              <p className="text-sm text-slate-500">清理碎片，释放空间</p>
            </button>
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <Download className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-800">备份数据库</span>
              </div>
              <p className="text-sm text-slate-500">创建完整数据库备份</p>
            </button>
            <button className="p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-600">清理日志</span>
              </div>
              <p className="text-sm text-slate-500">删除30天前的日志记录</p>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
