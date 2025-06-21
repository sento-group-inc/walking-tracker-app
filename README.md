# Mobile Step Counter App

## 概要
React Nativeを利用したモバイル向け歩数計測アプリケーション。ユーザーの歩数を正確に計測し、データを安全に保存・管理できる機能を提供します。

## 必要条件
- Node.js (v14.0.0以上)
- npm or yarn
- React Native CLI
- Xcode (iOS開発用)
- Android Studio (Android開発用)

## セットアップ手順

1. リポジトリのクローン
    ```
    git clone https://github.com/your-username/mobile-step-counter.git
    cd mobile-step-counter
    ```

2. 依存関係のインストール
    ```
    yarn install
    ```

3. iOSの依存関係インストール
    ```
    cd ios && pod install && cd ..
    ```

4. アプリの起動
    ```
    # iOS
    yarn ios

    # Android
    yarn android
    ```

## 主な機能

### 認証機能
- メールアドレスによるサインアップ/ログイン
- ソーシャルメディア連携（Google, Apple）
- パスワードリセット

### 歩数計測
- リアルタイムの歩数カウント
- バックグラウンド計測
- 日次/週次/月次の集計

### データ管理
- クラウドストレージへの自動同期
- オフライン対応
- データエクスポート機能

## 使用方法

1. アプリを起動し、アカウントを作成またはログイン
2. 必要な権限を許可
3. ホーム画面で歩数計測を開始
4. 統計画面で履歴を確認

## 開発ガイド

### プロジェクト構造
```
src/
  ├── components/
  ├── screens/
  ├── navigation/
  ├── services/
  ├── utils/
  └── store/
```

### コーディング規約
- ESLintとPrettierを使用
- コンポーネントはFunction Componentで実装
- Hooksを積極的に活用

### テスト
```
yarn test
```

### ビルド
```
# iOS
yarn build:ios

# Android
yarn build:android
```

## トラブルシューティング

一般的な問題と解決方法:

1. ビルドエラー
   - node_modulesを削除して再インストール
   - watchmanをリセット

2. デバイス認識エラー
   - USBケーブルを確認
   - デバイスの開発者オプションを有効化

## ライセンス

MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.

## サポート

問題や質問がある場合は、Issuesセクションに投稿してください。

## 貢献

1. Forkする
2. フィーチャーブランチを作成
3. 変更をコミット
4. プルリクエストを作成