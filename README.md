# Afrunk Studio - 项目展示平台

> 极简风格的团队项目展示站点

---

## 一、项目定位

 Afrunk Studio 团队的项目展示与售卖平台，用于展示团队做过的各类项目，让客户可以浏览、搜索、了解项目能力，并根据项目内容进行购买、咨询、部署复现。

**技术栈**：Flask + Jinja2 + TailwindCSS + 自定义 CSS

**端口**：5055

---

## 二、项目目录结构

```
TabaoDemo/
├── app.py                    # Flask 主程序
├── config.py                 # 配置文件
├── projects.json             # 项目数据
├── requirements.txt          # Python 依赖
├── README.md                 # 项目文档
│
├── static/
│   ├── css/
│   │   └── main.css         # 主样式
│   ├── js/
│   │   ├── main.js          # 主脚本
│   │   └── lightbox.js      # 灯箱组件
│   ├── images/
│   │   ├── brand-logo.png    # 品牌 Logo
│   │   ├── brand-avatar.png # 品牌头像
│   │   └── wechat-qr.jpg    # 微信二维码
│   ├── projects/            # 项目案例页面
│   │   └── customer-system.html
│   └── uploads/             # 上传文件目录（预留）
│
└── templates/
    ├── base.html             # 基础模板
    ├── front/
    │   ├── index.html        # 首页
    │   ├── projects.html     # 项目列表
    │   ├── 404.html         # 404 错误页
    │   └── 500.html         # 500 错误页
    ├── demo/
    │   ├── demos.json        # Demo 配置
    │   └── landing.html      # Demo 落地页
    └── admin/
        └── contact_section.html
```

---

## 三、路由设计

| 路由 | 说明 |
|------|------|
| `/` | 首页 |
| `/projects` | 项目列表 |
| `/demo/<demo_id>` | Demo 详情页 |

---

## 四、已实现功能

### 前端实现
- 毛玻璃浮动导航栏
- Hero 区域（粘性 + 滚动动画）
- 服务模块展示（数据采集、自动化、AI工作流）
- 解决方案分类展示
- 项目案例卡片展示（带 Hover 动效）
- 微信二维码 Modal 弹窗
- TailwindCSS + 自定义 CSS 样式
- Inter + JetBrains Mono 字体
- 响应式布局

### 后端实现
- Flask 主程序架构
- 静态 JSON 数据存储
- 项目数据读取与渲染
- Demo 页面路由
- 404/500 错误处理

---

## 五、待实现功能

1. **管理员登录系统** - 添加 Session 认证
2. **数据库存储** - 从静态 JSON 迁移到 SQLite
3. **前后台融合编辑** - 在前台页面直接编辑内容
4. **Markdown 编辑器** - 支持实时预览
5. **在线支付** - 接入支付宝/微信支付
6. **客户留言** - 访客留言反馈
7. **访问统计** - 项目页面访问量统计
8. **项目推荐** - 相似项目智能推荐

---

## 六、快速启动

```bash
# 进入项目目录
cd e:/Code/IDEAS/TabaoDemo

# 安装依赖
pip install -r requirements.txt

# 启动服务
python app.py
```

**访问地址**：
- 首页：http://localhost:5055
- 项目列表：http://localhost:5055/projects

---

## 七、一句话总结

> Afrunk Studio 项目展示平台 - 极简风格的团队项目展示站点。
>
> 毛玻璃浮动导航栏 + Hero 滚动动画 + 项目卡片展示 + 微信联系 Modal。
> 视觉风格：极简主义，Inter + JetBrains Mono 字体。
> 技术栈：Flask + TailwindCSS + Jinja2，默认端口 5055。
