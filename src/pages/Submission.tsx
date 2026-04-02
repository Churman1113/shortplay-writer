import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wand2, 
  FileText, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Building2,
  Download,
  Eye,
  FileDown,
  Scissors,
  User,
  BookOpen,
  Sparkles,
  Clipboard,
  ChevronRight,
  BookMarked,
  GraduationCap,
  Target,
  Send,
  Mail,
  FileCheck,
  MessageCircle,
  Shield,
  Star,
  ArrowRight,
  Target as TargetIcon,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import SubmissionProgress from '@/components/SubmissionProgress';
import { platforms, mockScript, type Platform } from '@/data/submissionData';

export default function Submission() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assistant');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // 投稿助手生成的内容
  const [generatedContent, setGeneratedContent] = useState({
    firstEpisodes: '',  // 前10集内容
    synopsis: '',       // 剧本大纲
    characterProfiles: '' // 人物小传
  });
  const [showProgressGuide, setShowProgressGuide] = useState(false);

  // 模拟生成投稿材料
  const generateSubmissionMaterials = () => {
    // 模拟生成前10集内容
    const firstEpisodesText = `
【剧本名称】${mockScript.title}
【题材类型】${mockScript.genre}
【集数】${mockScript.totalEpisodes}集（完本）
【已完稿】${mockScript.completedEpisodes}集

=== 前10集内容（已完稿）===

【第1集 重生归来】
场景：医院病房 日内

【画面】林若雪躺在病床上，浑身插满管子，她猛地睁开眼睛，大口喘着粗气。

林若雪（震惊）：我...我没死？这是哪里？

【画面】病房里弥漫着消毒水的味道，窗外阳光明媚。林若雪看向床头柜上的日历，眼眶逐渐泛红。

林若雪（喃喃自语）：2019年3月15日...我回到了五年前！

【闪回】
（前世记忆：林若雪被苏婉儿陷害，名誉扫地，最终被林家赶出家门，在一场车祸中惨死）

【画面】林若雪握紧拳头，眼中没有泪水，只有冰冷的恨意。

林若雪（内心OS）：苏婉儿，顾铭，这一世，我不会再让你们得逞！

【画面】她拔掉手背上的针头，挣扎着想要下床。

林若雪（坚定）：既然老天让我重来一次，我就一定要改写命运！

【第一集完】

【第2集 医院对峙】
场景：医院走廊 日内

...（此处省略后续内容，实际投稿时应填入完整剧本内容）

【说明】完整前10集内容约12000字，已完稿可立即提供。
`.trim();

    // 剧本大纲
    const synopsisText = `
【剧本大纲】

一、故事背景
现代都市，讲述了女主林若雪意外重生回到五年前，在得知前世悲剧真相后，决定改写命运、复仇虐渣、收获真爱的故事。

二、主要人物
1. 林若雪（女主）：林家大小姐，聪明果敢，重生后展现出超强的商业头脑和决策能力
2. 顾景琛（男主）：顾氏集团总裁，外表冷酷内心温柔，是女主生命中的贵人
3. 苏婉儿（女配）：女主前世的闺蜜，表面温柔实则心机深沉
4. 顾铭（男配）：苏婉儿的男友，与苏婉儿联手害死女主

三、故事主线
第一阶段（第1-15集）：重生觉醒
女主重生后快速适应新身份，收集证据，为后续复仇做准备

第二阶段（第16-35集）：初露锋芒
女主进入林氏集团工作，展现商业才能，同时逐步揭露苏婉儿的真面目

第三阶段（第36-60集）：复仇反击
女主全面反击，揭露苏婉儿和顾铭的罪行，让敌人自食恶果

第四阶段（第61-80集）：收获幸福
女主事业爱情双丰收，与男主携手共创美好未来

四、剧情亮点
1. 重生复仇元素，满足观众"爽感"需求
2. 商战+甜宠双线并行
3. 女主智商在线，不降智
4. 男主人设：外冷内热，暗中守护，甜而不腻
5. 付费点设置：第10集（第一卡点）、第30集（第二卡点）、第60集（第三卡点）

五、市场定位
目标受众：18-35岁女性
题材类型：都市重生+复仇+甜宠
对标作品：《顶流闪婚后》《重生娇妻是大佬》
预估爆款率：75%
`.trim();

    // 人物小传
    const characterProfilesText = `
【人物小传】

【女主：林若雪】
姓名：林若雪
年龄：25岁
身份：林氏集团大小姐（重生后）
性格特点：聪明果敢、冷静理智、重情重义
人物弧光：从天真善良到看透人心，从被动挨打到主动反击
核心标签：#重生 #复仇 #独立女性 #商业天才
人物小传：
前世，林若雪是林家唯一的继承人，却因为太过信任闺蜜苏婉儿和男友顾铭，最终被他们联手陷害，名誉尽毁，赶出家门，最终惨死街头。

重生后，林若雪保留了前世的记忆和商业知识。她快速适应新身份，一方面暗中收集证据为复仇做准备，另一方面凭借前世的记忆在商场上叱咤风云。她不再是那个天真的大小姐，而是冷静睿智的女强人。

在感情线上，她与顾氏集团总裁顾景琛从相互试探到真心相爱，最终携手一生。

【男主：顾景琛】
姓名：顾景琛
年龄：28岁
身份：顾氏集团总裁
性格特点：外冷内热、霸道温柔、深情专一
人物弧光：从对女主的误解到深深爱上她
核心标签：#霸道总裁 #深情 #宠妻狂魔 #商业精英
人物小传：
顾景琛是A市最年轻的商业巨擘，外表冷酷，不近女色，实则内心渴望真爱。

在一次商业活动中，他意外结识了林若雪。起初，他以为林若雪和其他女人一样接近他是为了利益，但逐渐发现她与其他女人不同。

他开始暗中关注她、保护她，在她最困难的时候伸出援手。当他知道林若雪的复仇计划后，不仅没有阻止，反而成为了她最坚实的后盾。

【女配：苏婉儿】
姓名：苏婉儿
年龄：24岁
身份：林若雪的"闺蜜"（前世）
性格特点：表面温柔善良，实则阴险狡诈、贪婪自私
人物弧光：从伪装到最后被揭穿真面目
核心标签：#心机女 #绿茶 #白莲花
人物小传：
苏婉儿是林若雪大学时期的闺蜜，外表温柔可人，实际上是一个心机深沉的女人。

她一直嫉妒林若雪的家世和才华，暗中与林若雪的男友顾铭勾结，设计陷害林若雪，最终导致林若雪惨死。

重生后，林若雪揭穿了她的真面目，让她的阴谋全部落空。

【男配：顾铭】
姓名：顾铭
年龄：27岁
身份：顾家旁系子弟
性格特点：贪婪虚伪、忘恩负义
人物弧光：从伪君子到身败名裂
核心标签：#渣男 #伪君子 #炮灰
人物小传：
顾铭是顾家旁系子弟，靠着花言巧语骗取了林若雪的信任和感情。

实际上，他早就和苏婉儿暗通款曲，两人联手设计陷害林若雪，想要吞并林家的财产。

最终，他们的阴谋被林若雪和顾景琛联手揭穿，顾铭身败名裂，被顾家除名。
`.trim();

    setGeneratedContent({
      firstEpisodes: firstEpisodesText,
      synopsis: synopsisText,
      characterProfiles: characterProfilesText
    });

    toast.success('投稿材料已生成！');
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success('已复制到剪贴板');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 导出完整投稿包
  const exportSubmissionPack = () => {
    const fullContent = `
═══════════════════════════════════════════════════════
                    ${mockScript.title} 投稿材料包
═══════════════════════════════════════════════════════

【平台要求】前10集+大纲+人物小传
【生成时间】${new Date().toLocaleDateString('zh-CN')}

═══════════════════════════════════════════════════════
                         第一部分：前10集内容
═══════════════════════════════════════════════════════

${generatedContent.firstEpisodes}

═══════════════════════════════════════════════════════
                         第二部分：剧本大纲
═══════════════════════════════════════════════════════

${generatedContent.synopsis}

═══════════════════════════════════════════════════════
                         第三部分：人物小传
═══════════════════════════════════════════════════════

${generatedContent.characterProfiles}

═══════════════════════════════════════════════════════
                           投稿联系信息
═══════════════════════════════════════════════════════

联系邮箱：author@example.com
微信/QQ：author_12345
联系时间：周一至周五 9:00-18:00

感谢您的审阅！
    `.trim();

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mockScript.title}_投稿材料包_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('投稿材料包已下载');
  };

  // 获取平台状态徽章
  const getPlatformStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500">开放收稿</Badge>;
      case 'limited':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">限量收稿</Badge>;
      case 'closed':
        return <Badge variant="secondary">暂停收稿</Badge>;
      default:
        return null;
    }
  };

  // 计算剧本与平台的匹配度
  const calculateMatchScore = (platform: Platform) => {
    const genre = mockScript.genre;
    let score = 60; // 基础分
    
    if (platform.preferredGenres.some(g => mockScript.genre.includes(g) || g.includes(mockScript.genre))) {
      score += 30;
    }
    
    if (platform.status === 'open') {
      score += 10;
    } else if (platform.status === 'limited') {
      score += 5;
    }
    
    return Math.min(score, 100);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* 顶部栏 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1">
          <ChevronRight className="w-4 h-4 rotate-180" />
          返回
        </Button>
        <div className="h-5 w-px bg-slate-200" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#134E4A]">投稿助手</h1>
          <p className="text-sm text-slate-500">智能生成投稿材料包，一键复制/导出</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowProgressGuide(true)}
          className="border-[#14B8A6] text-[#14B8A6] flex-shrink-0"
        >
          <TargetIcon className="w-4 h-4 mr-2" />
          投稿全流程
        </Button>
      </div>

      {/* 简介卡片 */}
      <Card className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-0">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">智能投稿助手</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                根据您的剧本内容，自动生成符合各大平台要求的投稿材料包（前10集+大纲+人物小传）。
                选择目标平台，一键复制或导出，让投稿更高效！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 剧本信息预览 */}
      <Card className="border-violet-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
            <BookOpen className="w-4 h-4" />
            当前剧本信息
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">剧本名称</div>
              <div className="font-medium text-slate-900 text-sm truncate">{mockScript.title}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">题材类型</div>
              <div className="font-medium text-slate-900 text-sm">{mockScript.genre}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">总集数</div>
              <div className="font-medium text-slate-900 text-sm">{mockScript.totalEpisodes}集</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">已完稿</div>
              <div className="font-medium text-green-600 text-sm">{mockScript.completedEpisodes}集</div>
            </div>
          </div>
          <div className="mt-3 bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">故事简介</div>
            <div className="text-sm text-slate-700">{mockScript.synopsis}</div>
          </div>
        </CardContent>
      </Card>

      {/* 主内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] h-auto p-1">
          <TabsTrigger value="assistant" className="text-sm py-2">投稿助手</TabsTrigger>
          <TabsTrigger value="platforms" className="text-sm py-2">平台列表</TabsTrigger>
          <TabsTrigger value="history" className="text-sm py-2">历史记录</TabsTrigger>
          <TabsTrigger value="tutorial" className="text-sm py-2">投稿教程</TabsTrigger>
        </TabsList>

        {/*  投稿助手 */}
        <TabsContent value="assistant" className="space-y-5">
          {/* 生成按钮 */}
          <Card className="border-dashed border-2 border-violet-300 bg-violet-50/50">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-violet-500" />
              <h3 className="text-base font-bold text-slate-900 mb-2">一键生成投稿材料</h3>
              <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                根据剧本内容，自动生成符合各大平台标准的前10集、大纲和人物小传
              </p>
              <Button 
                onClick={generateSubmissionMaterials}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                size="lg"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                生成投稿材料
              </Button>
            </CardContent>
          </Card>

          {/* 生成的材料 */}
          {generatedContent.firstEpisodes && (
            <>
              {/* 材料概览 */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scissors className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm">前10集内容</div>
                        <div className="text-xs text-slate-500">约 12,000 字</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm">剧本大纲</div>
                        <div className="text-xs text-slate-500">完整四阶段结构</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 bg-purple-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm">人物小传</div>
                        <div className="text-xs text-slate-500">4个主要角色</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 材料详情 */}
              <div className="grid lg:grid-cols-3 gap-5">
                {/* 前10集 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                      <Scissors className="w-4 h-4" />
                      前10集内容
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      value={generatedContent.firstEpisodes}
                      readOnly
                      className="h-44 text-xs font-mono bg-slate-50 resize-none"
                    />
                    <Button 
                      className="w-full mt-3"
                      variant={copiedSection === 'episodes' ? 'secondary' : 'default'}
                      onClick={() => copyToClipboard(generatedContent.firstEpisodes, 'episodes')}
                    >
                      {copiedSection === 'episodes' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          复制前10集
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* 大纲 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" />
                      剧本大纲
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      value={generatedContent.synopsis}
                      readOnly
                      className="h-44 text-xs font-mono bg-slate-50 resize-none"
                    />
                    <Button 
                      className="w-full mt-3"
                      variant={copiedSection === 'synopsis' ? 'secondary' : 'default'}
                      onClick={() => copyToClipboard(generatedContent.synopsis, 'synopsis')}
                    >
                      {copiedSection === 'synopsis' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          复制大纲
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* 人物小传 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      人物小传
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      value={generatedContent.characterProfiles}
                      readOnly
                      className="h-44 text-xs font-mono bg-slate-50 resize-none"
                    />
                    <Button 
                      className="w-full mt-3"
                      variant={copiedSection === 'characters' ? 'secondary' : 'default'}
                      onClick={() => copyToClipboard(generatedContent.characterProfiles, 'characters')}
                    >
                      {copiedSection === 'characters' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          复制人物小传
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 一键导出 */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileDown className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-900 text-sm">导出完整投稿包</h3>
                        <p className="text-xs text-amber-700">包含前10集+大纲+人物小传</p>
                      </div>
                    </div>
                    <Button 
                      onClick={exportSubmissionPack}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 flex-shrink-0"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载投稿包
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* 平台列表 */}
        <TabsContent value="platforms" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((platform) => {
              const matchScore = calculateMatchScore(platform);
              return (
                <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {platform.logo}
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-base">{platform.name}</CardTitle>
                          <p className="text-xs text-slate-500 mt-0.5">{platform.priceRange}</p>
                        </div>
                      </div>
                      {getPlatformStatusBadge(platform.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {/* 匹配度 */}
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-600">题材匹配度</span>
                        <span className={`font-bold text-sm ${matchScore >= 80 ? 'text-green-600' : matchScore >= 60 ? 'text-yellow-600' : 'text-slate-600'}`}>
                          {matchScore}%
                        </span>
                      </div>
                      <Progress value={matchScore} className="h-1.5" />
                    </div>

                    {/* 收稿要求 */}
                    <div className="bg-violet-50 rounded-lg p-2.5 border border-violet-100">
                      <p className="text-xs font-medium text-violet-700 mb-1">收稿要求</p>
                      <p className="text-xs text-violet-600">{platform.requirements}</p>
                      {platform.minEpisodes && (
                        <p className="text-xs text-violet-500 mt-1">最低{platform.minEpisodes}集起投，完稿{platform.maxEpisodes}集内</p>
                      )}
                    </div>

                    {/* 价格与响应 */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {platform.responseTime}
                      </div>
                      <Badge variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50">
                        {platform.priceRange}
                      </Badge>
                    </div>

                    {/* 收稿题材 */}
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1.5">优先题材</p>
                      <div className="flex flex-wrap gap-1.5">
                        {platform.preferredGenres.map((genre, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className={`text-xs px-1.5 py-0.5 ${
                              mockScript.genre.includes(genre) ? 'bg-green-100 text-green-700' : ''
                            }`}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* 投稿格式提示 */}
                    {platform.submissionFormat && (
                      <div className="text-xs text-slate-500 bg-slate-50 rounded p-2">
                        <span className="font-medium">投稿格式：</span>{platform.submissionFormat}
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="pt-2 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedPlatform(platform)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        详情
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        disabled={platform.status === 'closed'}
                        onClick={() => {
                          // 先生成材料
                          if (!generatedContent.firstEpisodes) {
                            generateSubmissionMaterials();
                          }
                          // 复制材料到剪贴板
                          copyToClipboard(generatedContent.firstEpisodes + '\n\n' + generatedContent.synopsis + '\n\n' + generatedContent.characterProfiles, 'all');
                          toast.success(`已将${platform.name}的投稿材料复制到剪贴板`);
                          // 跳转到平台官网
                          if (platform.url) {
                            window.open(platform.url, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <Clipboard className="w-3.5 h-3.5 mr-1.5" />
                        快速投稿
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* 历史记录 */}
        <TabsContent value="history" className="space-y-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">历史投稿记录</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center py-10 text-slate-500">
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>暂无投稿记录</p>
                <p className="text-xs mt-1">使用投稿助手生成材料后，将自动记录在此</p>
              </div>
            </CardContent>
          </Card>

          {/* 投稿技巧 */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 text-sm">投稿技巧</h3>
                  <ul className="mt-2 space-y-1 text-xs text-amber-800">
                    <li>• 前3集必须设置强钩子，吸引编辑继续阅读</li>
                    <li>• 卡点设置要合理，卡一在第8-12集效果最佳</li>
                    <li>• 人物小传要突出主角的"爽点"和"痛点"</li>
                    <li>• 不同平台偏好不同题材，投稿前请查看平台收稿偏好</li>
                    <li>• 建议使用"快速投稿"功能，直接复制材料到平台</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 投稿教程 */}
        <TabsContent value="tutorial" className="space-y-5">
          {/* 教程概览 */}
          <Card className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-1">短剧投稿入门教程</h2>
                  <p className="text-white/80 text-sm">从零开始，手把手教你如何成功投稿短剧平台</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 投稿流程步骤 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
                <ArrowRight className="w-4 h-4" />
                投稿流程
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-5 gap-3">
                <div className="text-center p-3 bg-slate-50 rounded-lg relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <FileText className="w-6 h-6 mx-auto mb-1.5 text-teal-600" />
                  <h4 className="font-medium text-xs">完成剧本</h4>
                  <p className="text-xs text-slate-500 mt-0.5">至少前10集</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <Wand2 className="w-6 h-6 mx-auto mb-1.5 text-teal-600" />
                  <h4 className="font-medium text-xs">生成材料</h4>
                  <p className="text-xs text-slate-500 mt-0.5">投稿助手</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <Clipboard className="w-6 h-6 mx-auto mb-1.5 text-teal-600" />
                  <h4 className="font-medium text-xs">复制导出</h4>
                  <p className="text-xs text-slate-500 mt-0.5">下载投稿包</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <Send className="w-6 h-6 mx-auto mb-1.5 text-teal-600" />
                  <h4 className="font-medium text-xs">联系平台</h4>
                  <p className="text-xs text-slate-500 mt-0.5">邮件/微信</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <FileCheck className="w-6 h-6 mx-auto mb-1.5 text-teal-600" />
                  <h4 className="font-medium text-xs">等待审核</h4>
                  <p className="text-xs text-slate-500 mt-0.5">3-7个工作日</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 详细教程内容 */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* 第一步：完成剧本 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  第一步：完成剧本创作
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <h4 className="font-medium text-xs text-slate-900 mb-1.5">基本要求</h4>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li>• 大部分平台要求前10集+大纲+人物小传</li>
                    <li>• 部分平台（如麦芽传媒）要求前15集</li>
                    <li>• 天桥短剧要求完整剧本</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-xs text-blue-900 mb-1.5 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    集数标准
                  </h4>
                  <ul className="text-xs text-blue-800 space-y-0.5">
                    <li>• 单集时长：2-3分钟 | 字数：500-1000字</li>
                    <li>• 标准短剧：80-100集 | 完整剧本：80-200集</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 第二步：准备投稿材料 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  第二步：准备投稿材料
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <h4 className="font-medium text-xs text-slate-900 mb-1.5">必备材料</h4>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li>• <strong>前10-15集正文</strong>：完整的已写集数</li>
                    <li>• <strong>剧本大纲</strong>：完整的故事线和四阶段结构</li>
                    <li>• <strong>人物小传</strong>：主角、配角的人物设定</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-xs text-purple-900 mb-1.5">使用投稿助手</h4>
                  <ul className="text-xs text-purple-800 space-y-0.5">
                    <li>• 点击"生成投稿材料"自动生成</li>
                    <li>• 支持一键复制/导出</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 第三步：选择平台 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  第三步：选择投稿平台
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <h4 className="font-medium text-xs text-slate-900 mb-1.5">选平台要点</h4>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li>• 查看平台<strong>优先收稿题材</strong></li>
                    <li>• 关注平台<strong>收稿状态</strong>（开放/限量）</li>
                    <li>• 了解<strong>价格区间</strong>和<strong>响应时间</strong></li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h4 className="font-medium text-xs text-amber-900 mb-1.5">题材匹配建议</h4>
                  <ul className="text-xs text-amber-800 space-y-0.5">
                    <li>• 都市重生/甜宠 → 九州文化、映宇宙</li>
                    <li>• 战神/赘婿 → 点众科技、天桥短剧</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 第四步：提交投稿 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#134E4A] flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                    <Send className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  第四步：提交投稿
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <h4 className="font-medium text-xs text-slate-900 mb-1.5">投稿方式</h4>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li>• <strong>邮箱投稿</strong>：官方公布收稿邮箱</li>
                    <li>• <strong>微信投稿</strong>：添加平台编辑微信</li>
                    <li>• <strong>后台直投</strong>：平台自有作者后台</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-xs text-green-900 mb-1.5">联系模板</h4>
                  <div className="text-xs text-green-800 bg-green-100 p-2 rounded font-mono leading-relaxed">
                    邮件主题：[投稿]剧本名称-题材类型<br/>
                    尊敬的编辑您好：我是短剧编剧XXX，向贵平台投稿...
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 黄金法则 */}
          <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
                <Star className="w-4 h-4 text-rose-500" />
                投稿黄金法则
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-600 mb-1.5 text-sm">开篇必杀技</h4>
                  <p className="text-xs text-slate-600">前3集必须设置<strong>强钩子</strong>，用冲突/悬念/反转快速抓住编辑注意力。</p>
                  <div className="mt-2 text-xs text-rose-500">推荐第1集出现"生死危机"或"身世揭秘"</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-600 mb-1.5 text-sm">卡点设置</h4>
                  <p className="text-xs text-slate-600">每20-30集设置<strong>付费卡点</strong>，用悬念让观众欲罢不能。</p>
                  <div className="mt-2 text-xs text-rose-500">第一卡点建议第10集</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-600 mb-1.5 text-sm">人设为王</h4>
                  <p className="text-xs text-slate-600">主角必须有<strong>爽点</strong>和<strong>痛点</strong>，让观众有代入感。</p>
                  <div className="mt-2 text-xs text-rose-500">建议加入"反差萌"和"成长弧光"</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 常见问题 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[#134E4A] flex items-center gap-2 text-base">
                <MessageCircle className="w-4 h-4" />
                常见问题解答
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-3 md:border-b-0 md:pb-0">
                  <h4 className="font-medium text-slate-900 mb-1.5 text-sm">Q: 没有回复怎么办？</h4>
                  <p className="text-xs text-slate-600">A: 建议3-5个工作日后可跟进一次。若长期无回复，可尝试其他平台。</p>
                </div>
                <div className="border-b pb-3 md:border-b-0 md:pb-0">
                  <h4 className="font-medium text-slate-900 mb-1.5 text-sm">Q: 被拒稿后可以修改再投吗？</h4>
                  <p className="text-xs text-slate-600">A: 可以。根据编辑反馈修改后，可尝试其他编辑或平台。</p>
                </div>
                <div className="border-b pb-3 md:border-b-0 md:pb-0">
                  <h4 className="font-medium text-slate-900 mb-1.5 text-sm">Q: 可以同时投多个平台吗？</h4>
                  <p className="text-xs text-slate-600">A: 建议逐个平台投递。一个平台明确拒绝后，再投下一个。</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1.5 text-sm">Q: 签约后还能修改剧本吗？</h4>
                  <p className="text-xs text-slate-600">A: 需要和平台协商。部分平台允许小幅修改，以合同约定为准。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 安全提示 */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900 mb-1 text-sm">安全提示</h4>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li>• 投稿前仔细核实平台真实性，避免遭遇诈骗</li>
                    <li>• 不要向任何平台支付"报名费""审核费"等费用</li>
                    <li>• 签约前务必认真阅读合同条款</li>
                    <li>• 重要作品可先进行版权登记</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 投稿进度指南弹窗 */}
      <SubmissionProgress isOpen={showProgressGuide} onClose={() => setShowProgressGuide(false)} />

      {/* 平台详情弹窗 */}
      <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {selectedPlatform?.logo}
              </div>
              <div>
                <span className="text-lg">{selectedPlatform?.name}</span>
                {getPlatformStatusBadge(selectedPlatform?.status || 'closed')}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 官网链接 */}
            {selectedPlatform?.url && (
              <Button 
                variant="outline" 
                className="w-full border-violet-200 text-violet-700 hover:bg-violet-50"
                onClick={() => window.open(selectedPlatform.url, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                访问官网
              </Button>
            )}
            
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <div className="text-xs text-emerald-600 mb-1">收稿价格</div>
                <div className="font-medium text-emerald-800 text-sm">{selectedPlatform?.priceRange}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-blue-600 mb-1">响应时间</div>
                <div className="font-medium text-blue-800 text-sm">{selectedPlatform?.responseTime}</div>
              </div>
            </div>

            {/* 投稿邮箱 */}
            {selectedPlatform?.submissionEmail && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-xs text-amber-700 mb-1 font-medium">投稿邮箱</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-amber-900">{selectedPlatform.submissionEmail}</code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPlatform.submissionEmail || '');
                      toast.success('邮箱已复制');
                    }}
                  >
                    复制
                  </Button>
                </div>
              </div>
            )}

            {/* 投稿政策 */}
            {selectedPlatform?.policy && (
              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-4 border border-violet-100">
                <div className="text-xs font-medium text-violet-700 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  投稿政策
                </div>
                <p className="text-sm text-violet-800">{selectedPlatform.policy}</p>
              </div>
            )}

            {/* 收稿要求 */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-xs font-medium text-slate-700 mb-2">收稿要求</div>
              <div className="text-sm text-slate-600">
                {selectedPlatform?.requirements}
              </div>
              {selectedPlatform?.minEpisodes && (
                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  <span>最低{selectedPlatform.minEpisodes}集起投</span>
                  <span>|</span>
                  <span>完稿{selectedPlatform.maxEpisodes}集内</span>
                </div>
              )}
            </div>

            {/* 投稿格式 */}
            {selectedPlatform?.submissionFormat && (
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-xs font-medium text-slate-700 mb-2">投稿格式</div>
                <p className="text-sm text-slate-600">{selectedPlatform.submissionFormat}</p>
              </div>
            )}

            {/* 收稿类型 */}
            {selectedPlatform?.acceptedTypes && selectedPlatform.acceptedTypes.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-700">接受类型：</span>
                <div className="flex gap-2">
                  {selectedPlatform.acceptedTypes.map((type, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 优先题材 */}
            <div>
              <div className="text-xs font-medium text-slate-700 mb-2">优先题材</div>
              <div className="flex flex-wrap gap-2">
                {selectedPlatform?.preferredGenres.map((genre, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className={`text-xs px-2 py-0.5 ${
                      mockScript.genre.includes(genre) ? 'bg-green-100 text-green-700 border-green-200' : ''
                    }`}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 注意事项 */}
            {selectedPlatform?.notes && selectedPlatform.notes.length > 0 && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  注意事项
                </div>
                <ul className="space-y-1">
                  {selectedPlatform.notes.map((note, idx) => (
                    <li key={idx} className="text-xs text-amber-800 flex items-start gap-1.5">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 快速投稿按钮 */}
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              disabled={selectedPlatform?.status === 'closed'}
              onClick={() => {
                if (!generatedContent.firstEpisodes) {
                  generateSubmissionMaterials();
                }
                copyToClipboard(generatedContent.firstEpisodes + '\n\n' + generatedContent.synopsis + '\n\n' + generatedContent.characterProfiles, 'all');
                toast.success(`已将${selectedPlatform?.name}的投稿材料复制到剪贴板`);
                if (selectedPlatform?.url) {
                  window.open(selectedPlatform.url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <Clipboard className="w-4 h-4 mr-2" />
              快速投稿（复制材料并跳转官网）
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
