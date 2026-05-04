"""
配置文件
包含管理员账号、数据库路径、端口等配置项
"""

import os

class Config:
    # Flask 密钥
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'taobao-demo-secret-key-2024-change-in-production'
    
    # 数据库路径
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DATABASE = os.path.join(BASE_DIR, 'data', 'app.db')
    
    # 上传配置
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'gif'}
    
    # 管理员账号（首次部署后请修改默认密码）
    ADMIN_USERNAME = 'admin'
    ADMIN_PASSWORD = '1234'
    
    # 服务器端口（严禁使用 5000）
    PORT = 5055
    
    # 站点信息
    SITE_TITLE = 'Afrunk Studio'
    SITE_SUBTITLE = '专注 Python 爬虫、数据分析、AI 工作流开发'
    SITE_DESCRIPTION = '展示已完成的各类项目，支持源码交付、部署复现和定制开发'
    
    # 分页配置
    PROJECTS_PER_PAGE = 12
    
    # 项目状态选项
    PROJECT_STATUSES = [
        '已完成',
        '持续迭代',
        '可部署',
        '可定制',
        '仅展示',
        '已归档'
    ]
    
    # 默认分类
    DEFAULT_CATEGORIES = [
        '淘宝电商工具',
        'Python 爬虫',
        'AI 工作流',
        '知识库系统',
        '数据分析工具',
        '自动化工具',
        'Web 管理系统'
    ]


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


# 根据环境选择配置
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
