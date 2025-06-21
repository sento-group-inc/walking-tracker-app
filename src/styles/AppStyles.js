import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  // コンテナスタイル
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // 認証関連スタイル
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // 歩数計測関連スタイル
  stepCounter: {
    alignItems: 'center',
    padding: 20,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333',
  },
  stepLabel: {
    fontSize: 18,
    color: '#666666',
    marginTop: 10,
  },

  // データ表示関連スタイル
  dataContainer: {
    padding: 15,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    padding: 10,
  },

  // エラー表示スタイル
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 10,
  },

  // ローディング表示スタイル
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // ナビゲーション関連スタイル
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // プロフィール関連スタイル
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AppStyles;