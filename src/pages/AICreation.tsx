import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, FileText, Wand2, Copy, Check, Lightbulb, BookOpen, Zap, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// AI辅助创作页面
export default function AICreation() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('outline');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  // 大纲生成表单状态
  const [outlineForm, setOutlineForm] = useState({
    genre: '',
    theme: '',
    episodes: '80',
    targetAudience: '',
    keyElements: '',
    style: '爽文',
  });

  // 分集脚本表单状态
  const [scriptForm, setScriptForm] = useState({
    outline: '',
    episodeRange: '1-10',
    focusPoints: '',
    cliffhangerStyle: '悬念型',
  });

  // 台词润色表单状态
  const [polishForm, setPolishForm] = useState({
    originalText: '',
    style: '口语化',
    emotion: '强烈',
    target: '冲突感',
  });

  // 爆款模板
  const templates = [
    { id: 1, title: '重生复仇', category: '女频', description: '女主重生后打脸渣男贱女，一路逆袭', hot: true },
    { id: 2, title: '先婚后爱', category: '女频', description: '契约婚姻变真爱，甜宠虐渣两不误', hot: true },
    { id: 3, title: '战神归来', category: '男频', description: '隐世战神回归都市，护妻灭敌', hot: true },
    { id: 4, title: '穿越逆袭', category: '穿越', description: '现代人穿越古代，用现代知识逆袭', hot: false },
    { id: 5, title: '赘婿翻身', category: '男频', description: '上门女婿隐忍多年，一朝觉醒', hot: true },
    { id: 6, title: '替身文学', category: '女频', description: '替身转正，虐恋情深', hot: false },
  ];

  // 生成大纲
  const generateOutline = async () => {
    if (!outlineForm.theme) {
      toast.error('请输入故事主题');
      return;
    }
    setIsGenerating(true);
    // 模拟AI生成
    setTimeout(() => {
      const mockOutline = generateMockOutline(outlineForm);
      setGeneratedContent(mockOutline);
      setIsGenerating(false);
      toast.success('大纲生成成功！');
    }, 2000);
  };

  // 生成分集脚本
  const generateScript = async () => {
    if (!scriptForm.outline) {
      toast.error('请输入故事大纲');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const mockScript = generateMockScript(scriptForm);
      setGeneratedContent(mockScript);
      setIsGenerating(false);
      toast.success('分集脚本生成成功！');
    }, 2500);
  };

  // 润色台词
  const polishDialogue = async () => {
    if (!polishForm.originalText) {
      toast.error('请输入需要润色的文本');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const polished = generatePolishedText(polishForm);
      setGeneratedContent(polished);
      setIsGenerating(false);
      toast.success('台词润色完成！');
    }, 1500);
  };

  // 复制内容
  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success('已复制到剪贴板');
    setTimeout(() => setCopied(false), 2000);
  };

  // 模拟生成大纲
  const generateMockOutline = (form: typeof outlineForm) => {
    return `《${form.theme}》故事大纲

【题材】${form.genre || '都市言情'}
【集数】${form.episodes}集
【风格】${form.style}
【目标受众】${form.targetAudience || '18-35岁女性'}

=== 人物设定 ===

【女主】林婉儿
- 年龄：25岁
- 性格：外柔内刚，聪慧机敏
- 背景：普通白领，被未婚夫和闺蜜背叛后重生

【男主】顾景深
- 年龄：28岁
- 性格：冷酷霸道，专情腹黑
- 背景：顾氏集团总裁，暗中保护女主

【反派】苏婉柔
- 女主前世闺蜜，心机深沉，为达目的不择手段

=== 故事梗概 ===

林婉儿前世被未婚夫和闺蜜联手陷害，家破人亡。重生回到三年前，她发誓要改变命运，让那些伤害过她的人付出代价。在复仇的路上，她遇到了顾景深，两人从互相试探到相知相爱，最终携手共创美好未来。

=== 付费卡点设计 ===

【第一卡点】第10集
女主发现未婚夫和闺蜜的奸情，当众揭穿，引发冲突高潮

【第二卡点】第30集
女主身份曝光，原来是豪门千金，打脸曾经看不起她的人

【第三卡点】第60集
男女主感情遭遇重大考验，误会与和解

=== 分集概要 ===

第1-10集：重生归来，初露锋芒
- 第1集：女主重生，回忆前世悲惨遭遇
- 第5集：初次与男主相遇，产生误会
- 第10集：当众揭穿渣男贱女（卡点）

第11-30集：事业起步，感情升温
- 第15集：女主创业，展现商业才华
- 第20集：男主暗中相助，感情萌芽
- 第30集：身份曝光，震惊众人（卡点）

第31-60集：正面对决，真相大白
- 第40集：反派设局，女主陷入危机
- 第50集：男主挺身而出，英雄救美
- 第60集：感情考验，误会重重（卡点）

第61-${form.episodes}集：圆满结局，幸福开启
- 第70集：真相大白，反派伏法
- 第80集：大婚，圆满结局`;
  };

  // 模拟生成分集脚本
  const generateMockScript = (form: typeof scriptForm) => {
    return `第1集 重生归来

=== 场景1：医院病房 日内 ===

【画面】林婉儿猛地睁开眼睛，看着雪白的天花板，一脸茫然。

林婉儿（内心OS）：这是...医院？我不是已经...

【闪回】
- 苏婉柔狰狞的笑脸
- 从楼顶坠落的失重感
- 地面越来越近...

林婉儿（猛地坐起，惊恐）：啊！

【护士闻声赶来】

护士：林小姐，您终于醒了！您昏迷了三天，可把我们急坏了。

林婉儿（环顾四周，看到墙上的日历——2022年3月15日）：2022年？

【她颤抖着拿起手机，看着屏幕上的日期，眼泪夺眶而出】

林婉儿（内心OS）：我...我重生了？回到了三年前？

【画面定格在她泪流满面的脸上】

=== 场景2：病房门口 日内 ===

【门被推开，未婚夫陈浩和苏婉柔走了进来】

陈浩（假惺惺）：婉儿，你终于醒了，担心死我了。

苏婉柔（握住她的手）：婉儿，你可吓死我了，以后不许再做傻事了。

【林婉儿看着两人，前世的记忆涌上心头】

【闪回】
- 陈浩和苏婉柔在床上的画面
- 两人密谋夺取她财产的对话
- 推她下楼的瞬间...

林婉儿（眼神逐渐变冷，抽回手）：我没事。

【她看着两人，嘴角微微上扬，露出意味深长的笑容】

林婉儿（内心OS）：既然老天给我重来一次的机会，这一世，我绝不会让你们好过。

【片尾卡点：林婉儿意味深长的笑容，预示着复仇即将开始】

=== 本集完 ===`;
  };

  // 模拟润色文本
  const generatePolishedText = (form: typeof polishForm) => {
    const original = form.originalText;
    return `【润色后】

${original}

---

【优化建议】
1. 增加情绪张力：在关键台词处加入停顿和语气变化
2. 强化冲突感：通过对比和反差突出人物立场
3. 口语化处理：让台词更贴近生活，增强代入感

【示例优化】
原句："你为什么要这样做？"
优化："你...你怎么能这样对我？！（颤抖）我把你当亲姐妹，你却在背后捅我刀子？！"

【节奏建议】
- 每句台词控制在15字以内，便于演员演绎
- 关键台词单独成段，突出重点
- 适当留白，给观众思考空间`;
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 顶部栏 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[#134E4A]">AI辅助创作</h1>
          <p className="text-sm text-slate-500">智能生成大纲、脚本、台词，让创作更高效</p>
        </div>
        <Badge variant="secondary" className="text-sm bg-[#0D9488]/10 text-[#0D9488]">
          <Sparkles className="w-4 h-4 mr-1" />
          AI 驱动
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            大纲生成
          </TabsTrigger>
          <TabsTrigger value="script">
            <FileText className="w-4 h-4 mr-2" />
            分集脚本
          </TabsTrigger>
          <TabsTrigger value="polish">
            <Wand2 className="w-4 h-4 mr-2" />
            台词润色
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Lightbulb className="w-4 h-4 mr-2" />
            爆款模板
          </TabsTrigger>
        </TabsList>

        {/* 大纲生成 */}
        <TabsContent value="outline" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>故事大纲生成</CardTitle>
                <CardDescription>输入故事核心要素，AI自动生成完整大纲</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>题材类型</Label>
                  <Select
                    value={outlineForm.genre}
                    onValueChange={(value) => setOutlineForm({ ...outlineForm, genre: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择题材" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="都市">都市言情</SelectItem>
                      <SelectItem value="古装">古装穿越</SelectItem>
                      <SelectItem value="重生">重生复仇</SelectItem>
                      <SelectItem value="甜宠">甜宠恋爱</SelectItem>
                      <SelectItem value="悬疑">悬疑推理</SelectItem>
                      <SelectItem value="战神">战神归来</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>故事主题</Label>
                  <Input
                    placeholder="例如：重生后我成了总裁的白月光"
                    value={outlineForm.theme}
                    onChange={(e) => setOutlineForm({ ...outlineForm, theme: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>集数</Label>
                    <Select
                      value={outlineForm.episodes}
                      onValueChange={(value) => setOutlineForm({ ...outlineForm, episodes: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60集</SelectItem>
                        <SelectItem value="80">80集</SelectItem>
                        <SelectItem value="100">100集</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>风格</Label>
                    <Select
                      value={outlineForm.style}
                      onValueChange={(value) => setOutlineForm({ ...outlineForm, style: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="爽文">爽文</SelectItem>
                        <SelectItem value="虐文">虐文</SelectItem>
                        <SelectItem value="甜文">甜文</SelectItem>
                        <SelectItem value="悬疑">悬疑</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>目标受众</Label>
                  <Input
                    placeholder="例如：18-35岁女性"
                    value={outlineForm.targetAudience}
                    onChange={(e) => setOutlineForm({ ...outlineForm, targetAudience: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>核心元素（选填）</Label>
                  <Textarea
                    placeholder="输入关键词，如：复仇、甜宠、商战、豪门..."
                    value={outlineForm.keyElements}
                    onChange={(e) => setOutlineForm({ ...outlineForm, keyElements: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={generateOutline}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      生成大纲
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>生成结果</CardTitle>
                  <CardDescription>AI生成的故事大纲</CardDescription>
                </div>
                {generatedContent && (
                  <Button variant="outline" size="sm" onClick={copyContent}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full">
                  {generatedContent ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                      {generatedContent}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                      <p>在左侧输入信息，点击生成</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 分集脚本 */}
        <TabsContent value="script" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>分集脚本生成</CardTitle>
                <CardDescription>基于大纲生成详细分集脚本</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>故事大纲</Label>
                  <Textarea
                    placeholder="粘贴故事大纲..."
                    className="h-40"
                    value={scriptForm.outline}
                    onChange={(e) => setScriptForm({ ...scriptForm, outline: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>生成集数范围</Label>
                  <Select
                    value={scriptForm.episodeRange}
                    onValueChange={(value) => setScriptForm({ ...scriptForm, episodeRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">第1-10集（第一卡点）</SelectItem>
                      <SelectItem value="11-30">第11-30集（第二卡点）</SelectItem>
                      <SelectItem value="31-60">第31-60集（第三卡点）</SelectItem>
                      <SelectItem value="61-80">第61-80集（结局篇）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>卡点风格</Label>
                  <Select
                    value={scriptForm.cliffhangerStyle}
                    onValueChange={(value) => setScriptForm({ ...scriptForm, cliffhangerStyle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="悬念型">悬念型</SelectItem>
                      <SelectItem value="冲突型">冲突型</SelectItem>
                      <SelectItem value="情感型">情感型</SelectItem>
                      <SelectItem value="反转型">反转型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>重点场景（选填）</Label>
                  <Textarea
                    placeholder="描述需要重点刻画的场景..."
                    value={scriptForm.focusPoints}
                    onChange={(e) => setScriptForm({ ...scriptForm, focusPoints: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={generateScript}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      生成分集脚本
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>生成结果</CardTitle>
                  <CardDescription>AI生成的分集脚本</CardDescription>
                </div>
                {generatedContent && (
                  <Button variant="outline" size="sm" onClick={copyContent}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full">
                  {generatedContent ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                      {generatedContent}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <FileText className="w-12 h-12 mb-4 opacity-50" />
                      <p>在左侧输入大纲，点击生成</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 台词润色 */}
        <TabsContent value="polish" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>台词润色</CardTitle>
                <CardDescription>优化台词表达，增强戏剧张力</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>原始文本</Label>
                  <Textarea
                    placeholder="粘贴需要润色的台词或场景描述..."
                    className="h-48"
                    value={polishForm.originalText}
                    onChange={(e) => setPolishForm({ ...polishForm, originalText: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>语言风格</Label>
                    <Select
                      value={polishForm.style}
                      onValueChange={(value) => setPolishForm({ ...polishForm, style: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="口语化">口语化</SelectItem>
                        <SelectItem value="文艺">文艺</SelectItem>
                        <SelectItem value="古风">古风</SelectItem>
                        <SelectItem value="霸道">霸道总裁风</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>情绪强度</Label>
                    <Select
                      value={polishForm.emotion}
                      onValueChange={(value) => setPolishForm({ ...polishForm, emotion: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="强烈">强烈</SelectItem>
                        <SelectItem value="温和">温和</SelectItem>
                        <SelectItem value="压抑">压抑</SelectItem>
                        <SelectItem value="欢快">欢快</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>优化目标</Label>
                  <Select
                    value={polishForm.target}
                    onValueChange={(value) => setPolishForm({ ...polishForm, target: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="冲突感">增强冲突感</SelectItem>
                      <SelectItem value="甜宠感">增强甜宠感</SelectItem>
                      <SelectItem value="虐心感">增强虐心感</SelectItem>
                      <SelectItem value="爽感">增强爽感</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  onClick={polishDialogue}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      润色中...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      开始润色
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>润色结果</CardTitle>
                  <CardDescription>优化后的台词及建议</CardDescription>
                </div>
                {generatedContent && (
                  <Button variant="outline" size="sm" onClick={copyContent}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full">
                  {generatedContent ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                      {generatedContent}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Wand2 className="w-12 h-12 mb-4 opacity-50" />
                      <p>在左侧输入文本，点击润色</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 爆款模板 */}
        <TabsContent value="templates">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>爆款剧本模板</CardTitle>
                <CardDescription>精选热门题材模板，快速启动创作</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{template.category}</Badge>
                          {template.hot && (
                            <Badge className="bg-red-500 hover:bg-red-600">
                              HOT
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setOutlineForm({ ...outlineForm, theme: template.title });
                            setActiveTab('outline');
                            toast.success(`已选择模板：${template.title}`);
                          }}
                        >
                          使用模板
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>付费卡点设计指南</CardTitle>
                <CardDescription>短剧付费卡点设计技巧与案例分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">第一卡点（8-12集）</h4>
                    <p className="text-sm text-slate-600">建立核心冲突，引发观众好奇心</p>
                    <ul className="text-sm text-slate-500 mt-2 space-y-1">
                      <li>• 主角遭遇重大变故</li>
                      <li>• 身份/真相即将揭晓</li>
                      <li>• 男女主初次相遇</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">第二卡点（26-30集）</h4>
                    <p className="text-sm text-slate-600">冲突升级，情感深化</p>
                    <ul className="text-sm text-slate-500 mt-2 space-y-1">
                      <li>• 反派设局陷害主角</li>
                      <li>• 感情遭遇重大考验</li>
                      <li>• 隐藏身份曝光</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">第三卡点（60集）</h4>
                    <p className="text-sm text-slate-600">高潮迭起，真相大白</p>
                    <ul className="text-sm text-slate-500 mt-2 space-y-1">
                      <li>• 终极对决一触即发</li>
                      <li>• 误会解开重归于好</li>
                      <li>• 最终BOSS现身</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
