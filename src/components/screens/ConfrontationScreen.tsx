1|import { motion } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
2|import { Background } from '../visual-novel/Background';
3|
4|interface ConfrontationScreenProps {
5|  dialogue: { speaker: string; text: string }[];
6|  onContinue: () => void;
7|  background?: string;
8|}
9|
10|export function ConfrontationScreen({ dialogue, onContinue, background }: ConfrontationScreenProps) {
11|  return (
12|    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
13|      {background && <Background src={`/assets/backgrounds/${background}.jpg`} />}
14|      
15|      <div className="absolute inset-0 bg-black/60 z-0" /> {/* Dark overlay for readability */}
16|      
17|      <div className="relative z-10 flex flex-col h-full">
18|      {/* Minimalist Header */}
19|      <div className="px-8 pt-12 pb-6 border-b border-[#27272A]">
20|        <div className="text-[10px] font-bold text-[#E11D48] tracking-widest uppercase mb-1">Fase 02</div>
21|        <h2 className="font-heading text-3xl font-bold tracking-tight">Konfrontasi</h2>
22|      </div>
23|
24|      {/* Chat Bubble Style Dialogue */}
25|      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-4 max-w-4xl mx-auto w-full">
26|        {dialogue.map((line, index) => {
27|          const isPlayer = line.speaker.toLowerCase() === 'nala';
28|          
29|          return (
30|            <motion.div
31|              key={index}
32|              className={`flex w-full ${isPlayer ? 'justify-end' : 'justify-start'}`}
33|              initial={{ opacity: 0, y: 10 }}
34|              animate={{ opacity: 1, y: 0 }}
35|              transition={{ delay: index * 0.15 }}
36|            >
37|              <div className={`flex flex-col ${isPlayer ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
38|                {/* Speaker Label */}
39|                <span className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 px-1 ${isPlayer ? 'text-[#E11D48]' : 'text-[#71717A]'}`}>
40|                  {line.speaker}
41|                </span>
42|                
43|                {/* Dialogue Bubble */}
44|                <div 
45|                  className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed ${
46|                    isPlayer 
47|                      ? 'bg-[#E11D48] text-white rounded-tr-sm' 
48|                      : 'bg-[#18181B] text-[#FAFAFA] border border-[#27272A] rounded-tl-sm'
49|                  }`}
50|                >
51|                  {line.text}
52|                </div>
53|              </div>
54|            </motion.div>
55|          );
56|        })}
57|      </div>
58|
59|      {/* Footer Action */}
60|      <div className="p-8 border-t border-[#27272A] flex justify-end">
61|        <button 
62|          onClick={onContinue}
63|          className="px-8 py-3 bg-[#FAFAFA] text-[#09090B] font-bold text-sm tracking-wide rounded-full hover:bg-[#E4E4E7] hover:scale-105 active:scale-95 transition-all"
64|        >
65|          {t('common.continue')}
66|        </button>
67|      </div>
68|      </div>
69|    </div>
70|  );
71|}
72|