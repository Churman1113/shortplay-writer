import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Monitor,
  Smartphone,
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingDown,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle2,
  Bot,
  Sparkles,
  Video,
  Shield,
  FileText,
  Megaphone,
  Star,
  Clock,
  Gift,
} from 'lucide-react'
import { industryReportData as reportData } from '@/data/industryReportData'

export default function IndustryReport() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">行业概览</TabsTrigger>
          <TabsTrigger value="platforms">平台分析</TabsTrigger>
          <TabsTrigger value="trends">趋势洞察</TabsTrigger>
          <TabsTrigger value="data">数据详情</TabsTrigger>
          <TabsTrigger value="startup">创业机会</TabsTrigger>
          <TabsTrigger value="ai">AI赋能</TabsTrigger>
          <TabsTrigger value="genre">题材分析</TabsTrigger>
          <TabsTrigger value="policy">监管政策</TabsTrigger>
        </TabsList>

        {/* 行业概览 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md bg-gradient-to-br from-[#0D9488] to-[#134E4A] text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">{reportData.marketScale.currentYear}年市场规模</span>
                  <TrendingUp className="w-5 h-5 text-white/80" />
                </div>
                <div className="text-3xl font-bold mb-1">{reportData.marketScale.current}</div>
                <div className="text-white/80 text-sm">
                  <span className="text-green-300">↑ {reportData.marketScale.growth}</span> vs {reportData.marketScale.nextYear}
                </div>
                <div className="mt-2 text-xs text-white/70">
                  {reportData.marketScale.note}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">用户规模</span>
                  <Users className="w-5 h-5 text-white/80" />
                </div>
                <div className="text-3xl font-bold mb-1">{reportData.userScale.current}</div>
                <div className="text-white/80 text-sm">
                  渗透率 {reportData.userScale.penetration}
                </div>
                <div className="mt-2 text-xs text-white/70">
                  {reportData.userScale.note}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">出海收入</span>
                  <Globe className="w-5 h-5 text-white/80" />
                </div>
                <div className="text-3xl font-bold mb-1">{reportData.revenue.current}</div>
                <div className="text-white/80 text-sm">
                  <span className="text-green-300">↑ {reportData.revenue.growth}</span>
                </div>
                <div className="mt-2 text-xs text-white/70">
                  下载量 {reportData.revenue.downloads} ({reportData.revenue.downloadsGrowth})
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">用户行为洞察</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reportData.userBehavior.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#0D9488]">{item.value}</div>
                    <div className="text-sm font-medium text-slate-700 mt-1">{item.metric}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.note}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">热门题材分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.genres.map((genre, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium text-slate-700">{genre.name}</div>
                    <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          genre.trend === 'up'
                            ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6]'
                            : 'bg-gradient-to-r from-slate-400 to-slate-500'
                        }`}
                        style={{ width: genre.percentage }}
                      />
                    </div>
                    <div className="w-12 text-sm text-slate-600 text-right">{genre.percentage}</div>
                    {genre.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>洞察：</strong>女频甜宠题材仍居首位，但占比有所下降。"重生复仇"题材强势崛起，占比达22%，成为2025年最大黑马。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 平台分析 */}
        <TabsContent value="platforms" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                国内头部平台
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {reportData.topPlatforms.map((platform, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-[#0D9488] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#134E4A]">{platform.name}</h4>
                      <Badge variant="outline">{platform.company}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <div className="text-xs text-slate-500">{platform.mau ? '月活' : '日活'}</div>
                        <div className="text-lg font-bold text-[#0D9488]">{platform.mau || platform.dau}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">特色</div>
                        <div className="text-sm text-slate-700">{platform.feature}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">平台集中度</h4>
                    <p className="text-sm text-amber-800 mt-1">
                      TOP10平台热力值占比高达<strong>88%</strong>，红果短剧一家独大（MAU 2.8亿），河马剧场、九州文化紧随其后。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Globe className="w-5 h-5" />
                海外短剧平台
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {reportData.overseasPlatforms.map((platform, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <h4 className="font-bold text-[#134E4A]">{platform.name}</h4>
                    <div className="text-2xl font-bold text-[#8B5CF6] mt-2">
                      {platform.share || platform.dau}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{platform.feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">出海市场洞察</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• 北美市场贡献收入占比58%，为核心收入市场</li>
                  <li>• 东南亚和欧洲为流量主力，下载量分别超5亿、3亿次</li>
                  <li>• 本土化创作+AI翻译成为出海成功的关键</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 趋势洞察 */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportData.trends.map((trend, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mb-4">
                    {trend.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-[#0D9488]" />}
                    {trend.icon === 'Monitor' && <Monitor className="w-5 h-5 text-[#0D9488]" />}
                    {trend.icon === 'Globe' && <Globe className="w-5 h-5 text-[#0D9488]" />}
                    {trend.icon === 'Smartphone' && <Smartphone className="w-5 h-5 text-[#0D9488]" />}
                    {trend.icon === 'PieChart' && <PieChart className="w-5 h-5 text-[#0D9488]" />}
                    {trend.icon === 'BarChart3' && <BarChart3 className="w-5 h-5 text-[#0D9488]" />}
                  </div>
                  <h4 className="font-bold text-[#134E4A] mb-2">{trend.title}</h4>
                  <p className="text-sm text-slate-600">{trend.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">变现模式分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monetization.map((mode, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="w-24 text-sm font-medium text-slate-700">{mode.mode}</div>
                    <div className="flex-1">
                      <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full flex items-center justify-center text-white text-xs font-medium ${
                            index === 0
                              ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6]'
                              : index === 1
                              ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C]'
                              : 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]'
                          }`}
                          style={{ width: mode.percentage }}
                        >
                          {mode.percentage}
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-sm font-medium text-slate-700">
                        {mode.scale !== '-' && `约${mode.scale}`}
                      </div>
                      <div className="text-xs text-green-600">↑ {mode.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据详情 */}
        <TabsContent value="data" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <button
                onClick={() => toggleSection('market')}
                className="w-full flex items-center justify-between"
              >
                <CardTitle className="text-[#134E4A]">市场规模详细数据</CardTitle>
                {expandedSection === 'market' ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </CardHeader>
            {expandedSection === 'market' && (
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-slate-600">年份</th>
                      <th className="text-right py-2 text-slate-600">市场规模</th>
                      <th className="text-right py-2 text-slate-600">同比增长率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">2024年</td>
                      <td className="text-right font-medium">505亿元</td>
                      <td className="text-right text-green-600">+34.9%</td>
                    </tr>
                    <tr className="border-b bg-[#0D9488]/5">
                      <td className="py-2 font-medium">2025年</td>
                      <td className="text-right font-bold text-[#0D9488]">683亿元</td>
                      <td className="text-right text-green-600">+35.2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">2026年（预测）</td>
                      <td className="text-right font-medium">900-1000亿元</td>
                      <td className="text-right text-green-600">+32-46%</td>
                    </tr>
                    <tr>
                      <td className="py-2">2028年（预测）</td>
                      <td className="text-right font-medium">1500亿元</td>
                      <td className="text-right">-</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            )}
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">行业数据来源</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {reportData.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                    <span className="text-slate-700">{source.name}</span>
                    <span className="text-slate-400">—</span>
                    <span className="text-slate-500 text-xs">{source.report}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 创业机会 */}
        <TabsContent value="startup" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                创业机会分析
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-[#0D9488]/10 to-transparent rounded-lg border-l-4 border-[#0D9488]">
                <p className="text-sm font-medium text-[#134E4A]">{reportData.startupOpportunity.coreLogic}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">竞品分析：StoryPlay</h4>
                <div className="grid md:grid-cols-1 gap-2">
                  {reportData.startupOpportunity.competitors[0].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>用户评价：</strong>{reportData.startupOpportunity.competitors[0].userReview}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">行业痛点</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-sm text-[#134E4A] mb-2">编剧</div>
                    {reportData.startupOpportunity.painPoints.writers.map((pain, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-slate-600 mb-1">
                        <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{pain}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-sm text-[#134E4A] mb-2">影视公司</div>
                    {reportData.startupOpportunity.painPoints.studios.map((pain, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-slate-600 mb-1">
                        <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{pain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">机会点</h4>
                <div className="flex flex-wrap gap-2">
                  {reportData.startupOpportunity.opportunities.map((opp, index) => (
                    <Badge key={index} className="bg-[#0D9488] text-white">
                      {opp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#F97316]/10 to-transparent rounded-lg border-l-4 border-[#F97316]">
                <div className="text-xs text-slate-500 mb-1">推荐方向</div>
                <p className="text-2xl font-black text-[#F97316]">{reportData.startupOpportunity.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI赋能 */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI在短剧行业的应用
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#0D9488]/5 rounded-lg">
                  <div className="text-2xl font-bold text-[#0D9488]">{reportData.aiApplications.currentUsage}</div>
                  <div className="text-xs text-slate-500 mt-1">AI使用率</div>
                </div>
                <div className="text-center p-4 bg-[#F97316]/5 rounded-lg">
                  <div className="text-2xl font-bold text-[#F97316]">{reportData.aiApplications.efficiencyImprovement}</div>
                  <div className="text-xs text-slate-500 mt-1">效率提升</div>
                </div>
                <div className="text-center p-4 bg-[#8B5CF6]/5 rounded-lg col-span-2">
                  <div className="text-sm font-bold text-[#8B5CF6]">主流工具</div>
                  <div className="text-xs text-slate-600 mt-1">{reportData.aiApplications.tools.join(' / ')}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">AI应用场景</h4>
                <div className="flex flex-wrap gap-2">
                  {reportData.aiApplications.scenarios.map((scenario, index) => (
                    <Badge key={index} variant="outline" className="border-[#0D9488] text-[#0D9488]">
                      {scenario}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">局限性</h4>
                <div className="space-y-2">
                  {reportData.aiApplications.limitations.map((lim, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{lim}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#134E4A] mb-3">AIGC案例</h4>
                <div className="space-y-2">
                  {reportData.aiApplications.aigcCases.map((c, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-sm text-[#134E4A]">{c.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-sm text-green-800 mb-2">数字人适用场景</div>
                  {reportData.aiApplications.digitalHuman.applicable.map((item, index) => (
                    <div key={index} className="text-xs text-green-700 mb-1">• {item}</div>
                  ))}
                </div>
                <div className="p-4 bg-slate-100 rounded-lg">
                  <div className="font-medium text-sm text-slate-700 mb-2">数字人不适用场景</div>
                  {reportData.aiApplications.digitalHuman.notApplicable.map((item, index) => (
                    <div key={index} className="text-xs text-slate-500 mb-1">• {item}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 题材分析 */}
        <TabsContent value="genre" className="space-y-6">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
            {reportData.genreAnalysis.mainGenres.map((genre, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[#134E4A]">{genre.name}</h4>
                    <Badge className="bg-[#0D9488]">{genre.percentage}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">核心元素：</span>
                      <span className="text-slate-700">{genre.elements}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">故事套路：</span>
                      <span className="text-slate-700">{genre.storyline}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">火爆原因：</span>
                      <span className="text-slate-700">{genre.reason}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-slate-500">目标用户：</span>
                      <span className="text-slate-700">{genre.users}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">题材趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportData.genreAnalysis.trends.map((trend, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[#0D9488]" />
                    <span className="text-slate-700">{trend}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 监管政策 */}
        <TabsContent value="policy" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Shield className="w-5 h-5" />
                短剧监管时间线
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.regulations.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-16 text-sm font-bold text-[#0D9488]">{item.year}</div>
                    <div className="flex-1">
                      <div className="w-3 h-3 bg-[#0D9488] rounded-full mt-1.5" />
                      <div className="text-sm text-slate-700 mt-1">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">内容红线</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.regulations.redLines.map((line, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800">{line}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">趋势预判</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-medium text-sm text-[#134E4A] mb-3">短期（2025-2026）</div>
                  <div className="space-y-2">
                    {reportData.regulations.trend.shortTerm.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#F97316]" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm text-[#134E4A] mb-3">长期</div>
                  <div className="space-y-2">
                    {reportData.regulations.trend.longTerm.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
