import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageSquare,
  Eye,
  Zap,
  FileText,
  Clock,
  AlertCircle,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react'

interface HelpItem {
  id: string
  title: string
  content: string
  example?: string
  tips?: string[]
}

const formatHelps: HelpItem[] = [
  {
    id: 'scene',
    title: '场景描写格式',
    content: '场景描写用【】包裹，放在对白之前，描述该场景的时间、地点、环境等。',
    example: '【客厅·日内】\n豪华的别墅客厅，阳光透过落地窗洒进来。\n\n李明：这件事我必须知道真相！',
    tips: [
      '场景格式：【地点·时间】',
      '时间：日内/夜内/晨/昏/午等',
      '场景描写要简洁，2-3句话即可'
    ]
  },
  {
    id: 'dialogue',
    title: '对白格式',
    content: '对白格式为：角色名 + 冒号 + 台词。对白要口语化，符合角色性格。',
    example: '张总：这件事没得商量。\n\n小李：张总，请您再给我一次机会...\n\n张总：（冷笑）机会？你自己不珍惜，怪谁？',
    tips: [
      '角色名要统一，不要随意变换',
      '对白要简短，每句不超过20字',
      '可以用（）表示动作或表情'
    ]
  },
  {
    id: 'narration',
    title: '旁白格式',
    content: '旁白用于补充信息、描述心理、过渡剧情等，不属于任何角色。',
    example: '旁白：三年后，李明终于查明了真相...\n\n旁白：原来一切都是误会，而他已经错过了最好的时机。',
    tips: [
      '旁白用"旁白："或"（OS）"标注',
      '旁白不宜过多，影响节奏',
      '用于关键剧情的过渡'
    ]
  },
  {
    id: 'action',
    title: '动作描写',
    content: '动作用括号包裹，可以放在对白之前或之后，描述角色的行为。',
    example: '（拍桌）我真的没想到你会这样！\n\n（转身离去）\n\n（握紧拳头，沉默不语）',
    tips: [
      '动作描写要生动但不夸张',
      '可以连续用多个动作描写',
      '用动作代替"说"字'
    ]
  }
]

const conceptHelps = [
  {
    id: 'paid_point',
    title: '付费卡点',
    content: '付费卡点是用户需要付费才能继续观看的剧情节点，是短剧变现的核心。',
    example: '第8-12集设置第一个卡点\n第30集设置第二个卡点\n第60集设置第三个卡点',
    tips: [
      '卡点要设置在剧情高潮或悬念处',
      '太早设置会流失观众',
      '太晚设置影响收益'
    ]
  },
  {
    id: 'hook',
    title: '开篇钩子',
    content: '开篇钩子指在前3集内快速抓住观众注意力的设计，通常是强冲突或重大悬念。',
    example: '开篇即展示主角被陷害入狱\n开篇即展示婚礼现场被逃婚\n开篇即展示主角重生回到过去',
    tips: [
      '前3集必须出现核心冲突',
      '避免平淡的日常铺垫',
      '给观众一个"不得不看下去"的理由'
    ]
  },
  {
    id: 'shuangang',
    title: '爽点设计',
    content: '爽点是让观众感到痛快的剧情设计，如主角逆袭、打脸反派等。',
    example: '主角被看不起→身份曝光震惊全场\n被陷害→真相大白反转\n被抛弃→遇到更好的另一半',
    tips: [
      '战神/赘婿类核心就是爽点',
      '爽点要铺垫后再爆发',
      '注意"虐"和"爽"的节奏交替'
    ]
  },
  {
    id: 'character',
    title: '人物设定',
    content: '人物设定包括外在特征（身份、外貌）和内在特征（性格、动机、痛点）。',
    example: '男主：霸道总裁，表面冷漠实则深情\n女主：普通职员，善良坚韧，有隐藏身份\n反派：心机深沉，为达目的不择手段',
    tips: [
      '主角要有成长弧光',
      '配角要有明确的功能性',
      '反派要坏到让观众想打'
    ]
  }
]

const rhythmTips = [
  {
    title: '单集字数',
    value: '800-1200字',
    desc: '每集时长约1-2分钟'
  },
  {
    title: '每集集数',
    value: '60-100集',
    desc: '标准短剧篇幅'
  },
  {
    title: '黄金3集',
    value: '前3集定生死',
    desc: '决定观众是否继续看'
  },
  {
    title: '卡点节奏',
    value: '每20-30集',
    desc: '设置一个情绪高潮'
  }
]

const commonMistakes = [
  {
    mistake: '开篇节奏太慢',
    solution: '前3集必须出现核心冲突，不要做过多背景铺垫'
  },
  {
    mistake: '对白太书面化',
    solution: '对白要口语化，像正常人说话一样'
  },
  {
    mistake: '剧情拖沓',
    solution: '每集结尾要有钩子，吸引继续看'
  },
  {
    mistake: '人物动机不清晰',
    solution: '每个角色的行为都要有合理动机'
  },
  {
    mistake: '付费点设置不当',
    solution: '卡点要设置在观众最想知道结果的时候'
  }
]

const templates = [
  {
    genre: '甜宠模板',
    content: `【咖啡厅·日内】
林小雨：（低头看手机）他怎么还没来？

（李浩推门而入）

李浩：对不起，我来晚了。

林小雨：你每次都这样！

李浩：（温柔地看着她）这次是有原因的...

旁白：他们不知道，一场误会正在悄悄逼近...`
  },
  {
    genre: '战神模板',
    content: `【监狱·夜内】
铁门被打开，李战天走了出来。

手下：王，我们回来了！

李战天：（冷笑）五年了，该让他们付出代价了。

旁白：曾经的废物赘婿，如今王者归来！`
  },
  {
    genre: '重生模板',
    content: `【医院·日内】
林晚晚：（猛然睁眼）我...我没死？

（看着日历）这...这是三年前？！

林晚晚：（握拳）这一次，我绝不会再被骗了！

旁白：重生归来，她誓要改写命运！`
  }
]

