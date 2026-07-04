# Aetheria Voice Tuning Handoff

Last updated: 2026-07-04, Asia/Jakarta.

This handoff is for continuing voice tuning in Project Aetheria, especially the cinematic stretch where the ending-theme BGM starts in Scene 3 and continues into Scene 4. It is intentionally detailed so the next Codex/Gemini session can continue without guessing or re-breaking the current scene flow.

## Current User Direction

- Work slowly, line by line or in very small groups.
- Preserve the cinematic drama. The user said the current Scene 4 is already cinematic and good; tuning should be careful, not a broad rewrite.
- Do not batch-regenerate a whole scene unless the user explicitly asks.
- Do not change Scene 4 lore. Aeterna built Aetheria, damaged his divinity/Origin Code, sent his remaining soul to Earth to recover, lost memory/power, and returns after 10,000 years in Aetheria time.
- If trimming voice, trim silence/pauses only. Do not hard-cut speech content.
- Avoid low-bitrate re-encoding. It made voices sound like radio/buzzing.

## Critical BGM Continuity

The dramatic BGM begins in Scene 3 at D015, not Scene 4:

```ts
// src/data/chapter-1/scenes/s03.ts
bgmOverride: "/assets/audio/bgm/last_song-supercell-ending_theme.mp3"
// On line: CH1_S03_D015
```

Current BGM file:

```text
public/assets/audio/bgm/last_song-supercell-ending_theme.mp3
```

Scene 4 has:

```ts
bgm: "",
```

Important runtime behavior:

- `StoryScreen` only calls `playBgm(currentBgm)` if `currentBgm` is truthy.
- `useBgm` keeps `globalBgm` playing until another BGM is played or `stop()` is called.
- Therefore, an empty `bgm` in Scene 4 does not stop the Scene 3 ending-theme BGM.
- Treat Scene 4 as part of the same music-backed cinematic sequence that starts at Scene 3 D015.

Implication:

- Do not tune Scene 4 in isolation. Audition from Scene 3 D014 onward if possible.
- Changing total voice pacing in Scene 4 changes how the dialogue lands against the ongoing song.
- Small line-level tuning is okay, but avoid broad timing surgery unless the user requests a full BGM-sync pass.

Relevant code:

```text
src/components/screens/StoryScreen.tsx
src/hooks/useAudio.ts
```

## Current Scene 4 Timing Model

Scene 4 is currently voice-driven. There are no active `ignoreVoiceDuration: true` flags in `s04.ts`.

That means:

- `autoAdvanceDelay` is still present on each line.
- But if voice playback is enabled, `DialogBox` can wait for the voice end before advancing.
- Long generated voice can extend total scene time.
- Shortened voice can make the scene tighter, unless `autoAdvanceDelay` still dominates in the component behavior.

Earlier audit:

- Fixed-delay sum was about 115s.
- Voice-driven total became about 140s after the full Scene 4 generation.
- User accepted the cinematic feel overall and asked only for tuning.

Practical rule:

- Keep the scene voice-driven for now.
- Do not re-add `ignoreVoiceDuration: true` casually.
- Do not bulk-change `autoAdvanceDelay` values while tuning voices.
- When a line feels too long, first try shorter `voiceTextEn` or internal pause compression.

## Current Scene 4 Source State

Scene file:

```text
src/data/chapter-1/scenes/s04.ts
```

Active flow notes:

- `CH1_S04_D002_B` was removed from scene flow.
- Its orphan audio file was deleted.
- `CH1_S04_D010` was removed from scene flow.
- `CH1_S04_D009_B` now contains the merged Earth/recovery/cube instruction.
- `CH1_S04_D013_A` was removed from scene flow after the user decided that dialog could be deleted.
- `CH1_S04_D016` is a hidden/empty black pause with no voice.

Current important merged line:

