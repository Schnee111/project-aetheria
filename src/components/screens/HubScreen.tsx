1|import { motion } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
2|import { Search, FileText, ChevronRight, Hash, Eye, MapPin, AlertCircle, Lock } from 'lucide-react';
3|import type { Evidence } from '../../types';
4|
5|interface HubScreenProps {
6|  inventory: Evidence[];
7|  foundInsightIds: string[];
8|  currentHoaxWave: number;
9|  unlockedLocations: string[];
10|  onSelectLocation: (locationId: string) => void;
11|  onOpenBoard: () => void;
12|  onOpenInspection: () => void;
13|  canInspect: boolean;
14|}
15|
16|const LOCATION_DETAILS: Record<string, { title: string, desc: string }> = {
17|  'kantin': { title: 'Kantin Sekolah', desc: 'Tempat Rendra biasa nongkrong. Tanya soal chat awal.' },
18|  'uks': { title: 'Ruang UKS', desc: 'Aldi masih di sini. Cari tahu soal chat "markup nilai".' },
19|  'mading': { title: 'Ruang Mading', desc: 'Kak Lala menunggu update investigasi.' },
20|  'bk': { title: 'Ruang BK', desc: 'Bu Salma menyimpan data nilai rapor angkatan.' },
21|  'lapangan': { title: 'Lapangan Basket', desc: 'Bintang sering latihan di sini. Tanya soal lomba.' }
22|};
23|
24|export function HubScreen({
25|  inventory,
26|  foundInsightIds,
27|  currentHoaxWave,
28|  unlockedLocations,
29|  onSelectLocation,
30|  onOpenBoard,
31|  onOpenInspection,
32|  canInspect,
33|}: HubScreenProps) {
34|  return (
35|    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
36|      
37|      {/* Top Header */}
38|      <div className="px-8 pt-16 pb-6 border-b border-[#27272A]">
39|        <div className="flex justify-between items-end mb-2">
40|          <h2 className="font-heading text-4xl font-bold tracking-tight">Investigasi</h2>
41|          <div className="flex items-center gap-2 bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30 px-3 py-1.5 rounded-full">
42|            <AlertCircle size={14} />
43|            <span className="text-[10px] font-bold tracking-widest uppercase">
44|              Gelombang Hoax {currentHoaxWave} / 5
45|            </span>
46|          </div>
47|        </div>
48|        <div className="flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-[#A1A1AA]">
49|          <span className="flex items-center gap-2">
50|            <Hash size={14} /> {inventory.length} Berkas
51|          </span>
52|          <span className="flex items-center gap-2">
53|            <Eye size={14} /> {foundInsightIds.length} Fakta
54|          </span>
55|        </div>
56|      </div>
57|
58|      {/* Main Content Split */}
59|      <div className="flex-1 flex flex-col md:flex-row gap-12 px-8 py-8 overflow-y-auto">
60|        
61|        {/* Navigation List - Locations */}
62|        <div className="flex-1 flex flex-col gap-6 max-w-xl">
63|          
64|          <div>
65|            <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-4">Lokasi Tersedia</h3>
66|            <div className="flex flex-col gap-2">
67|              {Object.entries(LOCATION_DETAILS).map(([locId, loc]) => {
68|                const isUnlocked = unlockedLocations.includes(locId);
69|                return (
70|                  <motion.button
71|                    key={locId}
72|                    disabled={!isUnlocked}
73|                    className={`group relative w-full p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border transition-all ${
74|                      isUnlocked 
75|                        ? 'border-[#27272A] bg-[#18181B] hover:border-[#E11D48]/50 hover:bg-[#E11D48]/5 cursor-pointer'
76|                        : 'border-[#27272A]/30 bg-[#18181B]/30 opacity-50 cursor-not-allowed'
77|                    }`}
78|                    onClick={() => isUnlocked && onSelectLocation(locId)}
79|                    whileHover={isUnlocked ? { scale: 1.01 } : {}}
80|                    whileTap={isUnlocked ? { scale: 0.99 } : {}}
81|                  >
82|                    <div>
83|                      <div className="flex items-center gap-3 mb-1">
84|                        {isUnlocked ? (
85|                          <MapPin size={16} className="text-[#E11D48]" />
86|                        ) : (
87|                          <Lock size={16} className="text-[#71717A]" />
88|                        )}
89|                        <span className="text-sm font-bold">{loc.title}</span>
90|                      </div>
91|                      <div className="text-xs text-[#71717A] ml-7">
92|                        {isUnlocked ? loc.desc : 'Lokasi belum terbuka...'}
93|                      </div>
94|                    </div>
95|                    {isUnlocked && (
96|                      <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#E11D48] transition-colors" />
97|                    )}
98|                  </motion.button>
99|                )
100|              })}
101|            </div>
102|          </div>
103|
104|          <div className="h-px w-full bg-[#27272A]" />
105|
106|          <div>
107|            <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-4">Tools</h3>
108|            <div className="flex flex-col gap-2">
109|              <motion.button
110|                className="group relative w-full p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
111|                onClick={onOpenBoard}
112|                whileHover={{ scale: 1.01 }}
113|                whileTap={{ scale: 0.99 }}
114|              >
115|                <div>
116|                  <div className="flex items-center gap-3 mb-1">
117|                    <Search size={16} className="text-[#FAFAFA]" />
118|                    <span className="text-sm font-bold">Papan Detektif</span>
119|                  </div>
120|                  <div className="text-xs text-[#71717A] ml-7">Hubungkan bukti & cari pola</div>
121|                </div>
122|                <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors" />
123|              </motion.button>
124|
125|              {canInspect && (
126|                <motion.button
127|                  className="group relative w-full p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
128|                  onClick={onOpenInspection}
129|                  whileHover={{ scale: 1.01 }}
130|                  whileTap={{ scale: 0.99 }}
131|                >
132|                  <div>
133|                    <div className="flex items-center gap-3 mb-1">
134|                      <FileText size={16} className="text-[#FAFAFA]" />
135|                      <span className="text-sm font-bold">Cross-Check Klaim</span>
136|                    </div>
137|                    <div className="text-xs text-[#71717A] ml-7">Sandingkan klaim rumor dengan bukti</div>
138|                  </div>
139|                  <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors" />
140|                </motion.button>
141|              )}
142|
143|              {foundInsightIds.includes('INS_CH1_REAL_CULPRIT_CLUE') ? (
144|                <motion.button
145|                  className="group relative w-full p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-[#E11D48] bg-[#E11D48]/10 hover:bg-[#E11D48]/20 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
146|                  onClick={() => onSelectLocation('konfrontasi')}
147|                  whileHover={{ scale: 1.01 }}
148|                  whileTap={{ scale: 0.99 }}
149|                >
150|                  <div>
151|                    <div className="flex items-center gap-3 mb-1">
152|                      <AlertCircle size={16} className="text-[#E11D48]" />
153|                      <span className="text-sm font-bold text-white">Konfrontasi Pelaku</span>
154|                    </div>
155|                    <div className="text-xs text-[#FAFAFA]/70 ml-7">Kamu telah menemukan korelasi bukti pamungkas.</div>
156|                  </div>
157|                  <ChevronRight size={18} className="text-[#E11D48] group-hover:text-[#FAFAFA] transition-colors" />
158|                </motion.button>
159|              ) : (
160|                inventory.length >= 4 && (
161|                  <motion.div
162|                    className="w-full p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-[#10B981]/50 bg-[#10B981]/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse"
163|                  >
164|                    <div>
165|                      <div className="flex items-center gap-3 mb-1">
166|                        <Search size={16} className="text-[#10B981]" />
167|                        <span className="text-sm font-bold text-white">Petunjuk Tersembunyi</span>
168|                      </div>
169|                      <div className="text-xs text-[#FAFAFA]/70 ml-7">Gunakan Papan Detektif untuk menghubungkan bukti-bukti yang sudah kamu kumpulkan!</div>
170|                    </div>
171|                  </motion.div>
172|                )
173|              )}
174|            </div>
175|          </div>
176|
177|        </div>
178|
179|        {/* Evidence List */}
180|        <div className="flex-1 md:border-l md:border-[#27272A] md:pl-12">
181|          <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-6">Berkas di Case File</h3>
182|          <div className="flex flex-col gap-3">
183|            {inventory.length === 0 ? (
184|              <div className="text-sm text-[#52525B] italic">{t('investigation.caseFileEmpty')}</div>
185|            ) : (
186|              inventory.map((evidence, i) => (
187|                <motion.div
188|                  key={evidence.id}
189|                  className="flex items-start gap-4 py-2 border-b border-[#27272A]/50 last:border-0"
190|                  initial={{ opacity: 0, x: -10 }}
191|                  animate={{ opacity: 1, x: 0 }}
192|                  transition={{ delay: i * 0.05 }}
193|                >
194|                  <span className="text-[10px] font-bold text-[#E11D48] mt-1 tracking-widest">
195|                    {String(i + 1).padStart(2, '0')}
196|                  </span>
197|                  <div className="flex-1">
198|                    <div className="text-sm font-semibold">{evidence.title}</div>
199|                    <div className="text-[11px] text-[#71717A] mt-1">{evidence.source}</div>
200|                  </div>
201|                </motion.div>
202|              ))
203|            )}
204|          </div>
205|        </div>
206|      </div>
207|    </div>
208|  );
209|}
210|