
import React, { useEffect, useState } from 'react';

const MatrixRain: React.FC = () => {
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const generateMatrixText = () => {
      const chars = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}[]|\\:";\'<>?,./+=_-~`';
      const hackingSymbols = 'ハッキングアクセス許可暗号化プロトコル起動システム侵入中データ流出警告セキュリティ違反検出';
      const binaryCode = '010011010110000101110100011100100110100101111000001000000100100001100001011000110110101101100101011100100010000001110010011000010110100101101110';
      const hexCode = '0x414343455353204752414E544544';
      
      const allChars = chars + hackingSymbols + binaryCode + hexCode;
      
      const newColumns = [];
      for (let i = 0; i < 25; i++) {
        let column = '';
        const columnLength = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < columnLength; j++) {
          column += allChars[Math.floor(Math.random() * allChars.length)] + '\n';
        }
        newColumns.push(column);
      }
      setColumns(newColumns);
    };

    generateMatrixText();
    const interval = setInterval(generateMatrixText, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="matrix-rain">
      {columns.map((column, index) => (
        <div key={index} className="matrix-column">
          {column}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