```text
CH1_S04_D009_B
UI Indonesian:
Aku harus mengirim sisa jiwaku ke Bumi, dunia tanpa sihir. Di sana aku bisa pulih sebagai manusia fana. Sampai aku kembali, pegang otoritas kubus ini.

UI English:
I must send my remaining soul to Earth, a world without magic. There, I can recover as a mortal. Until I return, hold this cube's authority.

TTS English:
I must send my soul to Earth, a world without magic. There, I can recover as a mortal. Until I return, hold this cube.
```

## Active Scene 4 Audio Table

Folder:

```text
public/assets/audio/voice/chapter-1/scene-04/
```

Active referenced files and measured metadata:

```text
ID              Delay ms  Voice duration  Bitrate   Notes
CH1_S04_D001    6600      6.57s           130 kbps  Narrator voiced by Aeterna.
CH1_S04_D002_A  5200      5.92s           130 kbps  Lysthea.
CH1_S04_D003_A  3500      4.30s           131 kbps  Aeterna.
CH1_S04_D003_B  4200      4.46s           130 kbps  Aeterna.
CH1_S04_D004_A  4300      4.56s           131 kbps  Narrator voiced by Aeterna.
CH1_S04_D004_B  3400      4.55s           130 kbps  Narrator voiced by Aeterna.
CH1_S04_D005_A  4700      6.62s           130 kbps  Lysthea.
CH1_S04_D005_B  2900      3.10s           131 kbps  Narrator voiced by Aeterna.
CH1_S04_D006    7600      5.81s           130 kbps  Narrator voiced by Aeterna.
CH1_S04_D007    6300      5.34s           130 kbps  Lysthea panic.
CH1_S04_D008_A  4300      5.51s           130 kbps  Aeterna.
CH1_S04_D008_B  4100      4.54s           131 kbps  Narrator voiced by Aeterna.
CH1_S04_D009_B  8200      8.66s           129 kbps  Merged D009_B + D010, compacted pauses.
CH1_S04_D011_A  5000      4.38s           131 kbps  Lysthea.
CH1_S04_D011_B  2300      2.78s           132 kbps  Narrator voiced by Aeterna.
CH1_S04_D012_A  3800      3.32s           131 kbps  Aeterna.
CH1_S04_D012_B  4000      4.81s           130 kbps  Aeterna.
CH1_S04_D013_B  4600      4.98s           130 kbps  Lysthea oath.
CH1_S04_D014    8000      6.21s           130 kbps  Narrator voiced by Aeterna.
CH1_S04_D015    8000      7.02s           130 kbps  Narrator voiced by Aeterna.
CH1_S04_D016    1500      no voice         n/a       Black pause.
```

Interpretation:

- Files around 129-132 kbps are acceptable.
- Avoid using files around 32 kbps as final. They can sound metallic/radio-like.
- `D009_B` is the latest known tuned file. It was compacted from 12.32s to 8.66s and re-encoded at 128k.

## D009_B Specific History

Files:

```text
CH1_S04_D009_B.mp3
CH1_S04_D009_B_precompact_backup.mp3
CH1_S04_D009_B_compact_128k_test.mp3
CH1_S04_D009_B_compact_test.mp3
```

Meaning:

- `CH1_S04_D009_B.mp3` is active and currently equals the compact 128k version.
- `CH1_S04_D009_B_precompact_backup.mp3` is the pre-compact generated version, about 12.32s and 54 kbps.
- `CH1_S04_D009_B_compact_128k_test.mp3` is the approved compact test source, about 8.66s and 129 kbps.
- `CH1_S04_D009_B_compact_test.mp3` is a low-bitrate test, about 8.66s and 32 kbps. Do not use it as final.

The low-bitrate compact test demonstrated the problem: FFmpeg default MP3 encoding can drop the file to about 32 kbps unless `-b:a 128k` is set.

## Bitrate Rules

Use these rules for all voice tuning:

- Preferred final MP3 bitrate: 128 kbps CBR or near 128-132 kbps as reported by `ffprobe`.
- Sample rate from MiMo files is usually 24000 Hz mono. Keeping 24 kHz mono is fine.
- Do not accept 32 kbps MP3 for final voice.
- Do not judge a trim result if the bitrate changed drastically; re-render at 128k first.
- If a voice sounds "mendengung", "radio", "metallic", or thinner than the master, check bitrate before blaming MiMo or the prompt.

