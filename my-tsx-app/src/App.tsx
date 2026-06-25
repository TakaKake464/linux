import { useState } from 'react'

export default function App() {
  // 1. 状態（State）を定義（最初は空の文字）
  const [text, setText] = useState<string>('')

  return (
    <div style={{ padding: '40px', background: '#1e1e2e', color: '#cdd6f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#cba6f7' }}>🚀 TSX特訓基地</h1>
      
      {/* 2. 入力フォーム。文字が変わるたびに setText で状態を更新 */}
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに文字を入力してみて..."
        style={{ padding: '10px', width: '300px', borderRadius: '6px', border: 'none', background: '#313244', color: '#cdd6f4', fontSize: '16px' }}
      />

      {/* 3. 状態（text）がリアルタイムに画面に反映される */}
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <p>入力された文字: <strong style={{ color: '#a6e3a1' }}>{text}</strong></p>
        <p>文字数: {text.length} 文字</p>
      </div>

      {/* 4. jQueryなら泣いてた条件分岐も一瞬 */}
      {text === 'ping' && <p style={{ color: '#f9e2af', fontWeight: 'bold' }}>pong! (Linuxのノリ)</p>}
    </div>
  )
}

