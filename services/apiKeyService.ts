// services/ApiKeyService.ts(或文件所在的任何位置)

班级 ApiKeyService {
    私人的 userApiKey: 线 | 空 = 空;
    私人的 只读的 hasEnvKey: 布尔型;

    构造器() {
        //修改1:使用Vite的语法访问环境变量。
        //变量名必须以“VITE_”开头。
        常数 envKey = 进口.自指的.包封/包围（动词envelop的简写）.VITE _双子座_API_KEY;
        
        这.hasEnvKey = !!envKey && envKey.长度 > 0;
        
        //这部分逻辑保持不变。如果没有找到环境密钥，
        //它退回到检查localStorage。
        如果 (!这.hasEnvKey) {
            尝试 {
                这.userApiKey = 本地存储.getItem(' gemini_api_key ');
            } 捕捉 (e) {
                安慰.警告(无法访问localStorage。将不保留API密钥。);
                这.userApiKey = 空;
            }
        }
    }

    公众的 哈斯基(): 布尔型 {
        返回 这.hasEnvKey || !!这.userApiKey;
    }

    公众的 isEnvKey(): 布尔型 {
        返回 这.hasEnvKey;
    }

    公众的 getApiKey(): 线 | 不明确的 {
        如果 (这.hasEnvKey) {
            //修改2:从Vite的环境变量中返回key。
            返回 进口.自指的.包封/包围（动词envelop的简写）.VITE _双子座_API_KEY;
        }
        //这种回退逻辑保持不变。
        返回 这.userApiKey || 不明确的;
    }

    公众的 setApiKey(键: 线): 空的 {
        //这个逻辑很完美，不需要改动。它正确地
        //防止用户覆盖硬编码的环境密钥。
        如果 (!这.hasEnvKey) {
            常数 微调键 = 键.整齐();
            这.userApiKey = 微调键;
            尝试 {
                如果 (微调键) {
                    本地存储.设置项目(' gemini_api_key ', 微调键);
                } 其他 {
                    本地存储.移除项目(' gemini_api_key ');
                }
            } 捕捉 (e) {
                 安慰.警告(无法访问localStorage。将不保留API密钥。);
            }
        }
    }
}

出口 常数 apiKeyService = 新的 ApiKeyService();