Check duration and bitrate:

```powershell
ffprobe -v error -show_entries format=duration,bit_rate -of default=noprint_wrappers=1 public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B.mp3
```

Expected good-ish output format:

```text
duration=8.660250
bit_rate=129160
```

## Safe Silence / Pause Compression

Use pause compression only when:

- The generated performance is emotionally right.
- The line is too slow because of long internal pauses.
- The user asks to make the voice tighter without regenerating.

Do not use pause compression when:

- Words are wrong.
- There are extra hallucinated words.
- Pronunciation is wrong.
- Character identity or acting is wrong.

Safer command used for D009_B compact 128k:

```powershell
ffmpeg -y -i public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B.mp3 -af silenceremove=start_periods=1:start_duration=0.05:start_threshold=-46dB:start_silence=0.04:stop_periods=-1:stop_duration=0.24:stop_threshold=-46dB:stop_silence=0.12 -codec:a libmp3lame -b:a 128k public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B_compact_128k_test.mp3
```

What this does:

- Removes leading silence over threshold.
- Compresses internal/end silence segments longer than about 0.24s.
- Leaves about 0.12s silence so transitions still breathe.
- Forces MP3 encode to 128k.

If this is too aggressive:

```text
stop_duration=0.30
stop_silence=0.16
```

If this is too loose:

```text
stop_duration=0.20
stop_silence=0.10
```

Workflow:

1. Render to `*_compact_128k_test.mp3`.
2. Check duration/bitrate.
3. Let user listen.
4. If approved, copy test over active file.
5. Keep a `*_precompact_backup.mp3` first.

Example promote:

```powershell
Copy-Item -LiteralPath public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B.mp3 -Destination public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B_precompact_backup.mp3 -Force
Copy-Item -LiteralPath public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B_compact_128k_test.mp3 -Destination public\assets\audio\voice\chapter-1\scene-04\CH1_S04_D009_B.mp3 -Force
```

## MiMo Generation Setup

Script:

```text
scripts/generate_voice_mimo.js
```

Endpoint:

```text
https://token-plan-sgp.xiaomimimo.com/v1/chat/completions
```

Relevant models:

```text
mimo-v2.5-tts-voiceclone
mimo-v2.5-tts-voicedesign
```

Approved masters:

```text
public/assets/audio/voice/masters/aeterna_master_neutral_seed_7.mp3
public/assets/audio/voice/masters/lysthea_master_neutral_seed_21.mp3
public/assets/audio/voice/masters/lysthea_master_tense_cool_seed_21.mp3
```

User-selected character identity:

- Aeterna: master seed 7.
- Lysthea neutral: master seed 21.
- Lysthea tense/cool: master seed 21.

Generate one Scene 4 line:

```powershell
node scripts\generate_voice_mimo.js --scene 04 --ids CH1_S04_D009_B --voice-sample-map aeterna=public\assets\audio\voice\masters\aeterna_master_neutral_seed_7.mp3,lysthea=public\assets\audio\voice\masters\lysthea_master_neutral_seed_21.mp3 --overwrite
```

Generate an audition variant instead of overwriting:

```powershell
node scripts\generate_voice_mimo.js --scene 04 --ids CH1_S04_D009_B --voice-sample-map aeterna=public\assets\audio\voice\masters\aeterna_master_neutral_seed_7.mp3,lysthea=public\assets\audio\voice\masters\lysthea_master_neutral_seed_21.mp3 --variant test1 --overwrite
```

Prefer variants when the user has not approved replacing the active file.

## Script Features Added During This Work

`voiceTextEn`:

- `DialogueLine` supports `voiceTextEn?: string`.
- TTS speaks `voiceTextEn` if present.
- UI still displays `text` / `textEn`.
- Best tool for making a line shorter or more speakable without changing UI text.

`voiceSpeaker`:

