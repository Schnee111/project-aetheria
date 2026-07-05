import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const ENDPOINT = 'https://token-plan-sgp.xiaomimimo.com/v1/chat/completions';
const MODELS = {
  voiceDesign: 'mimo-v2.5-tts-voicedesign',
  voiceClone: 'mimo-v2.5-tts-voiceclone',
};
const RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const MAX_VOICE_SAMPLE_BASE64_BYTES = 10 * 1024 * 1024;
const EXACT_SPEECH_INSTRUCTION =
  ' Speak only the exact assistant text. Do not add, repeat, explain, translate, or improvise any words.';

const VOICE_PROFILES = {
  narrator: {
    prompt:
      'A young adult male voice with a medium pitch. He sounds profoundly calm, cool, and effortless. His voice is extremely smooth, crystal clear, and perfectly steady, projecting quiet confidence. He speaks at a normal volume, casually and smoothly. He is completely relaxed, and his voice is crisp, clean, and cool.',
    seed: 100,
  },
  aeterna: {
    prompt:
      'A young adult male voice with a medium pitch. He sounds profoundly calm, cool, and effortless. His voice is extremely smooth, crystal clear, and perfectly steady, projecting quiet confidence. He speaks at a normal volume, casually and smoothly. He is completely relaxed, and his voice is crisp, clean, and cool.',
    seed: 100,
  },
  lysthea: {
    prompt:
      'A young adult female voice with a soft mid-high pitch. She sounds elegant, cool, graceful, and composed, with crystalline clarity and a gentle breathy texture. Her articulation is precise and refined, carrying calm authority even when worried. She speaks smoothly at a measured pace with controlled emotion, never shrill, never childish.',
    seed: null,
  },
  abyssal_assassin: {
    prompt:
      'A deep adult male demonic assassin voice. Low, cold, predatory, and menacing, with a rough hoarse texture and controlled malice. He speaks clearly in English with sharp articulation, never cartoonish, and can shift into terrified disbelief while keeping the same dark timbre.',
    seed: 404,
  },
};

const UNSEEDED_IDS = new Set(['CH1_S01_D007']);

const STANDALONE_SAMPLES = {
  aeterna_master_neutral: {
    speaker: 'aeterna',
    out: 'public/assets/audio/voice/masters/aeterna_master_neutral.mp3',
    text:
      'Aetheria... a world where magic behaves like logic, and logic occasionally forgets to be polite. I spend my days repairing small Magitech devices, drinking warm tea, and avoiding unnecessary trouble whenever possible. No grand speeches, no dramatic destiny, no heroic sprint through the rain. Just quiet work, clean circuits, and a peaceful life that does not require too much energy. Honestly... that is more than enough for me.',
  },
  lysthea_master_neutral: {
    speaker: 'lysthea',
    out: 'public/assets/audio/voice/masters/lysthea_master_neutral.mp3',
    text:
      'Order is not a chain. It is a quiet promise that the world will not collapse while its people are still learning how to live. I have watched over Aetheria through storms, prayers, and countless fragile mornings. My duty is absolute, yet my voice must remain calm. Even when fear rises, I will speak with clarity, grace, and unwavering resolve. That is the dignity expected of the Goddess of Order.',
  },
  lysthea_master_tense_cool: {
    speaker: 'lysthea',
    out: 'public/assets/audio/voice/masters/lysthea_master_tense_cool_seed_21.mp3',
    text:
      'The barrier is unstable. If the core fails to reboot, the Seventh District will lose its protection within minutes. Stay calm. Panic will only fracture the remaining rune sequence. I will maintain order here, no matter how severe the damage becomes. Bring me the circuit diagram, and do not raise your voice. We still have time.',
  },
};