interface EditorHelpPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function EditorHelpPanel({ isOpen, onClose }: EditorHelpPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (!isOpen) return null

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-40 flex flex-col">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-[#0D9488] to-[#134E4A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            <h2 className="font-bold">编剧助手</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 内容 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="format" className="text-xs">格式</TabsTrigger>
            <TabsTrigger value="concept" className="text-xs">概念</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">技巧</TabsTrigger>
            <TabsTrigger value="template" className="text-xs">模板</TabsTrigger>
          </TabsList>

          {/* 格式指南 */}
          <TabsContent value="format" className="space-y-3 mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0D9488]" />
                  剧本格式指南
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <p className="text-xs text-slate-600 mb-3">
                  掌握正确的剧本格式是创作的基础，以下是短剧剧本的标准写法：
                </p>
              </CardContent>
            </Card>

            {formatHelps.map((help) => (
              <Card
                key={help.id}
                className={`border-0 shadow-sm cursor-pointer transition-all ${
                  expandedId === help.id ? 'ring-2 ring-[#0D9488]/30' : ''
                }`}
                onClick={() => toggleExpand(help.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {help.id === 'scene' && <BookOpen className="w-4 h-4 text-[#0D9488]" />}
                      {help.id === 'dialogue' && <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />}
                      {help.id === 'narration' && <FileText className="w-4 h-4 text-[#F97316]" />}
                      {help.id === 'action' && <Zap className="w-4 h-4 text-[#EC4899]" />}
                      <span className="font-medium text-sm text-[#134E4A]">{help.title}</span>
                    </div>
                    {expandedId === help.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {expandedId === help.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-xs text-slate-600">{help.content}</p>

                      {help.example && (
                        <div className="relative">
                          <div className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{help.example}</pre>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(help.example!, help.id)
                            }}
                          >
                            {copiedId === help.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      )}

                      {help.tips && (
                        <div className="bg-[#0D9488]/5 rounded-lg p-2">
                          <p className="text-xs font-medium text-[#0D9488] mb-1">小贴士：</p>
                          <ul className="space-y-1">
                            {help.tips.map((tip, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                                <span className="text-[#0D9488]">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 核心概念 */}
          <TabsContent value="concept" className="space-y-3 mt-4">
            {conceptHelps.map((help) => (
              <Card key={help.id} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      help.id === 'paid_point' ? 'bg-[#F97316]/10 text-[#F97316]' :
                      help.id === 'hook' ? 'bg-[#0D9488]/10 text-[#0D9488]' :
                      help.id === 'shuangang' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                      'bg-[#EC4899]/10 text-[#EC4899]'
                    }`}>
                      {help.id === 'paid_point' && <Clock className="w-5 h-5" />}
                      {help.id === 'hook' && <Zap className="w-5 h-5" />}
                      {help.id === 'shuangang' && <Eye className="w-5 h-5" />}
                      {help.id === 'character' && <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-[#134E4A] mb-1">{help.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{help.content}</p>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs font-medium text-slate-500 mb-1">示例：</p>
                        <p className="text-xs text-slate-600 whitespace-pre-line">{help.example}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {help.tips?.map((tip, i) => (
                          <Badge key={i} className="text-xs bg-[#0D9488]/10 text-[#0D9488]">
                            {tip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 写作技巧 */}
          <TabsContent value="tips" className="space-y-4 mt-4">
            {/* 节奏参考 */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-[#0D9488]/5 to-transparent">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0D9488]" />
                  节奏参考
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {rhythmTips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-lg p-2">
                      <p className="text-xs text-slate-500">{tip.title}</p>
                      <p className="font-bold text-sm text-[#0D9488]">{tip.value}</p>
                      <p className="text-xs text-slate-400">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 常见错误 */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  新手常见错误
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-red-50/50 rounded-lg p-2">
                    <p className="text-xs font-medium text-red-700">✗ {item.mistake}</p>
                    <p className="text-xs text-slate-600 mt-1">✓ {item.solution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI使用建议 */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-[#8B5CF6]/5 to-transparent">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#8B5CF6]" />
                  AI辅助建议
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-[#8B5CF6]">1.</span>
                    用AI生成剧情灵感，但不要完全依赖
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-[#8B5CF6]">2.</span>
                    让AI帮你优化对白，检查格式
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-[#8B5CF6]">3.</span>
                    AI生成的内容要符合你的故事风格
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-[#8B5CF6]">4.</span>
                    最终创意决策要自己做
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 剧本模板 */}
          <TabsContent value="template" className="space-y-3 mt-4">
            <p className="text-xs text-slate-600">
              点击模板可复制内容，然后粘贴到编辑器中使用：
            </p>
            {templates.map((template, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[#0D9488]/10 text-[#0D9488]">
                      {template.genre}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7"
                      onClick={() => copyToClipboard(template.content, `template-${index}`)}
                    >
                      {copiedId === `template-${index}` ? (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> 已复制
                        </span>
                      ) : (
                        <span className="text-xs flex items-center gap-1">
                          <Copy className="w-3 h-3" /> 复制
                        </span>
                      )}
                    </Button>
                  </div>
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs font-mono max-h-48 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{template.content}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部快捷操作 */}
      <div className="p-4 border-t bg-slate-50">
        <Button className="w-full bg-[#0D9488] hover:bg-[#0F766E]" size="sm">
          <Zap className="w-4 h-4 mr-1" /> 询问AI助手
        </Button>
      </div>
    </div>
  )
}
