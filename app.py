"""
Flask 主程序
极简项目展示站
"""

import os
import json
from datetime import datetime
from flask import Flask, render_template, jsonify

from config import Config

# 创建 Flask 应用
app = Flask(__name__)
app.config.from_object(Config)


# ==================== 项目数据读取 ====================

def get_projects_data():
    """读取静态项目配置"""
    projects_path = os.path.join(app.root_path, 'projects.json')
    try:
        with open(projects_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def get_demos_data():
    """读取 demo 配置"""
    demos_path = os.path.join(app.root_path, 'templates', 'demo', 'demos.json')
    try:
        with open(demos_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('demos', [])
    except (FileNotFoundError, json.JSONDecodeError):
        return []


# ==================== 辅助函数 ====================

def render_page(template_name, **context):
    """统一渲染页面"""
    now = datetime.now()
    context.update({
        'now': now
    })
    return render_template(template_name, **context)


# ==================== 前台路由 ====================

@app.route('/')
def index():
    """首页"""
    projects = get_projects_data()
    demos = get_demos_data()
    
    return render_page('front/index.html',
        projects=projects,
        demos=demos
    )


@app.route('/projects')
def projects():
    """项目列表页"""
    projects = get_projects_data()
    demos = get_demos_data()
    
    return render_page('front/projects.html',
        projects=projects,
        demos=demos
    )


@app.route('/demo/<demo_id>')
def demo_detail(demo_id):
    """Demo 详情页"""
    demos = get_demos_data()
    demo = next((d for d in demos if d.get('id') == demo_id), None)
    
    if not demo:
        return render_page('front/404.html'), 404
    
    return render_page(f'demo/{demo.get("filename", "landing.html")}',
        demo=demo
    )


# ==================== 错误处理 ====================

@app.errorhandler(404)
def not_found(e):
    return render_page('front/404.html'), 404


@app.errorhandler(500)
def server_error(e):
    return render_page('front/500.html'), 500


# ==================== 启动 ====================

def main():
    print(f'=' * 50)
    print(f'Afrunk Studio 启动中...')
    print(f'=' * 50)
    print(f'访问地址: http://localhost:{Config.PORT}')
    print(f'=' * 50)
    
    app.run(
        host='0.0.0.0',
        port=Config.PORT,
        debug=True
    )


if __name__ == '__main__':
    main()