const CLONE_STYLE_PROMPTS = {
  restrained:
    'Use the reference voice. Keep the same calm, cool, relaxed character. Speak naturally with subtle cinematic expression, but stay restrained and understated. Avoid theatrical emphasis, exaggerated emotion, or dramatic rises in pitch. Maintain steady pacing and quiet confidence.',
  lysthea_cool:
    'Use the reference voice. Keep Lysthea elegant, cool, composed, and refined. Even when the text is urgent or worried, keep her voice controlled and dignified, with a calm porcelain-like authority. Allow subtle tension, but avoid shouting, melodrama, excessive panic, childish emotion, or dramatic pitch rises. Maintain clear articulation and graceful restraint.',
  aeterna_memory_timing:
    'Use the reference voice. Keep Aeterna calm, cool, smooth, and quietly cinematic, with reflective memory-narration emotion. Speak at a slightly brisk natural pace with clean articulation and short pauses so the line can fit strict scene timing. Avoid theatrical emphasis, long pauses, shouting, or dramatic pitch rises.',
  aeterna_memory_tight_timing:
    'Use the reference voice. Keep Aeterna calm, cool, smooth, and quietly cinematic. This is strict-timed narration: speak at a compact, brisk pace with very short pauses, clean articulation, and no lingering on ellipses. Preserve quiet confidence and reflective emotion, but avoid theatrical emphasis, dramatic pauses, shouting, or pitch rises.',
  lysthea_cool_tight:
    'Use the reference voice. Keep Lysthea elegant, cool, composed, and refined, with calm porcelain-like authority. Speak with controlled urgency at a moderately brisk pace, using short pauses and clear articulation. Allow subtle tension, but avoid shouting, melodrama, panic, childish emotion, dramatic pitch rises, or drawn-out words.',
  lysthea_shield_command:
    'Use the reference voice. Match a CG where Lysthea stands between Aeterna and a dark attacker, holding a luminous blue magic shield with icy composure. Speak like a precise combat command: calm, cold, protective, and controlled, with urgency from crisp timing rather than panic. Keep her noble and unshaken; no shouting, no shrill fear, no melodrama.',
  lysthea_reverent_tears:
    'Use the reference voice. Match a CG where Lysthea kneels among glass shards, looking up with tears, stunned reverence, and restrained relief. Speak softly and breathily, almost a noble whisper, with tiny tremble in the breath but controlled diction. Avoid loud shock, theatrical crying, long dramatic pauses, or childish emotion.',
  lysthea_warm_relief:
    'Use the reference voice. Match a warm CG where Lysthea smiles through tears and reaches out her hand in relief. Speak softly, warmly, and gracefully, with a small relieved smile in the voice. Keep her noble composure and crystalline clarity; no childish sweetness, no exaggerated happiness, no dramatic sobbing.',
  lysthea_soft_controlled:
    'Use the reference voice. Match a close emotional CG, but keep the performance controlled and conversational. Speak softly with noble composure, clear articulation, and a natural normal pace. Allow only a faint breath tremble; no whispering, no sobbing, no drawn-out vowels, and no pause longer than a brief comma.',
  lysthea_calm_flat:
    'Use the reference voice. Keep Lysthea calm, cool, elegant, and composed, with very restrained emotion. Speak at normal volume and natural pace, almost flat but still graceful. Use clear simple pronunciation and do not emphasize exclamation marks. Avoid shouting, urgency spikes, panic, melodrama, breathy trembling, dramatic pauses, or pitch rises.',
  lysthea_anguish:
    'Use the reference voice. Speak with quiet anguish, voice trembling through tears. Broken but dignified, overwhelmed but not screaming. Allow natural sob cracks without theatrical crying. Keep noble composure underneath the grief, with breath trembles and slightly unsteady pacing. Avoid shouting, melodrama, or drawn-out wailing.',
  aeterna_close_warm:
    'Use the reference voice. Match a close warm CG where Aeterna reaches out a hand with a faint gentle smile after absolute power has settled. Speak low, intimate, calm, and lightly warm, as if reassuring someone directly in front of him. Keep quiet authority under the softness; no grand narration, no theatrical emphasis, no rushing.',
  aeterna_close_controlled:
    'Use the reference voice. Match a warm close-up CG, but keep the delivery compact and conversational. Speak low, intimate, calm, and lightly warm at a natural normal pace. Keep quiet authority under the softness; no grand narration, no theatrical pauses, no drawn-out words, and no rushing.',
  aeterna_sacred_farewell:
    'Use the reference voice. Match a sacred golden CG of handing over a glowing authority cube and saying farewell while divinity is breaking. Speak softly, solemnly, and gently, like a final instruction given with tired composure. Keep the voice calm and cool but vulnerable; no rushed exposition, no dramatic booming, no long pauses.',
  aeterna_sacred_controlled:
    'Use the reference voice. Match a sacred golden farewell CG, but keep the delivery controlled and compact. Speak softly, tired, calm, and gentle at a natural normal pace, like a final instruction given directly to Lysthea. Avoid rushed exposition, whispering, dramatic booming, long pauses, or drawn-out words.',
};

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      continue;
    }

    const [rawKey, inlineValue] = arg.slice(2).split(/=(.*)/s);
    const next = argv[i + 1];

    if (inlineValue !== undefined && inlineValue !== '') {
      args[rawKey] = inlineValue;
    } else if (next && !next.startsWith('--')) {
      args[rawKey] = next;
      i += 1;
    } else {
      args[rawKey] = true;
    }
  }

  return args;
}

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const env = fs.readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2] ?? '';
    }
  }
}