- `DialogueLine` supports `voiceSpeaker?: string`.
- Useful when `speaker: "narrator"` should use Aeterna's cloned voice.
- Scene 4 uses this for Aeterna-narrated cinematic narration.

Exact speech instruction:

```text
Speak only the exact assistant text. Do not add, repeat, explain, translate, or improvise any words.
```

Reason:

- Some earlier MiMo outputs added extra words or repeated a line.
- If this still happens, discard the file and regenerate. Do not try to cut around hallucinated speech unless it is clearly isolated at the end and the remaining line is perfect.

## Character Voice Direction

### Aeterna

Core identity:

- Calm male.
- Cool, controlled, intimate.
- Tired divine authority, not theatrical announcer.
- Should not over-emote.
- Warmth appears in farewell/close-up moments, but still restrained.

Good style direction:

```text
low, calm, close, controlled, tired, gentle, sacred, compact
```

Avoid:

```text
epic, shouting, broken sobbing, overly theatrical, huge pauses, narrator trailer voice
```

### Lysthea

Core identity:

- Elegant, composed, noble.
- Protective and reverent, but not childish.
- Even in tears, she should retain dignity.
- Panic is allowed only when the CG clearly shows panic, but avoid uncontrolled screaming.

Good style direction:

```text
soft but controlled, noble, composed, breath tremble, restrained grief
```

For shield/combat:

```text
icy, focused, protective, command tone, not panicked
```

Avoid:

```text
anime squeal, over-crying, hysterical delivery, long sob pauses
```

## Scene 4 CG / Voice Pairing Notes

`cg_ch1_s05_01_void.png`

- Used by D001 and D015.
- Tone: mythic memory, distant, reflective.
- Aeterna narration should feel ancient and tired, not loud.

`cg_ch1_s05_04_lysthea_order.png`

- Used by D002_A.
- Lysthea is curious/formal.
- Should sound like an assistant/deity questioning the Architect, not panic.

`cg_ch1_s05_03_pantheon.png`

- Used by D003_A/D003_B.
- Aeterna explains his wish.
- Quiet longing is better than grand ambition.

`cg_ch1_s05_05_architect_kuil.png`

- Used by D004_A/D004_B.
- Genesis action.
- Narration can be sacred but compact.

`cg_ch1_s05_05b_lysthea_fading_smile.png`

- Used by D005_A/D005_B.
- Lysthea starts happy, then notices something wrong.
- D005_A may be brighter, D005_B should drop into concern.

`cg_ch1_s05_06b_cracking.png`

- Used by D006.
- Divinity cracking.
- Aeterna narration: tired, factual, controlled pain.

`cg_ch1_s05_06c_lysthea_panic.png`

- Used by D007.
- Lysthea can be alarmed, but keep her noble core.

`cg_ch1_s05_07_handover_cube.png`

- Used by D008_A, D008_B, D009_B.
- This is the cube handover.
- Aeterna should sound quiet and final.
- D009_B is currently the key tuned line. Do not expand it back into D010 unless the user changes direction.

`cg_ch1_s05_08a_lysthea_crying.png`

- Used by D011_A/D011_B.
- Lysthea grief. Keep restrained.

`cg_ch1_s05_08_lysthea_kneel.png`

- Used by D012_A/D012_B/D013_B.
- Kneeling oath and farewell.
- Aeterna is gentle; Lysthea is reverent but not melodramatic.

`cg_ch1_s05_09_aeterna_dissolve.png`

- Used by D014.
- Dissolution. Aeterna narration should not rush.

`ch1/bg_black`

- Used by D016.
- Empty pause. No voice.

## Known Removed / Orphan Files

Removed from active scene flow:

```text
CH1_S04_D002_B
CH1_S04_D010
CH1_S04_D013_A
```

File status:

- `CH1_S04_D002_B.mp3` was deleted.
- `CH1_S04_D010.mp3` still exists as an orphan unless cleaned later.
- `CH1_S04_D013_A.mp3` still exists as an orphan unless cleaned later.
- Old base files like `CH1_S04_D002.mp3`, `CH1_S04_D003.mp3`, etc. may exist from earlier versions and are not active unless referenced by `s04.ts`.

