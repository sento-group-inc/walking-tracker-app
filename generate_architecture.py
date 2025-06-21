import os
import json
import requests
from pathlib import Path
import time

# プロジェクト設定を読み込み
config = {
    "type": os.environ.get("PROJECT_TYPE", ""),
    "tech_stack": os.environ.get("TECH_STACK", ""),
    "requirements": os.environ.get("REQUIREMENTS", ""),
    "features": os.environ.get("FEATURES", "basic").split(","),
    "mode": os.environ.get("GENERATION_MODE", "complete_project")
}

# プロジェクトタイプ別のテンプレート定義
project_templates = {
    "mobile": {
        "structure": [
            "src/components",
            "src/screens",
            "src/navigation",
            "src/services",
            "src/utils",
            "src/styles",
            "assets/images",
            "assets/fonts"
        ],
        "files": {
            "package.json":              "mobile_package",
            "App.js":                    "mobile_app",
            "src/navigation/AppNavigator.js": "navigation",
            "src/screens/HomeScreen.js":      "home_screen",
            "src/styles/AppStyles.js":        "mobile_styles",
            "src/styles/index.js":            "mobile_styles",
            "src/reportWebVitals.js":    "report_web_vitals"
        }
    },
    "web": {
        "structure": [
            "src/components",
            "src/pages",
            "src/hooks",
            "src/services", 
            "src/styles",
            "public"
        ],
        "files": {
            "package.json": "web_package",
            "src/App.js": "web_app",
            "src/index.js": "web_index",
            "src/App.css": "web_app_css",
            "src/index.css": "web_index_css",
            "public/index.html": "web_html",
            "src/reportWebVitals.js":    "report_web_vitals"
            
        }
    },
    "api": {
        "structure": [
            "src/controllers",
            "src/models",
            "src/routes",
            "src/middleware",
            "src/utils",
            "tests"
        ],
        "files": {
            "package.json": "api_package",
            "src/app.js": "api_app",
            "src/server.js": "api_server"
        }
    }
}

def call_claude_api(prompt, retries=3):
    """Claude APIを呼び出す（リトライ機能付き）"""
    # GitHub Secretsから環境変数を取得
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    
    # APIキーの詳細な検証とクリーニング
    if not api_key:
        raise Exception("ANTHROPIC_API_KEY environment variable is not set or empty")
    
    # APIキーをクリーニング（先頭・末尾の空白、改行文字を除去）
    original_length = len(api_key)
    api_key = api_key.strip().replace('\\n', '').replace('\\r', '').replace('\\t', '')
    cleaned_length = len(api_key)
    
    print(f"Original API key length: {original_length}")
    print(f"Cleaned API key length: {cleaned_length}")
    print(f"API key starts with: {api_key[:8]}...")
    print(f"API key ends with: ...{api_key[-4:]}")
    
    # 無効な文字のチェック
    invalid_chars = []
    for i, char in enumerate(api_key):
        if ord(char) < 32 and char not in [' ', '\\t']:
            invalid_chars.append((i, char, ord(char)))
    
    if invalid_chars:
        print(f"Found invalid characters at positions: {invalid_chars}")
        raise Exception(f"API key contains invalid control characters: {invalid_chars}")
    
    # 基本的な形式チェック
    if api_key.startswith("***") or api_key == "YOUR_API_KEY":
        raise Exception("API key appears to be a placeholder - please set a real Anthropic API key")
    
    if len(api_key) < 10:
        raise Exception(f"API key too short (length: {len(api_key)}) - please check your ANTHROPIC_API_KEY secret")
    
    # Anthropic APIキーの一般的な形式チェック（sk-で始まる）
    if not api_key.startswith("sk-"):
        print(f"Warning: API key doesn't start with 'sk-', got: {api_key[:10]}...")
    
    # ASCII文字のみかチェック
    try:
        api_key.encode('ascii')
        print("API key contains only ASCII characters ✓")
    except UnicodeEncodeError as e:
        raise Exception(f"API key contains non-ASCII characters: {e}")
    
    headers = {
        "x-api-key": api_key,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
    }
    
    # ヘッダーの検証
    for key, value in headers.items():
        if not isinstance(value, str):
            raise Exception(f"Header {key} value is not a string: {type(value)}")
        # 制御文字のチェック
        invalid_header_chars = [c for c in value if ord(c) < 32 and c not in [' ', '\\t']]
        if invalid_header_chars:
            raise Exception(f"Header {key} contains invalid control characters: {[ord(c) for c in invalid_header_chars]}")
    
    print("Headers validation passed ✓")
    
    data = {
        "model": "claude-3-5-sonnet-20241022",
        "max_tokens": 8000,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    for attempt in range(retries):
        try:
            print(f"Calling Claude API (attempt {attempt + 1}/{retries})...")
            
            response = requests.post(
                "https://api.anthropic.com/v1/messages",
                headers=headers,
                json=data,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                if "content" in result and len(result["content"]) > 0:
                    return result["content"][0]["text"]
                else:
                    raise Exception("Empty response from Claude API")
            elif response.status_code == 429:
                # Rate limit - wait and retry
                wait_time = 2 ** attempt
                print(f"Rate limited, waiting {wait_time} seconds...")
                time.sleep(wait_time)
                continue
            else:
                error_msg = f"API Error {response.status_code}: {response.text}"
                if attempt == retries - 1:
                    raise Exception(error_msg)
                print(f"{error_msg}, retrying...")
                time.sleep(1)
                
        except requests.exceptions.RequestException as e:
            if attempt == retries - 1:
                raise Exception(f"Network error: {str(e)}")
            print(f"Network error: {str(e)}, retrying...")
            time.sleep(1)
    
    raise Exception("All API call attempts failed")

def generate_project_structure():
    """プロジェクト構造を生成"""
    template = project_templates.get(config["type"], project_templates["web"])
    
    # ディレクトリ構造を作成
    for directory in template["structure"]:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {directory}")
        
    return template

def create_fallback_content(file_path, file_type):
    """フォールバック用の基本的なファイル内容を生成"""
    fallback_templates = {
        "web_package": '''
{
  "name": "claude-generated-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}''',
        "web_app": '''
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Claude Generated Project</h1>
        <p>Welcome to your new application!</p>
      </header>
    </div>
  );
}

export default App;''',
        "web_index": '''
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);''',
        "web_html": '''
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Claude generated web application" />
    <title>Claude Generated App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>'''
    }
    
    return fallback_templates.get(file_type, f"// Generated file: {file_path}\\n// TODO: Implement functionality\\n")

def generate_files_with_claude(template):
    """Claude APIを使用してファイルを生成"""
    for file_path, file_type in template["files"].items():
        prompt = f"""
        プロジェクト設定:
        - タイプ: {config["type"]}
        - 技術スタック: {config["tech_stack"]}
        - 要件: {config["requirements"]}
        - 機能: {', '.join(config["features"])}
        
        以下のファイルを生成してください: {file_path}
        ファイルタイプ: {file_type}
        
        要求事項:
        1. 実際に動作するコードを生成
        2. ベストプラクティスに従う
        3. コメントを含める
        4. 設定された機能を反映する
        5. エラーハンドリングを含める
        6，重要：決してファイルの中身にバッククオートを含めないこと
        バッククォート3つで囲まないようにしてください。説明も不要です。
        
        ファイル内容のみを返してください。
        """
        
        try:
            content = call_claude_api(prompt)
            
            # ディレクトリが存在しない場合は作成
            file_dir = Path(file_path).parent
            file_dir.mkdir(parents=True, exist_ok=True)
            
            # ファイルを作成
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"Generated: {file_path}")
            
        except Exception as e:
            print(f"Error generating {file_path}: {e}")
            print(f"Using fallback content for {file_path}")
            
            # フォールバック: 基本的なファイルを作成
            fallback_content = create_fallback_content(file_path, file_type)
            
            file_dir = Path(file_path).parent
            file_dir.mkdir(parents=True, exist_ok=True)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fallback_content)
            
            print(f"Created fallback file: {file_path}")

