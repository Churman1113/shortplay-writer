import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FileCheck, 
  Scale, 
  Clock, 
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  FileText,
  Lock,
  History,
  ChevronRight,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Certificate {
  id: string;
  workTitle: string;
  certificateNo: string;
  issueDate: string;
  status: 'valid' | 'expired';
  blockchainHash: string;
}

interface ContractTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  downloadCount: number;
}

const certificates: Certificate[] = [
  {
    id: '1',
    workTitle: '《豪门千金归来》',
    certificateNo: 'SP-2026-001234',
    issueDate: '2026-03-20',
    status: 'valid',
    blockchainHash: '0x7a3f...8e9d'
  },
  {
    id: '2',
    workTitle: '《战神归来》',
    certificateNo: 'SP-2026-001235',
    issueDate: '2026-03-15',
    status: 'valid',
    blockchainHash: '0x9b2c...4f1a'
  }
];

const contractTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: '短剧剧本委托创作合同',
    category: '委托创作',
    description: '适用于委托编剧创作短剧剧本的标准合同模板',
    downloadCount: 2341
  },
  {
    id: '2',
    name: '短剧剧本版权转让合同',
    category: '版权转让',
    description: '适用于剧本版权转让交易的合同模板',
    downloadCount: 1856
  },
  {
    id: '3',
    name: '短剧编剧合作协议',
    category: '合作创作',
    description: '适用于多位编剧合作创作的合作协议模板',
    downloadCount: 1234
  },
  {
    id: '4',
    name: '短剧剧本授权使用合同',
    category: '授权使用',
    description: '适用于剧本授权平台使用的合同模板',
    downloadCount: 987
  },
  {
    id: '5',
    name: '短剧改编权许可合同',
    category: '改编授权',
    description: '适用于小说/网文改编短剧的授权合同模板',
    downloadCount: 756
  }
];

export default function Copyright() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('certificates');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

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
          <h1 className="text-xl font-bold text-[#134E4A]">版权保护</h1>
          <p className="text-sm text-slate-500">区块链存证、合同模板、版权维权一站式服务</p>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-900">版权保护提醒</AlertTitle>
        <AlertDescription className="text-amber-800">
          建议每完成10集内容即进行区块链存证，确保证据链完整。已存证作品在维权时可作为有效司法证据。
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">已存证作品</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">存证次数</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">合同模板</p>
                <p className="text-3xl font-bold text-violet-600 mt-1">15</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">维权案例</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">0</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="certificates">存证证书</TabsTrigger>
          <TabsTrigger value="templates">合同模板</TabsTrigger>
          <TabsTrigger value="protection">维权指南</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          {/* Upload Section */}
          <Card className="border-dashed border-2 border-violet-200 bg-violet-50/50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">作品区块链存证</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  上传作品文件，系统将自动生成区块链存证证书，具有司法效力
                </p>
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">
                      <Upload className="w-4 h-4 mr-2" />
                      立即存证
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>作品存证</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600 mb-2">拖拽文件到此处，或点击选择文件</p>
                        <p className="text-sm text-slate-400">支持 PDF、DOC、DOCX 格式，最大 50MB</p>
                        <Button variant="outline" className="mt-4">选择文件</Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">作品名称</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-lg"
                          placeholder="输入作品名称"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">作品类型</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>短剧剧本</option>
                          <option>剧本大纲</option>
                          <option>人物小传</option>
                          <option>其他</option>
                        </select>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Shield className="w-5 h-5 text-violet-600 mt-0.5" />
                          <div className="text-sm text-slate-600">
                            <p className="font-medium">存证说明</p>
                            <p className="mt-1">存证将消耗 1 次存证次数，生成具有司法效力的区块链存证证书。</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600">
                        确认存证
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Certificates List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{cert.workTitle}</CardTitle>
                        <p className="text-sm text-slate-500">{cert.certificateNo}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">有效</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">存证时间</p>
                      <p className="font-medium">{cert.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">区块链哈希</p>
                      <p className="font-medium font-mono">{cert.blockchainHash}</p>
                    </div>
                  </div>
                  <div className="pt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      下载证书
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      验证
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{template.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Download className="w-4 h-4" />
                      {template.downloadCount} 次下载
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600">
                      <Download className="w-4 h-4 mr-2" />
                      下载模板
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Contract */}
          <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                    <Scale className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">需要定制化合同？</h3>
                    <p className="text-sm text-slate-600">平台提供专业法律顾问服务，为您量身定制合同</p>
                  </div>
                </div>
                <Button variant="outline" className="border-violet-300">
                  联系顾问
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  常见侵权场景
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-red-600 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">骗稿行为</p>
                      <p className="text-sm text-slate-600">平台或中介以试稿为名，骗取剧本内容后拒绝支付稿费</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-red-600 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">合同陷阱</p>
                      <p className="text-sm text-slate-600">合同中隐藏不平等条款，如"版权归平台所有"等霸王条款</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-red-600 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">拖欠稿费</p>
                      <p className="text-sm text-slate-600">剧本通过后以各种理由拖延或拒绝支付稿费</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-red-600 font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">盗用创意</p>
                      <p className="text-sm text-slate-600">剧本被拒后，平台使用相似创意自行创作</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  预防措施
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">及时存证</p>
                      <p className="text-sm text-slate-600">每完成阶段性创作立即进行区块链存证</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">使用标准合同</p>
                      <p className="text-sm text-slate-600">使用平台提供的标准合同模板，避免霸王条款</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">保留证据</p>
                      <p className="text-sm text-slate-600">保存所有沟通记录、邮件、聊天记录等</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">分期交付</p>
                      <p className="text-sm text-slate-600">采用分期付款方式，降低一次性被骗风险</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>维权流程</CardTitle>
              <CardDescription>如遇侵权，可通过以下途径维护自身权益</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {[
                  { step: 1, title: '收集证据', desc: '存证证书、合同、沟通记录' },
                  { step: 2, title: '联系平台', desc: '通过平台投诉渠道维权' },
                  { step: 3, title: '法律咨询', desc: '获取专业法律建议' },
                  { step: 4, title: '司法诉讼', desc: '必要时提起诉讼' }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                        {item.step}
                      </div>
                      <p className="font-medium mt-2">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    {index < 3 && (
                      <ChevronRight className="w-6 h-6 text-slate-300 mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