Do not delete orphan files during tuning unless the user asks for cleanup. They may be useful for comparison.

## Recommended Tuning Workflow For Scene 4 With BGM

1. Pick one problem line only.

2. Confirm the active source block in `s04.ts`:

```powershell
Select-String -Path src\data\chapter-1\scenes\s04.ts -Pattern "CH1_S04_D009_B" -Context 4,10
```

3. Decide the least destructive fix:

```text
Wrong words / extra words         -> regenerate
Too long because text is verbose  -> shorten voiceTextEn, regenerate
Good acting but too many pauses   -> compact pauses at 128k
Wrong character identity          -> regenerate with correct master/sample map
Radio/buzzy/metallic              -> check bitrate first
CG mismatch                       -> adjust style prompt or voiceTextEn, regenerate
```

4. If regenerating, create a variant first unless user explicitly wants overwrite.

5. Measure duration and bitrate.

6. Ask user to listen, or if user already gave permission to continue, promote only the line that was being tuned.

7. Run build after source edits:

```powershell
npm.cmd run build
```

Use `npm.cmd`, not `npm`, because PowerShell may block `npm.ps1`.

## Missing / Active Voice Audit Commands

Find missing `voiceSrc` across scenes:

```powershell
$missing = @()
$total = 0
Get-ChildItem -Path src\data\chapter-1\scenes -Filter s0*.ts | ForEach-Object {
  $sceneFile = $_
  $matches = Select-String -Path $sceneFile.FullName -Pattern 'voiceSrc: "([^"]+)"' -AllMatches
  foreach ($line in $matches) {
    foreach ($match in $line.Matches) {
      $total += 1
      $rel = $match.Groups[1].Value.TrimStart('/').Replace('/', '\')
      $local = Join-Path (Get-Location) ("public\$rel")
      if (-not (Test-Path -LiteralPath $local)) {
        $missing += "$($sceneFile.Name): $($match.Groups[1].Value)"
      }
    }
  }
}
"voiceSrc total: $total"
"missing total: $($missing.Count)"
$missing
```

Scene 4 active duration/bitrate table:

```powershell
$scene='src\data\chapter-1\scenes\s04.ts'
$lines=Get-Content $scene
$current=$null
$rows=@()
foreach($line in $lines){
  if($line -match 'id: "(CH1_S04_[^"]+)"'){
    $current=[ordered]@{id=$matches[1]; delay=''; voice=''; exists=''; duration=''; bitrate=''}
  } elseif($current -and $line -match 'autoAdvanceDelay: (\d+)'){
    $current.delay=$matches[1]
  } elseif($current -and $line -match 'voiceSrc: "([^"]+)"'){
    $current.voice=$matches[1]
    $path=Join-Path (Get-Location) ('public\' + $matches[1].TrimStart('/').Replace('/','\'))
    $current.exists=Test-Path -LiteralPath $path
    if($current.exists){
      $dur=ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 $path
      $br=ffprobe -v error -show_entries format=bit_rate -of default=nk=1:nw=1 $path
      $current.duration=('{0:N2}' -f [double]$dur)
      $current.bitrate=('{0:N0}' -f ([double]$br/1000))
    }
    $rows += [pscustomobject]$current
    $current=$null
  }
}
$rows | Format-Table -AutoSize
```

## Build Status

Last validation after D002_B cleanup and D009_B compact promotion:

```text
npm.cmd run build
```

Result:

```text
Success
```

## Current Best Hypothesis

For this project, good voice consistency comes from this order of priority:

1. Use the selected master voice sample for the character.
2. Keep prompts short and controlled.
3. Use `voiceTextEn` to make spoken lines natural and compact.
4. Avoid heavy emotional style prompts that create huge pauses.
5. Avoid low-bitrate FFmpeg output.
6. Tune in tiny batches against the CG and the ongoing BGM.

The key lesson from D009_B:

- A good performance can be made usable by pause compression.
- But the compression must be exported at 128k.
- Otherwise the timing improves while the voice quality gets worse.
