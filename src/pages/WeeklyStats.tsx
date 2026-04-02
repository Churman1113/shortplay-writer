import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, FileText, TrendingUp, Flame, Target, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const weeklyData = [
  { day: '周一', episodes: 5, words: 4500 },
  { day: '周二', episodes: 3, words: 2800 },
  { day: '周三', episodes: 8, words: 7200 },
  { day: '周四', episodes: 4, words: 3600 },
  { day: '周五', episodes: 6, words: 5400 },
  { day: '周六', episodes: 10, words: 9000 },
  { day: '周日', episodes: 7, words: 6300 },
]

const achievements = [
  { icon: Flame, label: '连续创作', value: '7天', desc: '本周每日都有创作' },
  { icon: Target, label: '完成目标', value: '5/7', desc: '完成5天日更目标' },
  { icon: Award, label: '最佳单日', value: '周六', desc: '单日完成10集' },
  { icon: TrendingUp, label: '效率提升', value: '+23%', desc: '较上周效率提升' },
]

export default function WeeklyStatsPage() {
  const navigate = useNavigate()
  const totalEpisodes = weeklyData.reduce((sum, d) => sum + d.episodes, 0)
  const totalWords = weeklyData.reduce((sum, d) => sum + d.words, 0)
  const avgEpisodes = Math.round(totalEpisodes / 7)
  const avgWords = Math.round(totalWords / 7)

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>
        <div className="h-6 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A]">本周创作统计</h1>
      </div>

      {/* 核心数据 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#0D9488] to-[#14B8A6] text-white">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-3xl font-bold">{totalEpisodes}</div>
            <div className="text-sm opacity-80">本周完成集数</div>
            <div className="text-xs opacity-60 mt-1">平均每天 {avgEpisodes} 集</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#F97316] to-[#FB923C] text-white">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-3xl font-bold">{(totalWords / 10000).toFixed(1)}w</div>
            <div className="text-sm opacity-80">本周创作字数</div>
            <div className="text-xs opacity-60 mt-1">平均每天 {(avgWords / 1000).toFixed(1)}k 字</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-3xl font-bold">43h</div>
            <div className="text-sm opacity-80">创作时长</div>
            <div className="text-xs opacity-60 mt-1">平均每天 6.1 小时</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-3xl font-bold">+23%</div>
            <div className="text-sm opacity-80">效率提升</div>
            <div className="text-xs opacity-60 mt-1">较上周同期</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 每日创作趋势 */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                每日创作趋势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'episodes' ? `${value} 集` : `${(value / 1000).toFixed(1)}k 字`,
                        name === 'episodes' ? '完成集数' : '创作字数',
                      ]}
                    />
                    <Bar dataKey="episodes" fill="#0D9488" radius={[4, 4, 0, 0]} name="episodes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0D9488]" />
                  <span className="text-sm text-slate-500">每日完成集数</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 成就卡片 */}
        <div>
          <Card className="border-0 shadow-md h-full">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                本周成就
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#134E4A]">{item.value}</span>
                        <span className="text-sm text-slate-500">{item.label}</span>
                      </div>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 本周创作明细 */}
      <Card className="border-0 shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-[#134E4A] flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            每日创作明细
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weeklyData.map((day, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-slate-50">
                <div className="text-sm font-medium text-slate-600 mb-2">{day.day}</div>
                <div className="text-2xl font-bold text-[#0D9488]">{day.episodes}</div>
                <div className="text-xs text-slate-400">集</div>
                <div className="text-sm font-medium text-slate-500 mt-2">{(day.words / 1000).toFixed(1)}k</div>
                <div className="text-xs text-slate-400">字</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
