# Aetheria Chapter 1 Story and Dialogue Audit

Date: 2026-07-05, Asia/Jakarta.

Scope:

- Source files audited: `src/data/chapter-1/scenes/s00.ts` through `s05.ts`.
- Focus: story logic, plot progression, character voice, dialogue delivery, VN pacing, BGM/voice interaction, and technical dialogue risks.
- This is a review only. No scene files were changed.

## Research Basis / Rubric

This audit uses the following practical principles from storytelling/dialogue references:

- Dialogue should do more than one thing at a time: reveal character, move plot, expose relationship, or create tension. Source: [Dialogue in writing](https://en.wikipedia.org/wiki/Dialogue_in_writing).
- Exposition works best when it is the minimum needed and distributed through action/context instead of delivered as a large infodump. Source: [Exposition (narrative)](https://en.wikipedia.org/wiki/Exposition_%28narrative%29).
- Subtext matters: the audience should infer some meaning from what characters do not explicitly say. Source: [Subtext](https://en.wikipedia.org/wiki/Subtext).
- Pacing is not just event time; it is how much narrative weight a moment receives. Dialogue/action speed things up, narration/introspection slow them down. Source: [Pace (narrative)](https://en.wikipedia.org/wiki/Pace_%28narrative%29).
- Visual novels rely heavily on character interaction, text boxes, CG/backgrounds, sound, and player-click pacing, so line length and voice timing matter more than in prose. Source: [Visual novel](https://en.wikipedia.org/wiki/Visual_novel).
- Character dialogue consistency depends on persona and relationship context, not only plot facts. Sources: [Telling Stories through Multi-User Dialogue by Modeling Character Relations](https://arxiv.org/abs/2105.15054) and [A Benchmark for Understanding and Generating Dialogue between Characters in Stories](https://arxiv.org/abs/2209.08524).
- A useful Pixar-derived lens: clear structure, clear stakes, character opinions/voice, and audience-facing purpose. Source: [Creative Bloq summary of Pixar storytelling rules](https://www.creativebloq.com/art/animation/why-the-pixar-rules-of-storytelling-are-as-relevant-in-2026-as-they-were-15-years-ago).

## Executive Summary

Overall story shape is strong.

Chapter 1 currently has a clean emotional spine:

```text
Aetheria world intro
-> Aeterna's quiet mechanic life
-> Lysthea arrives with a crisis
-> Aeterna casually reveals impossible capability
-> assassin attack forces memory unlock
-> Aeterna/Lysthea reunion
-> flashback explains Genesis, damaged divinity, Earth recovery, and Lysthea's 10,000-year vigil
```

The main strengths:

- Aeterna's core contrast works: cosmic creator hidden inside a lazy, peaceful mechanic.
- Lysthea's arc works: panicked stranger -> shocked witness -> reverent old guardian.
- The tech/magic language gives the project a distinct identity.
- Scene 3 into Scene 4 has a strong emotional escalation and BGM-backed cinematic landing.
- Scene 4 now preserves the correct lore: Aeterna created Aetheria, broke his divinity/Origin Code, cast his soul to Earth to recover, lost memory/power, and returns after 10,000 years.

The main risks:

- Two important Scene 3 bridge lines have text but no `voiceSrc`: `CH1_S03_D008_B` and `CH1_S03_D009_B`.
- Scene 3 contains mojibake/corrupted dash characters in several displayed strings.
- Some `voiceTextEn` and displayed text diverge so much that the voiced reveal may feel smaller than the written reveal.
- The glossary is dense: `Origin Rune`, `Origin Code`, `Root Access`, `Admin Privileges`, `Defense Server`, `System`, `Genesis`, `Pantheon`, `server`, `patch`, `reboot`. This is cool, but it needs consistency.
- Several lines have actual voice much longer than `autoAdvanceDelay`; this is okay only if voice-driven playback is active and not ignored.
- Scene 5 is currently an empty montage shell. That may be intentional, but story-wise it does not yet pay off "10,000 years" visually/textually.

## Priority Findings

### P0 - Scene 3 has two active text lines with no voice

Detected:

```text
s03.ts CH1_S03_D008_B narrator
Pancaran sihir ini... rasanya terlalu familier. Seakan ia dirangkai dari... tanganku sendiri.

s03.ts CH1_S03_D009_B narrator
Untaian kode emas... memori dari sepuluh ribu tahun yang lalu... mengalir deras menghancurkan segel di dalam ingatanku.
```

Why this matters:

- These are not filler lines. They are the conceptual bridge from "Lysthea blocks attack" to "Aeterna remembers everything."
- If they are silent while surrounding lines are voiced, the reveal sequence can feel broken.
- `D009_B` also carries the 10,000-year memory cue, so losing voice weakens the pivot into Scene 4.

Recommendation:

- Add/regenerate `voiceSrc` for both.
- Keep Aeterna/narrator voice.
- Use compact `voiceTextEn`.

Suggested spoken forms:

```text
CH1_S03_D008_B
This magic... it feels familiar. As if it was woven by my own hands.

CH1_S03_D009_B
Golden code, memories from ten thousand years ago, flooded through me and shattered the seal.
```

### P0 - Mojibake in Scene 3 text

Detected examples:

```text
Untaian kode emasâ€”memori dari sepuluh ribu tahun yang laluâ€”...
Tidak mungkin... Kauâ€”
```

Why this matters:

- It will display as broken characters in the VN.
- It makes the most important reveal sequence look technically broken.
- It may also confuse TTS if copied into voice generation later.

Recommendation:

- Replace mojibake with ASCII-safe punctuation or proper Unicode dash consistently.
- Since the repo mostly uses ASCII-friendly source, safest form:

```text
Untaian kode emas - memori dari sepuluh ribu tahun yang lalu - mengalir...
Tidak mungkin... Kau-
```

Better literary form if Unicode is accepted:

```text
Untaian kode emas - memori dari sepuluh ribu tahun yang lalu - mengalir...
Tidak mungkin... Kau...
```

For voice, avoid trailing broken dashes; use ellipses.

### P0 - Scene 3 `ignoreVoiceDuration` can cut critical long voice

Detected:

```text
CH1_S03_D008 delay 6.80s, actual voice 15.36s, ignoreVoiceDuration: true
CH1_S03_D009 delay 4.20s, actual voice 14.08s, ignoreVoiceDuration: true
```

Why this matters:

- If `ignoreVoiceDuration: true` is honored, these voices may be interrupted by auto-advance.
- These lines are the memory-unlock ramp. Cutting them would damage comprehension.

Recommendation:

- Either remove `ignoreVoiceDuration` for these two lines, or regenerate/trim the audio to fit the delay.
- Given story importance, prefer shorter `voiceTextEn` plus regenerate, then keep line voice-driven.

### P1 - `voiceTextEn` typo in Scene 1

Detected:

```text
CH1_S01_D009
voiceTextEn: "Thirteen magicseals just to emit a dim light?!"
```

Why this matters:

- TTS may pronounce `magicseals` as one unnatural word.
- User previously noticed pronunciation issues.

Recommendation:

```text
Thirteen magic seals just to emit a dim light?
```

### P1 - Scene 3 D014 voiced reveal is too compressed compared to UI text

Displayed:

```text
This Absolute Access... Authority from the core of creation... You... are the Weaver of Fate? The Grand Architect from ten thousand years ago?
```

Spoken:

```text
This authority... You are the Weaver of Fate?
```

Why this matters:

- The UI reveal says "Grand Architect from ten thousand years ago"; the voice omits that.
- Because this is a voiced VN, many players will emotionally process the voice more than the text.
- The shorter voice may underplay the scope of the reveal.

Recommendation:

Use a medium spoken line that preserves the reveal without dragging:

```text
This authority... You are the Weaver of Fate. The Grand Architect from ten thousand years ago?
```

### P1 - Scene 4 is strong, but several voices exceed delays

Examples:

```text
CH1_S04_D005_A delay 4.70s, actual 6.62s
CH1_S04_D007   delay 6.30s, actual 7.52s
CH1_S04_D012_A delay 3.80s, actual 5.60s
CH1_S04_D012_B delay 4.00s, actual 5.12s
CH1_S04_D013_B delay 4.60s, actual 6.08s
```

Why this matters:

- If Scene 4 is voice-driven, this may be fine and cinematic.
- If any later change reintroduces fixed timing or `ignoreVoiceDuration`, these will desync/cut.
- The current BGM continues from Scene 3, so total Scene 4 duration affects music landing.

Recommendation:

- Do not change everything.
- Only tune line-by-line after listening against BGM.
- Preserve the current cinematic feel unless a line obviously drags.

### P1 - Terminology density is high

Terms used in Chapter 1:

```text
Aetheria
The Void
Pantheon
Genesis
Origin Code
Origin Rune
Root Access
Admin Privileges
Defense Server
System
server
patch
reboot
memory leak
override command
Weaver of Fate
Grand Architect / Sang Arsitek
Goddess of Order
```

Strength:

- This gives Aetheria a unique magitech/cyber-divine flavor.

Risk:

- Too many capitalized concepts in a short span can make the player memorize vocabulary instead of feeling the scene.

Recommendation:

- Create a glossary rule:
  - `Origin Code` = Aeterna's divine soul/core.
  - `Origin Rune` = world/system-level structure Lysthea maintains.
  - `System` = Aetheria's operating layer.
  - `Admin Privileges`/`Root Access` = authority metaphor.
- Avoid introducing multiple new proper nouns in the same emotional line.

## Scene-by-Scene Story Review

## Scene 0 - Aetheria Prologue

Purpose:

- Establish Aetheria as a magitech dimension.
- Give visual scale before the story narrows into Aeterna's workshop.

What works:

- Three-line structure is clean and cinematic.
- The world hook is clear: physics obeys magic, civilization uses cyber circuits and mana crystals, magic is daily technology.
- Good opening because it gives the audience "genre rules" quickly.

Risks:

- It is pure exposition, but this is acceptable for a cinematic prologue if the visuals carry it.
- It does not yet imply the central tragedy or Aeterna's connection to Aetheria. This is not a flaw, but adding one faint thematic hint could make the later reveal feel seeded.

Optional improvement:

```text
Sihir bukan lagi dongeng mistis. Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari - dan tak seorang pun ingat siapa yang pertama kali memberinya bentuk.
```

Use only if you want earlier foreshadowing. Current version is already clean.

## Scene 1 - Aeterna's Quiet Life

Purpose:

- Establish Aeterna's second life as peaceful and mundane.
- Build contrast between cosmic identity and current mechanic identity.
- Show his technical genius through the Aether-bulb repair.

What works:

- The peaceful baby/parents/workshop montage gives emotional grounding.
- Aeterna's line "No prophecy, no Demon King..." is good genre subversion.
- The repair sequence efficiently shows competence without revealing full divinity.
- Rain/tea/night atmosphere sets a calm baseline before Scene 2 intrusion.

Risks:

- The parents' death/inheritance is compressed. It works as montage, but it is emotionally skipped.
- The line "two puluh tiga tahun" is informative but not emotionally alive.
- The repair metaphor "mengurai benang kusut" is strong and should be preserved.
- `voiceTextEn` typo `magicseals` should be fixed.

Character voice:

- Aeterna reads as calm, low-energy, slightly smug, and fond of quiet life. This is consistent with later "tired creator" identity.
- His "cash is fine" pragmatism in Scene 2 is set up well by the mechanic-life framing.

Recommendation:

- Keep Scene 1 mostly intact.
- Only fix pronunciation/typo and consider trimming any overly long pauses.

## Scene 2 - The Uninvited Guest

Purpose:

- Introduce Lysthea as an urgent problem-bearer.
- Show Aeterna solving a high-stakes problem casually.
- Create Lysthea's first suspicion that he is impossible.
- End with a comedic/character beat: Aeterna asks for payment.

What works:

- Knock + storm + panicked visitor is a classic and effective inciting incident.
- The Defense Server/core problem gives immediate stakes.
- Aeterna's diagnostic language makes him feel like a magitech engineer rather than a generic wizard.
- Lysthea's inner shock after the repair is effective.
- The final payment line is excellent character contrast: world-shaking power, mundane bill.

Risks:

- Lysthea says a lot of system information very quickly while panicked.
- "Defense Server", "Origin Rune", "reboot", "elite division" all arrive close together.
- D012 has a huge delay compared to actual voice: `What?!` is about 1.12s but delay is 10.12s. This can be powerful if the CG holds shock, but awkward if the screen feels empty.
- Aeterna fixes the core so easily that the danger may feel fake unless Lysthea's reaction sells how impossible it was.

Recommendation:

- Keep the structure.
- Consider making Lysthea's panic line slightly more human before the technical explanation.
- If D012 feels too long in playback, reduce delay or add a visual/SFX beat.

Possible rewrite direction for D007:

```text
Ini core pelindung distrik ketujuh. Kalau gagal reboot, seluruh barrier distrik akan runtuh.
```

This is shorter and more urgent while preserving stakes.

## Scene 3 - The Revelation

Purpose:

- Interrupt the payment joke with real danger.
- Let Lysthea protect Aeterna.
- Use Lysthea's magic resonance to unlock Aeterna's memories.
- Reveal Aeterna as Weaver of Fate / Grand Architect.
- Reconnect Aeterna and Lysthea emotionally.
- Start the BGM-backed transition into the Genesis flashback.

What works:

- The jump from "ten silver coins" to assassin attack is strong.
- Lysthea protecting him before knowing he is the Architect is good relationship action.
- Aeterna remembering through Lysthea's magic is emotionally correct: she is not just exposition, she is the key.
- The finger snap and assassin disintegration are strong power-reveal staging.
- Aeterna's "Stand up... Goddess of Order" is excellent: calm, intimate, revealing.
- The apology and thanks to Lysthea are emotionally earned.
- D023 "You haven't changed" is a soft decompression beat that keeps the scene from becoming only lore.

Major risks:

- `D008_B` and `D009_B` lack `voiceSrc`, despite being essential memory bridge lines.
- Mojibake appears in the 10,000-year memory line and assassin cutoff.
- `D008` and `D009` have `ignoreVoiceDuration: true` despite very long actual voices, creating possible cut-off risk.
- `D014` voiceText omits "Grand Architect from ten thousand years ago."
- `D022` is a little long and expository, but its content is important because it says Aeterna's original power has not fully recovered.
- `D018` says he only just remembered everything; this is good because it prevents him from seeming deceitful earlier.

Story logic:

- The cause of memory return is clear enough: Lysthea's familiar magic breaks the seal.
- The reveal sequence can become much clearer if the two currently silent lines are voiced.
- The Abyss threat is established, but the assassin itself is disposable. That is okay for a first reveal, but later chapters should make the Abyss feel smarter or more dangerous.

Recommendation:

- Treat Scene 3 as highest-priority polish area.
- Fix technical issues before rewriting story.
- Keep the emotional beats exactly: Lysthea protects, Aeterna remembers, assassin dies instantly, Lysthea kneels, Aeterna gently recognizes her.

Suggested `voiceTextEn` tuning:

```text
CH1_S03_D008_B
This magic... it feels familiar. As if it was woven by my own hands.

CH1_S03_D009_B
Golden code, memories from ten thousand years ago, flooded through me and shattered the seal.

CH1_S03_D014
This authority... You are the Weaver of Fate. The Grand Architect from ten thousand years ago?

CH1_S03_D022
I figured. No system runs forever without maintenance. My memories just returned, and my original power is still incomplete.
```

## Scene 4 - The Genesis

Purpose:

- Explain the ancient origin of Aetheria.
- Show Aeterna's motivation: he wanted a real world, not emptiness.
- Show the cost: divinity/Origin Code breaks.
- Establish why he had to leave for Earth.
- Establish Lysthea's oath and 10,000-year guardianship.

What works:

- The current lore is correct and emotionally coherent.
- Aeterna's motive is wonderfully simple: tired of nothingness, wants a blue sky.
- This simplicity humanizes a godlike creator.
- Lysthea's role is clear: assistant/order guardian, emotionally loyal, entrusted with the cube/system.
- The D009_B merge is a good move: Earth/recovery/cube instruction now lands as one coherent command.
- Ending on Lysthea's oath and 10,000-year solitude is strong.

Risks:

- Some voices exceed delays, but this may be acceptable because the scene is cinematic/voice-driven.
- D011_B "Her voice trembled..." tells emotion immediately after Lysthea asks a clearly emotional question. It may be redundant if voice acting already carries it.
- D012_A/D012_B/D013_B are emotionally important but all run longer than their old delays. Keep only if the BGM landing still feels good.
- `Admin Privileges` and `Root Access` are cool, but if overused they can reduce mythic emotion into pure jargon. Scene 4 mostly avoids overuse now.

Story logic:

- The Earth recovery explanation is now clear.
- It preserves that Earth is a magicless dimension where Aeterna recovers as a mortal.
- It also preserves Lysthea's 10,000-year wait.

Recommendation:

- Do not broadly rewrite Scene 4.
- Tune only lines that sound wrong in playback.
- If one narration line must be cut for pacing, consider D011_B first, because the voice acting and CG may already communicate Lysthea's trembling.

## Scene 5 - 10,000 Years Montage

Purpose according to title:

- "Flashback - The 10,000 Years"
- Cinematic montage / ending sequence.

Current state:

- No dialogues.
- `mode: "cinematic_montage"`.
- `bgm: ""`, so it likely continues prior BGM unless the montage code stops it elsewhere.

Story risk:

- If Scene 5 is meant to be the payoff for Lysthea guarding the system alone, it currently has no textual/emotional beats in scene data.
- It may rely entirely on montage component/assets. If that component exists and works, no issue.
- If not, the audience jumps from "guarding alone for ten thousand years" to chapter end without seeing the burden.

Recommendation:

- Audit the cinematic montage implementation/assets separately.
- If no montage content exists, add 3-5 silent visual beats or short captions, not heavy narration.

Possible caption beats:

```text
Tahun-tahun pertama, ia masih menghitung hari.
Lalu abad-abad berlalu, dan doa berubah menjadi rutinitas.
Sistem retak berkali-kali. Lysthea menambalnya sendirian.
Namun janji itu tidak pernah ia lepaskan.
```

Use only if the montage is currently empty in practice.

## Character Voice Audit

## Aeterna

Current identity:

- Peaceful mechanic.
- Dry humor.
- Lazy/calm surface.
- Hidden cosmic authority.
- Prefers practical fixes over grand speeches.

Strong lines:

```text
No holy prophecy...
Thirteen magic seals just to emit a dim light?
That'll be ten Silver Coins.
Stand up. It's been a while... Goddess of Order.
I'm sorry for making you wait.
```

Risk:

- In Scene 4, Aeterna can become too narratorial if every line is solemn.
- His best voice is calm, close, tired, and gently ironic.

Guidance:

- Keep him understated.
- Avoid big heroic delivery.
- Let the contrast between mundane mechanic and divine authority do the work.

## Lysthea

Current identity:

- Noble, formal, loyal.
- Panicked when responsible for a failing system.
- Protective in combat.
- Reverent after recognizing Aeterna.
- Emotionally restrained even when crying.

Strong lines:

```text
Please open the door!
The barrier will collapse if the system fails to reboot!
I will handle this.
You are the Weaver of Fate?
You haven't changed at all, Grand Architect.
I swear it.
```

Risk:

- If TTS is too expressive, she loses the cool noble aura.
- If TTS is too flat, her 10,000-year grief does not land.

Guidance:

- Her default should be controlled.
- Panic should be sharp but not childish.
- Reverence should be soft, dignified, and restrained.

## Abyssal Assassin

Current identity:

- Plot catalyst, not full character yet.
- Exists to force reveal.

What works:

- Short, direct threat.
- Dies quickly, emphasizing Aeterna's authority.

Risk:

- The Abyss may feel generic unless later scenes give it motive/intelligence.

Guidance:

- For this scene, keep the assassin short.
- In later chapters, let the Abyss act strategically, not only as monster attacks.

## Voice / Timing Technical Audit

Missing voice files:

```text
voiceSrc total: 83
missing total: 0
```

Important distinction:

- No referenced `voiceSrc` files are missing.
- But some text lines have no `voiceSrc` at all.

Text lines without `voiceSrc`:

```text
CH1_S03_D008_B
CH1_S03_D009_B
```

Low/medium bitrate notes:

- Scene 4 is mostly healthy at about 129-132 kbps.
- Scene 0 is about 130 kbps.
- Scene 1 and Scene 2 contain many files around 50-65 kbps.
- 50-65 kbps can still be acceptable for MiMo output, but if any line sounds radio-ish, re-encode/regenerate at 128k before judging acting.
- Avoid 32 kbps finals. This already caused the "radio" issue before.

Timing risks:

```text
CH1_S03_D008 delay 6.80s, actual 15.36s, ignoreVoiceDuration true
CH1_S03_D009 delay 4.20s, actual 14.08s, ignoreVoiceDuration true
CH1_S03_D010 delay 9.40s, actual 12.80s
CH1_S03_D011 delay 10.10s, actual 11.52s
CH1_S03_D013 delay 11.40s, actual 13.60s
CH1_S03_D022 delay 9.80s, actual 12.32s
```

Scene 4 timing risks:

```text
CH1_S04_D005_A delay 4.70s, actual 6.62s
CH1_S04_D007 delay 6.30s, actual 7.52s
CH1_S04_D011_B delay 2.30s, actual 3.68s
CH1_S04_D012_A delay 3.80s, actual 5.60s
CH1_S04_D012_B delay 4.00s, actual 5.12s
CH1_S04_D013_B delay 4.60s, actual 6.08s
```

Interpretation:

- These are not automatically wrong if voice-driven behavior controls advance.
- They become dangerous if `ignoreVoiceDuration` is used or if the player disables voice.
- For BGM-backed scenes, actual runtime matters more than `autoAdvanceDelay`.

## Recommended Fix Order

1. Fix `CH1_S03_D008_B` and `CH1_S03_D009_B` voice coverage.

2. Fix mojibake in Scene 3.

3. Fix `CH1_S01_D009` `voiceTextEn` typo:

```text
magicseals -> magic seals
```

4. Re-check `ignoreVoiceDuration` on `CH1_S03_D008` and `CH1_S03_D009`.

5. Re-audition Scene 3 D008 through D016 as one continuous sequence with SFX and BGM.

6. Re-audition Scene 3 D015 through Scene 4 D016 as the full emotional/BGM sequence.

7. Only after story/voice feels good, clean orphan audio files.

8. Audit Scene 5 montage implementation.

## Suggested Small Rewrite Set

Do not apply all automatically. These are targeted suggestions.

### Scene 1 D009 voice only

```text
Thirteen magic seals just to emit a dim light?
```

### Scene 2 D007 UI/text optional

Current is understandable but slightly dense.

Possible:

```text
Ini core pelindung distrik ketujuh. Kalau gagal reboot, seluruh barrier distrik akan runtuh.
```

### Scene 3 D008_B

```text
Pancaran sihir ini... terlalu familier. Seolah dirangkai oleh tanganku sendiri.
```

TTS:

```text
This magic... it feels familiar. As if it was woven by my own hands.
```

### Scene 3 D009_B

```text
Untaian kode emas - memori dari sepuluh ribu tahun yang lalu - mengalir deras, menghancurkan segel di dalam ingatanku.
```

TTS:

```text
Golden code, memories from ten thousand years ago, flooded through me and shattered the seal.
```

### Scene 3 D014

TTS:

```text
This authority... You are the Weaver of Fate. The Grand Architect from ten thousand years ago?
```

### Scene 3 D022

TTS:

```text
I figured. No system runs forever without maintenance. My memories just returned, and my original power is still incomplete.
```

### Scene 4 D011_B optional deletion candidate

Current:

```text
Suaranya bergetar menahan tangis.
```

Reason to consider deletion:

- The surrounding line, CG, and voice acting may already show this.
- Removing it would make the farewell flow more direct.

Reason to keep:

- It gives Aeterna's narration tenderness and pauses the scene before his answer.

Recommendation:

- Keep for now unless playback feels redundant.

## Final Assessment

The chapter is working. It has a clear identity and emotional direction.

Most fixes should be surgical:

- technical cleanup,
- missing voice coverage,
- typo/mojibake repair,
- one or two voiceTextEn improvements,
- and BGM-sequence playback checks.

Avoid broad rewrites. The strongest parts are already the delicate ones: Aeterna's quietness, Lysthea's restrained devotion, and the contrast between cyber-system language and divine melancholy.

The next best step is not "more drama"; it is making sure the existing drama is delivered cleanly, consistently, and without technical interruptions.
