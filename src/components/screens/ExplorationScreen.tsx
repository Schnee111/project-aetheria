1|import { useState } from 'react';
const { t } = useLocalization();
import { useLocalization } from '../../hooks/useLocalization';
2|import { motion, AnimatePresence } from 'framer-motion';
3|import { MessageSquare, Search, Zap, ArrowLeft, ChevronRight, X } from 'lucide-react';
4|import { Background } from '../visual-novel/Background';
5|import {
6|  getCharacterImageOffsetClass,
7|  getCharacterImageSizeClass,
8|} from '../visual-novel/characterSizing';
9|import type { Scene, Evidence } from '../../types';
10|
11|interface ExplorationScreenProps {
12|  scene: Scene;
13|  inventory: Evidence[];
14|  visitedSceneIds: string[];
15|  onAction: (sceneId: string) => void;
16|  onBack: () => void;
17|}
18|
19|export function ExplorationScreen({ scene, inventory, visitedSceneIds, onAction, onBack }: ExplorationScreenProps) {
20|  const [activeMenu, setActiveMenu] = useState<'main' | 'interrogate' | 'present'>('main');
21|
22|  const exp = scene.exploration;
23|  if (!exp) return null;
24|
25|  const charSprite = `/assets/characters/${exp.characterId}/${exp.characterId}_neutral.png`; // Fallback simple sprite logic
26|  const imageSizeClass = getCharacterImageSizeClass(exp.characterId);
27|  const imageOffsetClass = getCharacterImageOffsetClass(exp.characterId);
28|
29|  return (
30|    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
31|      <Background src={`/assets/backgrounds/${scene.background}.jpg`} />
32|      
33|      {/* Top Bar */}
34|      <div className="absolute top-0 inset-x-0 py-6 pl-6 pr-16 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
35|        <button
36|          onClick={onBack}
37|          className="pointer-events-auto flex items-center gap-2 text-sm font-semibold hover:text-white transition-colors text-[#A1A1AA] bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
38|        >
39|          <ArrowLeft size={16} />
40|          <span>{t('investigation.backToHub')}</span>
41|        </button>
42|        <div className="text-right">
43|          <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{scene.title}</div>
44|          <div className="text-[10px] font-bold text-[#E11D48] tracking-widest uppercase drop-shadow-md">Eksplorasi</div>
45|        </div>
46|      </div>
47|
48|      {/* Character Sprite */}
49|      <div className="absolute inset-0 z-10 flex items-end justify-center pb-24 sm:pb-28 md:pb-0 pointer-events-none">
50|        <motion.div
51|          className="pointer-events-none"
52|          initial={{ opacity: 0, y: 20 }}
53|          animate={{ opacity: 1, y: 0 }}
54|          transition={{ duration: 0.5 }}
55|        >
56|          <img
57|            src={charSprite}
58|            alt={exp.characterId}
59|            className={`${imageSizeClass} max-w-none ${imageOffsetClass} object-contain drop-shadow-2xl`}
60|            draggable={false}
61|            onError={(e) => {
62|              e.currentTarget.style.display = 'none';
63|            }}
64|          />
65|        </motion.div>
66|      </div>
67|
68|      {/* Action Dashboard */}
69|      <div className="absolute bottom-0 inset-x-0 z-30 p-6 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
70|        <div className="max-w-4xl mx-auto w-full">
71|          <AnimatePresence mode="wait">
72|            
73|            {/* MAIN MENU */}
74|            {activeMenu === 'main' && (
75|              <motion.div
76|                key="main"
77|                initial={{ opacity: 0, y: 20 }}
78|                animate={{ opacity: 1, y: 0 }}
79|                exit={{ opacity: 0, y: 20 }}
80|                className="grid grid-cols-1 md:grid-cols-3 gap-4"
81|              >
82|                <ActionButton
83|                  icon={<MessageSquare size={20} />}
84|                  label="Ngomong"
85|                  desc="Obrolan santai"
86|                  onClick={() => onAction(exp.talkSceneId)}
87|                  color="#34D399"
88|                />
89|                <ActionButton
90|                  icon={<Search size={20} />}
91|                  label="Investigasi"
92|                  desc={!visitedSceneIds.includes(exp.talkSceneId) ? {t('investigation.locked')} : 'Cari petunjuk'}
93|                  onClick={() => exp.investigationSceneId && onAction(exp.investigationSceneId)}
94|                  color="#3B82F6"
95|                  disabled={!exp.investigationSceneId || !visitedSceneIds.includes(exp.talkSceneId)}
96|                />
97|                <ActionButton
98|                  icon={<Zap size={20} />}
99|                  label={t("investigation.presentEvidence")}
100|                  desc={!exp.defaultPresentSceneId && !exp.presentEvidenceRoutes ? {t('investigation.notAvailable')} : !visitedSceneIds.includes(exp.talkSceneId) ? {t('investigation.locked')} : {t('investigation.pressWithEvidence')}}
101|                  onClick={() => setActiveMenu('present')}
102|                  color="#E11D48"
103|                  disabled={!visitedSceneIds.includes(exp.talkSceneId) || (!exp.defaultPresentSceneId && !exp.presentEvidenceRoutes)}
104|                />
105|              </motion.div>
106|            )}
107|
108|
109|
110|            {/* PRESENT EVIDENCE MENU */}
111|            {activeMenu === 'present' && (
112|              <motion.div
113|                key="present"
114|                initial={{ opacity: 0, y: 20 }}
115|                animate={{ opacity: 1, y: 0 }}
116|                exit={{ opacity: 0, y: 20 }}
117|                className="flex flex-col gap-4"
118|              >
119|                <div className="flex items-center justify-between mb-2">
120|                  <div className="text-sm font-bold text-[#E11D48] tracking-widest uppercase">{t('investigation.presentEvidence')}</div>
121|                  <button onClick={() => setActiveMenu('main')} className="p-2 text-zinc-400 hover:text-white"><X size={20}/></button>
122|                </div>
123|                
124|                {inventory.length === 0 ? (
125|                  <div className="p-8 text-center text-zinc-500 italic border border-zinc-800 rounded-2xl bg-zinc-900/50">
126|                    Belum ada bukti di Case File.
127|                  </div>
128|                ) : (
129|                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
130|                    {inventory.map(item => (
131|                      <button
132|                        key={item.id}
133|                        className="snap-start flex-shrink-0 w-64 p-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:border-[#E11D48] hover:bg-zinc-800 transition-all text-left group"
134|                        onClick={() => {
135|                          const routeId = exp.presentEvidenceRoutes?.[item.id] || exp.defaultPresentSceneId;
136|                          if (routeId) onAction(routeId);
137|                        }}
138|                      >
139|                        <div className="text-xs font-bold text-[#E11D48] mb-1 truncate">{item.title}</div>
140|                        <div className="text-[10px] text-zinc-400 line-clamp-2">{item.claim}</div>
141|                      </button>
142|                    ))}
143|                  </div>
144|                )}
145|              </motion.div>
146|            )}
147|
148|          </AnimatePresence>
149|        </div>
150|      </div>
151|    </div>
152|  );
153|}
154|
155|function ActionButton({ icon, label, desc, onClick, color = '#FAFAFA', disabled = false }: any) {
156|  return (
157|    <motion.button
158|      className={`group relative p-4 text-left flex flex-col justify-between overflow-hidden rounded-2xl border transition-all h-28 ${
159|        disabled 
160|          ? 'border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed' 
161|          : 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-600 hover:bg-zinc-800'
162|      }`}
163|      onClick={disabled ? undefined : onClick}
164|      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
165|      whileTap={disabled ? {} : { scale: 0.98 }}
166|    >
167|      <div className="flex justify-between items-start w-full">
168|        <div style={{ color: disabled ? '#52525B' : color }}>{icon}</div>
169|        {!disabled && <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />}
170|      </div>
171|      <div>
172|        <div className="text-sm font-bold mt-2" style={{ color: disabled ? '#52525B' : '#FAFAFA' }}>{label}</div>
173|        <div className="text-[10px] text-zinc-500 mt-0.5">{desc}</div>
174|      </div>
175|      
176|      {/* Background glow on hover */}
177|      {!disabled && (
178|        <div 
179|          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" 
180|          style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }}
181|        />
182|      )}
183|    </motion.button>
184|  );
185|}
186|