function getStringProperty(node, name) {
  const prop = node.properties.find((item) => {
    if (!ts.isPropertyAssignment(item)) {
      return false;
    }

    const propName = item.name;
    return ts.isIdentifier(propName) && propName.text === name;
  });

  if (!prop || !ts.isPropertyAssignment(prop)) {
    return undefined;
  }

  const initializer = prop.initializer;
  if (ts.isStringLiteralLike(initializer)) {
    return initializer.text;
  }

  return undefined;
}

function parseDialogues(sceneFile) {
  const sourceText = fs.readFileSync(sceneFile, 'utf8');
  const sourceFile = ts.createSourceFile(sceneFile, sourceText, ts.ScriptTarget.Latest, true);
  const dialogues = [];

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'dialogues' &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) {
          continue;
        }

        const id = getStringProperty(element, 'id');
        const speaker = getStringProperty(element, 'speaker');
        const voiceSpeaker = getStringProperty(element, 'voiceSpeaker');
        const textEn = getStringProperty(element, 'textEn');
        const voiceTextEn = getStringProperty(element, 'voiceTextEn');
        const voiceSrc = getStringProperty(element, 'voiceSrc');

        if (!id || !id.includes('_D') || !speaker || !textEn?.trim() || !voiceSrc) {
          continue;
        }

        dialogues.push({
          id,
          speaker: voiceSpeaker || speaker,
          text: voiceTextEn?.trim() || textEn,
          voiceSrc,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return dialogues;
}

function splitList(value) {
  if (!value || value === true) {
    return [];
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function sceneFileFromArg(sceneArg) {
  const scene = String(sceneArg ?? '').padStart(2, '0');
  if (!/^\d{2}$/.test(scene)) {
    throw new Error('Use --scene with a two digit number, for example --scene 02.');
  }

  return {
    scene,
    file: path.join(process.cwd(), 'src', 'data', 'chapter-1', 'scenes', `s${scene}.ts`),
  };
}

function targetPathFor(dialogue, sampleSeed, variant) {
  const relativeVoicePath = dialogue.voiceSrc.replace(/^\//, '').replace(/\//g, path.sep);
  const basePath = path.join(process.cwd(), 'public', relativeVoicePath.replace(/^assets[\\/]/, 'assets' + path.sep));

  if (sampleSeed === undefined && !variant) {
    return basePath;
  }

  const suffix = sampleSeed === undefined ? variant : `sample_seed_${sampleSeed}`;
  return path.join(
    path.dirname(basePath),
    `${path.basename(basePath, '.mp3')}_${suffix}.mp3`,
  );
}

function targetPathForStandalone(sample, args) {
  const outArg = args.out && args.out !== true ? String(args.out) : sample.out;
  return path.resolve(process.cwd(), outArg);
}

function resolveSeed(dialogue, profile, args, sampleSeed) {
  if (sampleSeed !== undefined) {
    return sampleSeed;
  }

  if (args.unseeded || UNSEEDED_IDS.has(dialogue.id)) {
    return null;
  }

  if (args.seed !== undefined && args.seed !== true) {
    return Number(args.seed);
  }

  return profile.seed;
}

function mimeTypeForAudio(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.mp3') {
    return 'audio/mpeg';
  }
  if (extension === '.wav') {
    return 'audio/wav';
  }

  throw new Error(`Unsupported voice sample format "${extension}". Use .mp3 or .wav.`);
}

function encodeVoiceSample(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Voice sample not found: ${absolutePath}`);
  }

  const audioBuffer = fs.readFileSync(absolutePath);
  const base64Audio = audioBuffer.toString('base64');

  if (Buffer.byteLength(base64Audio, 'utf8') > MAX_VOICE_SAMPLE_BASE64_BYTES) {
    throw new Error('Voice sample is too large after Base64 encoding. MiMo voiceclone allows up to 10 MB.');
  }

  return `data:${mimeTypeForAudio(absolutePath)};base64,${base64Audio}`;
}

function parseVoiceSampleMap(value) {
  const entries = splitList(value);
  const map = new Map();

  for (const entry of entries) {
    const separatorIndex = entry.indexOf('=');
    if (separatorIndex === -1) {
      throw new Error(`Invalid --voice-sample-map entry "${entry}". Use speaker=path/to/sample.mp3.`);
    }

    const speaker = entry.slice(0, separatorIndex).trim();
    const samplePath = entry.slice(separatorIndex + 1).trim();
    if (!speaker || !samplePath) {
      throw new Error(`Invalid --voice-sample-map entry "${entry}". Use speaker=path/to/sample.mp3.`);
    }

    map.set(speaker, samplePath);
  }

  return map;
}

function parseCloneStyleMap(value) {
  const entries = splitList(value);
  const map = new Map();

  for (const entry of entries) {
    const separatorIndex = entry.indexOf('=');
    if (separatorIndex === -1) {
      throw new Error(`Invalid --clone-style-map entry "${entry}". Use speaker=style.`);
    }

    const speaker = entry.slice(0, separatorIndex).trim();
    const style = entry.slice(separatorIndex + 1).trim();
    if (!speaker || !style) {
      throw new Error(`Invalid --clone-style-map entry "${entry}". Use speaker=style.`);
    }

    if (!CLONE_STYLE_PROMPTS[style]) {
      throw new Error(`Unknown clone style "${style}" for speaker "${speaker}". Available: ${Object.keys(CLONE_STYLE_PROMPTS).join(', ')}`);
    }

    map.set(speaker, style);
  }

  return map;
}

function createPayload(profile, text, seed, voiceSample, promptOverride, assistantPrefix = '') {
  const prompt = `${promptOverride || profile.prompt}${EXACT_SPEECH_INSTRUCTION}`;
  const assistantContent = `${assistantPrefix}${text}`;

  if (voiceSample) {
    return {
      model: MODELS.voiceClone,
      messages: [
        { role: 'user', content: prompt },
        { role: 'assistant', content: assistantContent },
      ],
      audio: {
        format: 'mp3',
        voice: voiceSample,
      },
    };
  }

  const payload = {
    model: MODELS.voiceDesign,
    messages: [
      { role: 'user', content: prompt },
      { role: 'assistant', content: assistantContent },
    ],
    audio: { format: 'mp3' },
  };

  if (Number.isFinite(seed)) {
    payload.seed = seed;
  }

  return payload;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postTts(apiKey, payload) {
  let lastError;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const json = await response.json();
      const audioData = json.choices?.[0]?.message?.audio?.data;
      if (!audioData) {
        throw new Error('No audio data returned by MiMo.');
      }

      return Buffer.from(audioData.split(',').pop(), 'base64');
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  throw lastError;
}

function printHelp() {
  console.log(`
Usage:
  node scripts/generate_voice_mimo.js --scene 02 --dry-run
  node scripts/generate_voice_mimo.js --scene 02 --speaker narrator
  node scripts/generate_voice_mimo.js --scene 02 --speaker lysthea --ids CH1_S02_D003 --sample-seeds 7,42,100,777,9999
  node scripts/generate_voice_mimo.js --scene 02 --ids CH1_S02_D003 --seed 100 --overwrite
  node scripts/generate_voice_mimo.js --scene 01 --speaker aeterna --voice-sample tmp/aeterna_master.mp3 --overwrite
  node scripts/generate_voice_mimo.js --scene 01 --voice-sample-map narrator=tmp/aeterna_master.mp3,aeterna=tmp/aeterna_master.mp3 --overwrite
  node scripts/generate_voice_mimo.js --standalone aeterna_master_neutral --overwrite

Options:
  --scene 02              Chapter 1 scene number to parse.
  --standalone NAME       Generate a single predefined sample, e.g. aeterna_master_neutral.
  --out PATH              Optional output path for standalone generation.
  --speaker lysthea       Optional speaker filter. Defaults to all voiced non-system lines.
  --ids A,B               Optional comma-separated dialogue IDs.
  --seed 100              Override seed for generated files.
  --unseeded              Omit seed from the MiMo payload.
  --sample-seeds A,B      Generate audition files with the given seeds.
  --voice-sample PATH     Use MiMo voiceclone with one .mp3/.wav sample for all matched lines.
  --voice-sample-map MAP  Use MiMo voiceclone per speaker, e.g. narrator=a.mp3,aeterna=a.mp3.
  --clone-style NAME      Optional voiceclone style prompt. Available: restrained, lysthea_cool, aeterna_memory_timing, aeterna_memory_tight_timing, lysthea_cool_tight, lysthea_shield_command, lysthea_reverent_tears, lysthea_warm_relief, lysthea_soft_controlled, lysthea_calm_flat, aeterna_close_warm, aeterna_close_controlled, aeterna_sacred_farewell, aeterna_sacred_controlled.
  --clone-style-map MAP   Optional style per speaker, e.g. lysthea=lysthea_cool.
  --assistant-prefix TEXT Optional audio/style tag prefix inserted only in the TTS assistant text.
  --variant NAME          Write scene outputs as *_NAME.mp3 without changing scene source paths.
  --overwrite             Replace existing target files.
  --dry-run               Print what would be generated without calling the API.
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.scene && !args.standalone)) {
    printHelp();
    return;
  }

  loadEnv();

  const speakerFilter = args.speaker && args.speaker !== true ? String(args.speaker) : null;
  const idFilter = new Set(splitList(args.ids));
  const sampleSeeds = splitList(args['sample-seeds']).map(Number);
  const dryRun = Boolean(args['dry-run']);
  const overwrite = Boolean(args.overwrite);
  const variant = args.variant && args.variant !== true ? String(args.variant) : null;
  const cloneStyle = args['clone-style'] && args['clone-style'] !== true ? String(args['clone-style']) : null;
  const assistantPrefix = args['assistant-prefix'] && args['assistant-prefix'] !== true ? String(args['assistant-prefix']) : '';
  const cloneStyleMap = parseCloneStyleMap(args['clone-style-map']);
  const voiceSamplePath = args['voice-sample'] && args['voice-sample'] !== true
    ? String(args['voice-sample'])
    : null;
  const voiceSampleMap = parseVoiceSampleMap(args['voice-sample-map']);

  if (voiceSamplePath && voiceSampleMap.size > 0) {
    throw new Error('Use either --voice-sample or --voice-sample-map, not both.');
  }

  if ((voiceSamplePath || voiceSampleMap.size > 0) && sampleSeeds.length > 0) {
    throw new Error('Voiceclone does not use seed audition. Remove --sample-seeds when using voice samples.');
  }

  if (cloneStyle && !CLONE_STYLE_PROMPTS[cloneStyle]) {
    throw new Error(`Unknown --clone-style "${cloneStyle}". Available: ${Object.keys(CLONE_STYLE_PROMPTS).join(', ')}`);
  }

  if (cloneStyle && cloneStyleMap.size > 0) {
    throw new Error('Use either --clone-style or --clone-style-map, not both.');
  }

  const encodedGlobalVoiceSample = voiceSamplePath && !dryRun
    ? encodeVoiceSample(voiceSamplePath)
    : null;
  const encodedVoiceSampleMap = new Map();
  if (!dryRun) {
    for (const [speaker, samplePath] of voiceSampleMap.entries()) {
      encodedVoiceSampleMap.set(speaker, encodeVoiceSample(samplePath));
    }
  }

  const apiKey = process.env.MIMO_API_KEY;
  if (!dryRun && !apiKey) {
    throw new Error('MIMO_API_KEY not found in .env.');
  }

  if (args.standalone) {
    const standaloneName = String(args.standalone);
    const sample = STANDALONE_SAMPLES[standaloneName];
    if (!sample) {
      throw new Error(`Unknown standalone sample "${standaloneName}". Available: ${Object.keys(STANDALONE_SAMPLES).join(', ')}`);
    }

    const profile = VOICE_PROFILES[sample.speaker];
    if (!profile) {
      throw new Error(`No voice profile for standalone speaker "${sample.speaker}".`);
    }

    const seed = resolveSeed({ id: standaloneName }, profile, args, undefined);
    const outPath = targetPathForStandalone(sample, args);
    const voiceSample = encodedGlobalVoiceSample || encodedVoiceSampleMap.get(sample.speaker) || null;
    const voiceModeLabel = voiceSample
      ? `voiceclone:${voiceSamplePath || voiceSampleMap.get(sample.speaker)}`
      : Number.isFinite(seed) ? seed : 'unseeded';

    if (!overwrite && fs.existsSync(outPath)) {
      console.log(`Skip existing ${standaloneName} (${voiceModeLabel}): ${path.relative(process.cwd(), outPath)}`);
      return;
    }

    console.log(`Generate ${standaloneName} [${sample.speaker}] (${voiceModeLabel}) -> ${path.relative(process.cwd(), outPath)}`);

    if (dryRun) {
      return;
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const sampleCloneStyle = cloneStyle || cloneStyleMap.get(sample.speaker);
    const payload = createPayload(
      profile,
      sample.text,
      seed,
      voiceSample,
      voiceSample ? CLONE_STYLE_PROMPTS[sampleCloneStyle] : null,
      assistantPrefix,
    );
    const buffer = await postTts(apiKey, payload);
    fs.writeFileSync(outPath, buffer);
    return;
  }

  const { file: sceneFile } = sceneFileFromArg(args.scene);
  if (!fs.existsSync(sceneFile)) {
    throw new Error(`Scene file not found: ${sceneFile}`);
  }

  const dialogues = parseDialogues(sceneFile).filter((dialogue) => {
    if (dialogue.speaker === 'system') {
      return false;
    }

    if (speakerFilter && dialogue.speaker !== speakerFilter) {
      return false;
    }

    if (idFilter.size > 0 && !idFilter.has(dialogue.id)) {
      return false;
    }

    return true;
  });

  if (dialogues.length === 0) {
    console.log('No matching voiced dialogue lines found.');
    return;
  }

  for (const dialogue of dialogues) {
    const profile = VOICE_PROFILES[dialogue.speaker];
    if (!profile) {
      console.warn(`Skipping ${dialogue.id}: no voice profile for speaker "${dialogue.speaker}".`);
      continue;
    }

    const hasVoiceSample = Boolean(voiceSamplePath || voiceSampleMap.has(dialogue.speaker));

    if (
      !hasVoiceSample &&
      sampleSeeds.length === 0 &&
      profile.seed === null &&
      args.seed === undefined &&
      !args.unseeded
    ) {
      console.warn(
        `Skipping ${dialogue.id}: speaker "${dialogue.speaker}" has no approved seed yet. Use --sample-seeds, --seed, or --unseeded.`,
      );
      continue;
    }

    const seedsToGenerate = sampleSeeds.length > 0 ? sampleSeeds : [undefined];

    for (const sampleSeed of seedsToGenerate) {
      const seed = resolveSeed(dialogue, profile, args, sampleSeed);
      const outPath = targetPathFor(dialogue, sampleSeed, variant);
      const voiceSample = encodedGlobalVoiceSample || encodedVoiceSampleMap.get(dialogue.speaker) || null;
      const voiceModeLabel = hasVoiceSample
        ? `voiceclone:${voiceSamplePath || voiceSampleMap.get(dialogue.speaker)}`
        : Number.isFinite(seed) ? seed : 'unseeded';

      if (!overwrite && fs.existsSync(outPath)) {
        console.log(`Skip existing ${dialogue.id} (${voiceModeLabel}): ${path.relative(process.cwd(), outPath)}`);
        continue;
      }

      console.log(`Generate ${dialogue.id} [${dialogue.speaker}] (${voiceModeLabel}) -> ${path.relative(process.cwd(), outPath)}`);

      if (dryRun) {
        continue;
      }

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      const dialogueCloneStyle = cloneStyle || cloneStyleMap.get(dialogue.speaker);
      const payload = createPayload(
        profile,
        dialogue.text,
        seed,
        voiceSample,
        voiceSample ? CLONE_STYLE_PROMPTS[dialogueCloneStyle] : null,
        assistantPrefix,
      );
      const buffer = await postTts(apiKey, payload);
      fs.writeFileSync(outPath, buffer);
      await sleep(500);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
