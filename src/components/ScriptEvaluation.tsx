import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sparkles,
  Target,
  Heart,
  Users,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Clock,
  Eye,
  Zap,
  FileText,
  MessageCircle
} from 'lucide-react'

interface EvaluationResult {
  overallScore: number
  dimensions: {
    name: string
    score: number
    maxScore: number
    description: string
    suggestions: string[]
  }[]
  highlights: string[]
  risks: string[]
  suggestions: string[]
  genreMatch: { genre: string; score: number }[]
}

const genreTags = ['甜宠', '虐恋', '战神', '赘婿', '重生', '穿越', '霸总', '萌宝', '都市', '古装', '悬疑', '搞笑']

export default function ScriptEvaluation() {
  const [scriptContent, setScriptContent] = useState('')
  const [evaluating, setEvaluating] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const runEvaluation = async () => {
    if (!scriptContent.trim() && selectedTags.length === 0) return

    setEvaluating(true)

    // 模拟AI评估过程
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 基于内容分析生成评估结果
    const wordCount = scriptContent.length
    const hasPlot = scriptContent.includes('转折') || scriptContent.includes('突然') || scriptContent.includes('没想到')
    const hasConflict = scriptContent.includes('冲突') || scriptContent.includes('矛盾') || scriptContent.includes('争吵')
    const hasEmotion = scriptContent.includes('爱') || scriptContent.includes('心痛') || scriptContent.includes('感动')
    const hasHook = scriptContent.includes('没想到') || scriptContent.includes('震惊') || scriptContent.includes('秘密')

    // 计算各维度得分
    const hookScore = hasHook ? 85 + Math.random() * 15 : 50 + Math.random() * 25
    const plotScore = hasPlot ? 70 + Math.random() * 20 : 55 + Math.random() * 20
    const characterScore = hasConflict ? 75 + Math.random() * 15 : 60 + Math.random() * 20
    const emotionScore = hasEmotion ? 80 + Math.random() * 15 : 55 + Math.random() * 25
    const marketScore = selectedTags.includes('甜宠') || selectedTags.includes('战神') ? 75 + Math.random() * 20 : 60 + Math.random() * 25

    const evaluation: EvaluationResult = {
      overallScore: Math.round((hookScore + plotScore + characterScore + emotionScore + marketScore) / 5),
      dimensions: [
        {
          name: '开篇钩子',
          score: Math.round(hookScore),
          maxScore: 100,
          description: '评估前3集是否能快速抓住观众注意力',
          suggestions: hookScore < 70 ? [
            '建议在第1集设置强冲突或悬念',
            '开场即呈现主角的核心矛盾',
            '避免平淡的日常铺垫'
          ] : [
            '开篇设计良好，能够吸引观众继续观看'
          ]
        },
        {
          name: '剧情结构',
          score: Math.round(plotScore),
          maxScore: 100,
          description: '评估故事线的连贯性和节奏感',
          suggestions: plotScore < 70 ? [
            '建议在第8-12集设置第一个付费卡点',
            '每20-30集设置一个情绪高潮',
            '确保主线清晰，避免支线过多'
          ] : [
            '剧情节奏把控良好，有较好的起伏设计'
          ]
        },
        {
          name: '人物塑造',
          score: Math.round(characterScore),
          maxScore: 100,
          description: '评估主角、配角的立体程度',
          suggestions: characterScore < 70 ? [
            '建议加强主角的"爽点"和"痛点"设计',
            '配角需要有明确的功能性',
            '考虑加入"反差萌"元素增加角色魅力'
          ] : [
            '人物设定有亮点，角色有记忆点'
          ]
        },
        {
          name: '情感共鸣',
          score: Math.round(emotionScore),
          maxScore: 100,
          description: '评估内容能否引发观众情感代入',
          suggestions: emotionScore < 70 ? [
            '建议加入更多能让观众共情的情节',
            '主角经历要能让目标受众有代入感',
            '注意营造"虐心"和"甜蜜"的节奏交替'
          ] : [
            '情感设计到位，能引发观众共鸣'
          ]
        },
        {
          name: '市场潜力',
          score: Math.round(marketScore),
          maxScore: 100,
          description: '评估题材的市场接受度和变现能力',
          suggestions: marketScore < 70 ? [
            '当前题材竞争激烈，建议考虑差异化定位',
            '可结合热点元素增加新鲜感',
            '注意平台的收稿偏好，选择匹配渠道'
          ] : [
            '题材选择符合市场趋势，有较好的商业潜力'
          ]
        }
      ],
      highlights: [
        '题材选择符合当前市场主流趋势',
        selectedTags.length > 2 ? '多元素融合能增加看点' : '单一题材定位清晰明确',
        wordCount > 1000 ? '剧本内容丰富，有足够的信息量' : '开篇简洁明了，节奏较快',
        hasEmotion ? '情感线设计能引发观众共鸣' : '剧情线节奏紧张，吸引力强'
      ],
      risks: [
        hookScore < 70 ? '开篇吸引力不足，编辑可能中途放弃阅读' : null,
        selectedTags.includes('霸总') ? '霸总题材同质化严重，需要差异化创新' : null,
        wordCount < 500 ? '内容长度较短，建议补充更多细节' : null,
        !hasConflict ? '冲突设计较弱，建议加强人物矛盾' : null
      ].filter(Boolean) as string[],
      suggestions: [
        '前3集必须设置强钩子，建议参考同类型爆款的开篇结构',
        '付费卡点位置建议：第10集、第30集、第60集',
        '人物小传要突出主角的成长弧光和情感痛点',
        '建议投递给对应当前题材的平台，如：',
        ...(selectedTags.includes('甜宠') ? ['九州文化、抖音短剧对甜宠题材接受度高'] : []),
        ...(selectedTags.includes('战神') ? ['点众科技、天桥短剧对男频战神题材需求大'] : []),
        ...(selectedTags.includes('虐恋') ? ['麦芽传媒、映宇宙对虐恋题材有偏好'] : [])
      ],
      genreMatch: [
        { genre: '抖音热播', score: selectedTags.includes('甜宠') ? 92 : 75 },
        { genre: '快手偏好', score: selectedTags.includes('搞笑') ? 88 : 72 },
        { genre: '微信小程序', score: selectedTags.includes('虐恋') ? 85 : 70 },
        { genre: '海外出海', score: selectedTags.includes('霸总') ? 80 : 68 }
      ].filter(g => g.score > 0)
    }

    setResult(evaluation)
    setEvaluating(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    return '待优化'
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="evaluate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluate">剧本评估</TabsTrigger>
          <TabsTrigger value="guide">评估指南</TabsTrigger>
          <TabsTrigger value="cases">案例分析</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluate" className="space-y-6">
          {/* 输入区域 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F97316]" />
                AI剧本评估
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#134E4A]/80 mb-2 block">
                  选择题材标签（可多选）
                </label>
                <div className="flex flex-wrap gap-2">
                  {genreTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-[#0D9488] hover:bg-[#0F766E]'
                          : 'hover:bg-[#0D9488]/10'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#134E4A]/80 mb-2 block">
                  或粘贴剧本内容（选填，更精确的评估）
                </label>
                <Textarea
                  placeholder="粘贴你的剧本内容（前3-5集最佳），AI将分析剧情结构、人物设定、情感钩子等多个维度..."
                  className="min-h-[150px] resize-none"
                  value={scriptContent}
                  onChange={(e) => setScriptContent(e.target.value)}
                />
              </div>

              <Button
                onClick={runEvaluation}
                disabled={evaluating || (!scriptContent.trim() && selectedTags.length === 0)}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E]"
              >
                {evaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    评估中...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    开始评估
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 评估结果 */}
          {result && (
            <>
              {/* 总分卡片 */}
              <Card className={`border-0 shadow-lg ${
                result.overallScore >= 80 ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                result.overallScore >= 60 ? 'bg-gradient-to-r from-amber-50 to-orange-50' :
                'bg-gradient-to-r from-red-50 to-rose-50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">综合评分</p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-bold ${
                          result.overallScore >= 80 ? 'text-green-600' :
                          result.overallScore >= 60 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {result.overallScore}
                        </span>
                        <span className="text-2xl text-slate-400">/100</span>
                      </div>
                      <Badge className={`mt-2 ${getScoreColor(result.overallScore)}`}>
                        {getScoreLabel(result.overallScore)}
                      </Badge>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0D9488]">{result.dimensions.filter(d => d.score >= 70).length}</div>
                        <div className="text-xs text-slate-500">优秀维度</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F97316]">{result.highlights.length}</div>
                        <div className="text-xs text-slate-500">亮点分析</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{result.risks.length}</div>
                        <div className="text-xs text-slate-500">潜在风险</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 五维分析 */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#134E4A] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    五维能力分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.dimensions.map((dim, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Target className="w-4 h-4 text-[#F97316]" />}
                            {index === 1 && <FileText className="w-4 h-4 text-[#0D9488]" />}
                            {index === 2 && <Users className="w-4 h-4 text-[#8B5CF6]" />}
                            {index === 3 && <Heart className="w-4 h-4 text-[#EC4899]" />}
                            {index === 4 && <TrendingUp className="w-4 h-4 text-[#14B8A6]" />}
                            <span className="font-medium text-[#134E4A]">{dim.name}</span>
                            <span className="text-xs text-slate-400">({dim.description})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getScoreColor(dim.score)}>
                              {dim.score}/{dim.maxScore}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={dim.score} className="h-2" />
                        {dim.suggestions.length > 0 && (
                          <div className="bg-slate-50 rounded-lg p-3 mt-2">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              <ul className="text-sm text-slate-600 space-y-1">
                                {dim.suggestions.map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 亮点与风险 */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* 亮点 */}
                <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
                      <Award className="w-5 h-5 text-green-600" />
                      剧本亮点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* 风险提示 */}
                <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      潜在风险
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.risks.length > 0 ? result.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          {risk}
                        </li>
                      )) : (
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          未发现明显风险，继续保持！
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* 平台匹配 */}
              {result.genreMatch.length > 0 && (
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-[#134E4A] flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#0D9488]" />
                      平台匹配度
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {result.genreMatch.map((match, index) => (
                        <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#0D9488]">{match.score}%</div>
                          <div className="text-sm text-slate-600 mt-1">{match.genre}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 优化建议 */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#134E4A] flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#F97316]" />
                    优化建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                        <div className="w-6 h-6 bg-[#0D9488]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-[#0D9488]">{index + 1}</span>
                        </div>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">剧本评估维度说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-[#F97316]" />
                    <h4 className="font-medium">开篇钩子</h4>
                  </div>
                  <p className="text-sm text-slate-600">评估前3集是否能快速抓住观众/编辑的注意力。优秀的开篇需要在第1集就呈现核心冲突或悬念。</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-[#0D9488]" />
                    <h4 className="font-medium">剧情结构</h4>
                  </div>
                  <p className="text-sm text-slate-600">评估故事线的连贯性、节奏感和付费卡点设置。标准短剧建议在第10集、第30集、第60集设置付费卡点。</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-[#8B5CF6]" />
                    <h4 className="font-medium">人物塑造</h4>
                  </div>
                  <p className="text-sm text-slate-600">评估主角、配角的立体程度。主角需要有明确的"爽点"（让观众期待）和"痛点"（让观众同情）。</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-[#EC4899]" />
                    <h4 className="font-medium">情感共鸣</h4>
                  </div>
                  <p className="text-sm text-slate-600">评估内容能否引发观众情感代入。好的短剧能让观众"共情"，愿意为角色的喜怒哀乐买单。</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#14B8A6]" />
                    <h4 className="font-medium">市场潜力</h4>
                  </div>
                  <p className="text-sm text-slate-600">评估题材的市场接受度和变现能力。不同平台有不同的题材偏好，选择对平台能提高过稿率。</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-[#F59E0B]" />
                    <h4 className="font-medium">综合评分</h4>
                  </div>
                  <p className="text-sm text-slate-600">基于五个维度的加权平均。80分以上为优秀，60-79分为良好，60分以下需要重点优化。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">提升评分的技巧</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">开篇钩子技巧</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• 开场即展示主角的"至暗时刻"</li>
                    <li>• 设置悬念："他没想到..."</li>
                    <li>• 直接呈现核心冲突，避免铺垫</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">付费卡点技巧</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• 第1卡点：第8-12集（早于同行）</li>
                    <li>• 每20-30集设置情绪高潮</li>
                    <li>• 卡点处留下"不得不看"的悬念</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">爆款短剧案例分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#134E4A]">《云渺》</h4>
                    <Badge className="bg-green-100 text-green-700">系列爆款</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">成功要素：IP长效化运营 + 精品化制作 + 演员明星化路线</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>累计播放量：50亿+</span>
                    <span>集数：3季共180集</span>
                    <span>平台：红果短剧</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#134E4A]">《十八岁太奶奶》</h4>
                    <Badge className="bg-amber-100 text-amber-700">创新题材</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">成功要素：差异化题材 + 反套路人设 + 强情感共鸣</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>累计播放量：20亿+</span>
                    <span>题材：重生+甜宠</span>
                    <span>平台：抖音</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#134E4A]">男频战神系列</h4>
                    <Badge className="bg-blue-100 text-blue-700">男频代表</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">成功要素：极致爽感 + 逆袭快感 + 强者人设</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>平均播放量：10亿+</span>
                    <span>题材：战神、赘婿</span>
                    <span>平台：点众、天桥</span>
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
