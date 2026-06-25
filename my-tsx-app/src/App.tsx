import React, { useState, useEffect } from 'react';

export default function RandomGenerator() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());

  // 残っている数字の数を計算
  const totalNumbers = max - min + 1;
  const remainingCount = totalNumbers > 0 ? totalNumbers - usedNumbers.size : 0;

  const generateNumber = () => {
    if (min > max) {
      alert('最小値は最大値より小さい値を入力してください。');
      return;
    }
    if (remainingCount <= 0) {
      alert('すべての数字が出尽くしました！リセットしてください。');
      return;
    }

    setIsRolling(true);
    
    // スロット演出（100msごとにランダムな数字を表示）
    let counter = 0;
    const interval = setInterval(() => {
      // 演出中は全範囲からランダムに表示してスロット感を出す
      const fakeNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setResult(fakeNumber);
      counter++;

      if (counter > 10) {
        clearInterval(interval);
        
        // まだ使われていない数字のみを抽出
        const availableNumbers = [];
        for (let i = min; i <= max; i++) {
          if (!usedNumbers.has(i)) {
            availableNumbers.push(i);
          }
        }

        // 最終決定
        const finalNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        setResult(finalNumber);
        setUsedNumbers(prev => new Set(prev).add(finalNumber));
        setIsRolling(false);
      }
    }, 100);
  };

  // 完全リセット
  const handleReset = () => {
    setUsedNumbers(new Set());
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-sm text-center">
        <h1 className="text-xl font-bold mb-6 text-slate-800 tracking-wide">ランダム数字ジェネレーター</h1>
        
        {/* 入力エリア */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-400 mb-1">最小値</label>
            <input 
              type="number" 
              value={min} 
              disabled={usedNumbers.size > 0 || isRolling}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-center text-slate-700 font-semibold focus:outline-none focus:border-sky-400 disabled:bg-slate-50 disabled:text-slate-400 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-400 mb-1">最大値</label>
            <input 
              type="number" 
              value={max} 
              disabled={usedNumbers.size > 0 || isRolling}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-center text-slate-700 font-semibold focus:outline-none focus:border-sky-400 disabled:bg-slate-50 disabled:text-slate-400 transition"
            />
          </div>
        </div>

        {/* 残りカウント表示 */}
        <p className="text-xs text-slate-400 mb-6">
          残り: <span className="font-bold text-sky-500">{remainingCount}</span> / {totalNumbers} 個
        </p>

        {/* アクションボタン */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={generateNumber}
            disabled={isRolling || remainingCount <= 0}
            className="w-full bg-sky-400 hover:bg-sky-500 disabled:bg-sky-200 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm shadow-sky-100 transition duration-200"
          >
            {isRolling ? '抽選中...' : '数字を生成する'}
          </button>
          
          <button 
            onClick={handleReset}
            disabled={isRolling || usedNumbers.size === 0}
            className="w-full bg-transparent hover:bg-slate-50 disabled:opacity-30 text-slate-400 hover:text-slate-600 font-medium py-2 text-sm rounded-xl transition"
          >
            リセットする
          </button>
        </div>

        {/* スロット結果表示 */}
        <div className="mt-8 h-32 flex flex-col justify-center items-center border-t border-slate-100">
          {result !== null ? (
            <>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                {isRolling ? 'ROLLING' : 'RESULT'}
              </p>
              <p className={`text-6xl font-black text-sky-400 mt-1 tracking-tight ${isRolling ? 'animate-pulse scale-110' : 'scale-100 transition duration-300'}`}>
                {result}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-300 font-medium">READY</p>
          )}
        </div>
      </div>
    </div>
  );
}

