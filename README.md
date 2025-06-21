# Mobile Step Counter

## 概要
React Nativeで実装したモバイル歩数計測アプリケーション。ユーザー認証機能を備え、歩数データをクラウドで管理できます。

## 機能
- リアルタイム歩数計測
- ユーザー認証（登録/ログイン）
- 歩数データの保存と履歴表示
- 日次/週次/月次の統計
- カスタマイズ可能な目標設定
- プログレス可視化

## セットアップ

### 必要条件
- Node.js (v14以上)
- npm または yarn
- React Native CLI
- Xcode (iOS開発用)
- Android Studio (Android開発用)

### インストール手順

1. リポジトリのクローン
```
git clone https://github.com/your-username/mobile-step-counter.git
cd mobile-step-counter
```

2. 依存パッケージのインストール
```
npm install
```

3. iOS/Androidプロジェクトの設定
```
cd ios && pod install && cd ..
```

4. アプリの起動
```
npm run ios     # iOSシミュレータで起動
npm run android # Androidエミュレータで起動
```

## 使用方法

1. アプリを起動し、アカウントを作成またはログイン
2. 許可ダイアログで歩数計測の権限を許可
3. ホーム画面で歩数データをリアルタイムに確認
4. 統計タブで詳細なデータを閲覧

## 開発ガイド

### プロジェクト構造
```
src/
  ├── components/    # 再利用可能なUIコンポーネント
  ├── screens/      # 画面コンポーネント
  ├── services/     # APIサービス
  ├── store/        # 状態管理
  └── utils/        # ユーティリティ関数
```

### コーディング規約
- ESLintとPrettierを使用
- コンポーネントはFunction Componentで実装
- PropsにはTypeScriptの型定義を使用

### テスト
```
npm run test        # ユニットテスト実行
npm run e2e        # E2Eテスト実行
```

## 環境変数
.envファイルを作成し、以下の変数を設定：

- API_URL=
- FIREBASE_CONFIG=
- GOOGLE_MAPS_API_KEY=

## トラブルシューティング

- 歩数が計測されない場合：
  - デバイスの権限設定を確認
  - バックグラウンド実行の許可を確認

- ログインできない場合：
  - ネットワーク接続を確認
  - アカウント情報を確認

## ライセンス
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.

## 貢献
Pull requestsを歓迎します。大きな変更の場合は、まずissueでディスカッションを行ってください。

## バージョン履歴
- v1.0.0 - 初期リリース
- v1.1.0 - バックグラウンド計測機能追加
- v1.2.0 - 統計機能強化

## サポート
質問や問題報告は[Issues](https://github.com/your-username/mobile-step-counter/issues)にお願いします。