def generate_documentation():
    """READMEドキュメントを生成"""
    prompt = f"""
    以下のプロジェクトの詳細なREADME.mdファイルを生成してください:
    
    プロジェクト設定:
    - タイプ: {config["type"]}
    - 技術スタック: {config["tech_stack"]}
    - 要件: {config["requirements"]}
    - 機能: {', '.join(config["features"])}
    
    README.mdには以下を含めてください:
    1. プロジェクト概要
    2. セットアップ手順
    3. 使用方法
    4. 機能説明
    5. 開発ガイド
    6. ライセンス情報
    
    マークダウン形式で返してください。
    バッククォート3つで囲まないようにしてください。説明も不要です。
    """
    
    try:
        readme_content = call_claude_api(prompt)
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(readme_content)
        print("Generated: README.md")
    except Exception as e:
        print(f"Error generating README: {e}")
        print("Creating basic README.md")
        
        # フォールバックREADME
        basic_readme = f"""# {config["type"].title()} Project

## Overview
This project was generated using Claude AI.

**Technology Stack:** {config["tech_stack"]}
**Features:** {', '.join(config["features"])}

## Setup
1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Requirements
{config["requirements"]}

Generated on {time.strftime("%Y-%m-%d %H:%M:%S")}
"""
        
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(basic_readme)
        print("Created basic README.md")

# メイン実行
def main():
    try:
        print("Starting project generation...")
        print(f"Project type: {config['type']}")
        print(f"Tech stack: {config['tech_stack']}")
        print(f"Features: {', '.join(config['features'])}")
        
        print("\\nGenerating project structure...")
        template = generate_project_structure()
        
        print("\\nGenerating files with Claude...")
        generate_files_with_claude(template)
        
        print("\\nGenerating documentation...")
        generate_documentation()
        
        # 生成サマリーを作成
        summary = f"""Project Generation Summary
=========================

Project Type: {config['type']}
Tech Stack: {config['tech_stack']}
Features: {', '.join(config['features'])}
Generation Mode: {config['mode']}
Generated At: {time.strftime("%Y-%m-%d %H:%M:%S")}

Status: SUCCESS

Files Created:
"""
        
        # 作成されたファイルをリスト
        for root, dirs, files in os.walk("."):
            for file in files:
                if not file.startswith('.') and file != 'generate_architecture.py':
                    file_path = os.path.join(root, file)
                    summary += f"- {file_path}\\n"
        
        with open("generation_summary.txt", "w", encoding="utf-8") as f:
            f.write(summary)
        
        print("\\n✅ Project generation completed successfully!")
        
    except Exception as e:
        error_msg = f"Generation failed: {str(e)}"
        print(f"\\n❌ {error_msg}")
        
        with open("generation_summary.txt", "w", encoding="utf-8") as f:
            f.write(f"Project Generation Failed\\n")
            f.write(f"=========================\\n\\n")
            f.write(f"Error: {error_msg}\\n")
            f.write(f"Time: {time.strftime('%Y-%m-%d %H:%M:%S')}\\n")
        
        raise Exception(error_msg)

if __name__ == "__main__":
    main()
