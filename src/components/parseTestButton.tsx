'use client';

import React, { useEffect, useState } from 'react';
import Parse from 'parse';

export default function ParseTestButton() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Burada Initialize et
    Parse.initialize('musa.321',"");  // Backenddeki appId ile birebir aynı olmalı
    Parse.serverURL = 'http://localhost:1337/parse'; // Backend URL
  }, []);

  const handleClick = async () => {
    try {
      const TestClass = Parse.Object.extend('TestMessage');
      const testObj = new TestClass();
      testObj.set('content', 'Merhaba backendden!');

      await testObj.save();
      setMessage('Mesaj başarıyla kaydedildi!');
    } catch (error: any) {
      setMessage('Hata: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Backend'e Mesaj Gönder
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
