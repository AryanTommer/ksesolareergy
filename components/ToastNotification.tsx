"use client";

import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export function ToastNotification() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  
  const names = [
    'राम प्रकाश, कानपुर','सुनीता देवी, लखनऊ','मोहन लाल, गोरखपुर',
    'प्रीति यादव, वाराणसी','अजय सिंह, आगरा','रेखा शर्मा, मेरठ',
    'विनोद कुमार, प्रयागराज','कमला देवी, बरेली'
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setMsg(`${names[idx]} ने अभी आवेदन किया!`);
      setShow(true);
      idx = (idx + 1) % names.length;
      
      setTimeout(() => setShow(false), 4000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 md:bottom-10 left-5 max-w-[320px] bg-white border-l-4 border-emerald-500 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3 pr-5 z-[98] flex items-center gap-3 animate-slide-in-left">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
        <FaCheck className="text-emerald-600 text-sm" />
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm mb-0.5">{msg}</p>
        <p className="text-xs text-slate-500 font-medium tracking-wide">अभी कुछ देर पहले</p>
      </div>
    </div>
  );
}
