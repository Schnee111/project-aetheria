# Aetheria Chapter 1 Narrative Continuity Audit

Date: 2026-07-05.

Scope:

- Audited `src/data/chapter-1/scenes/s00.ts` through `s05.ts`.
- Audited montage data in `src/data/chapter-1/montage.ts`.
- Focus is story clarity, reveal order, character knowledge, plot delivery, and whether the audience can follow the narrative.
- This document intentionally ignores voice-file decisions that are already intentional, such as two dialogue cards sharing one long audio file.

## Correction From Previous Audit

The previous audit over-focused on technical voice coverage and incorrectly treated some intentional choices as problems.

Corrections:

- `CH1_S03_D008_B` and `CH1_S03_D009_B` can be valid without `voiceSrc` if they intentionally share one long audio across adjacent dialogue cards.
- `CH1_S01_D009` using `magicseals` in `voiceTextEn` is not a story issue because it is hidden from the player and may be intentional for TTS pronunciation.
- Scene 5 is not empty. It uses `src/data/chapter-1/montage.ts` and has a full cinematic montage sequence.
- The earlier mojibake concern was not valid for the story text currently shown in `s03.ts`; the source now displays proper em dashes in the relevant story lines. There is mojibake in some comments/UI glyphs elsewhere, but that is not the core narrative issue.

## Rubric Used

For this audit, the useful lens is not "does every file exist?" but:

- Who knows this information at this point?
- Does the player know this information yet?
- Is the speaker label leaking information before the story reveals it?
- Does the narrator use names/titles before the POV could know them?
- Is the title/name reveal staged as an emotional moment, or accidentally spoiled?
- Does each scene answer the question it raises before moving on?
- Are the tech/fantasy terms introduced in an order the player can follow?

## Executive Summary

The chapter's big-picture arc is understandable and emotionally strong:

```text
Aetheria is a magitech world
-> Aeterna lives as a quiet mechanic
-> a panicked woman brings a defense-core crisis
-> Aeterna fixes it too easily
-> an Abyssal attacker forces a memory unlock
-> Aeterna recognizes Lysthea
-> the story flashes back to Genesis, Aeterna's broken divinity, Earth recovery, and Lysthea's 10,000-year vigil
-> montage shows the long wait, Abyss invasion, Earth parallel, and truck impact
```

The biggest narrative risks are not the core plot. The core plot works. The risks are reveal-order and POV clarity:

1. The story never gives Lysthea an in-world introduction before her name appears in speaker labels and narration.
2. Aeterna/narrator calls her `Grand Saintess` before the audience has been told she holds that role.
3. The speaker UI itself reveals `Lysthea` from her first spoken line, so the player's knowledge is ahead of Aeterna's unless that is intentional.
4. The assassin says "Relik itu" before the story has clearly established what "the relic" is.
5. The Earth recovery -> Aetheria rebirth/return path is mostly inferable, but could use one cleaner connective sentence.

These are fixable with small wording/staging changes. The story does not need a rewrite.

## Timeline of Knowledge

### Scene 0

Player learns:

- Aetheria exists.
- It is a dimension where magic is technology.
- Civilization runs on cyber circuits and mana crystals.

Player does not learn:

- Aeterna created Aetheria.
- Aetheria has a system/Origin Rune.
- Earth is involved.
- Lysthea exists.

Assessment:

- Clean world primer.
- No continuity issue.

### Scene 1

Player learns:

- The protagonist is Aeterna.
- He was reborn/started a "new life" in a warm crib.
- He was raised by mid-class Magitech mechanics.
- He is now 23.
- He likes quiet, mundane life.
- He is unusually good with magical circuits.

Aeterna appears to know:

- His current life as a mechanic.
- His repair skill.
- Nothing about his former divine identity yet.

Assessment:

- Scene 1 works as a false-normal baseline.
- The line "my new life began" is useful foreshadowing.
- Because Scene 4/5 later reveal Earth, players may retroactively read this as "after Earth recovery, he returned/reincarnated into Aetheria."

Potential clarity risk:

- Scene 1 says he was born in Aetheria and lived 23 years there, while Scene 4 says he cast his soul to Earth. The montage shows Earth and truck impact, but the exact path "Earth recovery -> return/rebirth in Aetheria" is implicit.
- This is acceptable as mystery, but after the reveal it may need one clean bridge.

Suggested future bridge, not necessarily in Scene 1:

```text
Di dunia tanpa sihir itu, jiwaku akan pulih sebagai manusia biasa... sampai takdir menarikku kembali ke Aetheria.
```

English idea:

```text
In that world without magic, my soul would recover as an ordinary human... until fate pulled me back to Aetheria.
```

### Scene 2

Player learns:

- A woman arrives in panic.
- She needs a mechanic.
- She carries a crystal core from the Seventh District Defense Server.
- The district barrier may collapse.
- Aeterna fixes it casually.
- The woman is shocked because even her elite division would need days.

Player does not get in-world:

- Her name.
- Her title.
- Her actual status.
- Why she has access to a defense-server core.

What the UI currently reveals:

- Her speaker is `lysthea`, and localization maps that to `Lysthea`.
- So the player sees her name before the story introduces it.

Assessment:

- Plot delivery is easy to follow: emergency object -> repair -> shock.
- Character dynamic is good: she is urgent; he is calm/practical.
- But her identity reveal is not staged. The UI gives the name away immediately.

Is this automatically bad?

- No, many VNs show a character's name from the beginning.
- But if the intended experience is "mysterious woman later revealed as Lysthea / Goddess of Order," then the current UI undermines that.

Options:

1. If early name display is okay:
   - Keep `speaker: "lysthea"`.
   - Accept that the reveal is not "her name is Lysthea"; the reveal is "she is Goddess of Order / ancient guardian."

2. If the name should be hidden:
   - Add a speaker alias like `mysterious_woman`.
   - Use it through Scene 2 and early Scene 3.
   - Switch to `lysthea` after Aeterna recognizes her or after she is named.

Recommended if prioritizing story reveal:

```text
Scene 2 speaker label: "Wanita Berjubah" / "Mysterious Woman"
After CH1_S03_D016 or after a dedicated intro line: switch to "Lysthea"
```

### Scene 3

Player learns:

- The woman is attacked by an Abyssal Assassin.
- Lysthea protects Aeterna.
- Her magic resonates with his soul.
- Aeterna's memories return.
- He is the Weaver of Fate / Grand Architect.
- He recognizes her as Goddess of Order.
- She has been maintaining the System for 10,000 years.
- Abyss found a flaw in the Origin Rune.

This scene is emotionally the strongest part, but it has the most reveal-order issues.

## Key Continuity Issue 1: `Grand Saintess` appears too early

Current line:

```text
CH1_S03_D007
Sang Grand Saintess melompat ke depanku...
```

Problem:

- The audience has not been told she is the Grand Saintess.
- Aeterna, at this exact moment, has not recovered his memories yet.
- If this is first-person limited narration, he should not know the title yet.
- If this is retrospective narration, it is technically allowed, but it still spoils the title before the scene has earned it.

Why it matters:

- "Grand Saintess" is a status/title reveal.
- It should either be introduced before the attack or saved until after recognition.
- Right now the title appears as if the narrator and player already know who she is.

Best fix direction:

- Before reveal, describe visually or neutrally.
- After reveal, use her title.

Suggested replacement:

```text
Wanita berjubah itu melompat ke depanku, melepaskan gelombang sihir perlindungan yang begitu murni untuk menahan serangan iblis itu.
```

Or, if the player should infer status from costume:

```text
Wanita berjubah suci itu melompat ke depanku...
```

Then later, after Aeterna remembers:

```text
Sang Grand Saintess menundukkan kepalanya...
```

That makes `Grand Saintess` feel like a confirmed identity instead of premature narration.

## Key Continuity Issue 2: Aeterna/narrator uses `Lysthea` before diegetic recognition

Current line:

```text
CH1_S03_D009
Resonansi energi Lysthea bertindak layaknya kunci dekripsi.
```

Problem:

- Up to this point, she has never introduced herself in dialogue.
- Aeterna has not yet fully remembered everything until D010.
- The UI may show the name, but the character/POV does not yet have an in-world reason to use it.

Possible defense:

- The narration is retrospective, told by Aeterna after he knows who she is.
- If that is the chosen narration style, this is acceptable.

Why it still may feel off:

- The line happens inside the memory-unlock moment, so using "Lysthea" one beat before "Aku... mengingat segalanya" can feel like the narration jumps ahead too early.

Recommended if using limited moment-to-moment POV:

```text
Resonansi energi wanita itu bertindak layaknya kunci dekripsi.
```

Or:

```text
Resonansi energi sihirnya bertindak layaknya kunci dekripsi.
```

Then after D016, using `Lysthea` is fully justified.

## Key Continuity Issue 3: Lysthea never introduces herself

Current flow:

- Scene 2: she asks for help.
- Scene 3: fight/reveal happens.
- Aeterna calls her `Goddess of Order`.
- Aeterna later thanks her by name: `Lysthea`.
- But she never says "I am Lysthea" or gives any title.

This can be intentional if:

- Aeterna remembering her is the introduction.
- The player is allowed to know her name via UI from the beginning.

But if the goal is clean audience comprehension:

- Add one small identity beat either before or after the reveal.

Low-impact option before the repair:

```text
Lysthea: Saya... Lysthea, dari pengelola Defense Server distrik ketujuh. Tolong, waktunya tidak banyak.
```

This is functional, but it weakens the mystery.

Better option after reveal:

```text
Aeterna: Lama tidak berjumpa... Lysthea, Goddess of Order.
```

This names her and titles her in one emotional beat.

Current line:

```text
Lama tidak berjumpa... Goddess of Order.
```

Suggested if you want clarity:

```text
Lama tidak berjumpa... Lysthea, Goddess of Order.
```

Pros:

- The player gets the name/title reveal in one place.
- It explains why Aeterna can later say "Lysthea."
- It keeps the reveal emotional.

Cons:

- If the UI already shows Lysthea, the name part is redundant but still satisfying.

## Key Continuity Issue 4: `Relik itu` is unclear

Current assassin line:

```text
Ketemu kau... Relik itu... Hancurlah bersamanya!
```

Question raised:

- What relic?
- Is it the defense core?
- Is it Lysthea's cube?
- Is it Aeterna?
- Is it an Origin Rune fragment?

Why it matters:

- This is the assassin's motive line.
- If the target/object is unclear, the attack feels cool but not fully motivated.

Options:

1. If the relic is the crystal core:

```text
Ketemu kau... Core itu... Hancurlah bersamanya!
```

2. If the relic is an Origin Rune shard inside the core:

Seed it in Scene 2:

```text
Ini core pelindung distrik ketujuh... di dalamnya ada fragmen Origin Rune.
```

Then assassin's "Relik itu" works.

3. If the relic is Aeterna's dormant authority:

The line should imply the assassin senses him, not the object:

```text
Ketemu kau... sisa otoritas itu... hancurlah bersamanya!
```

Recommendation:

- Clarify what the assassin is hunting.
- Best minimal fix is to change "Relik itu" to the exact object already present: "core itu" or "Origin Rune itu."

## Key Continuity Issue 5: Why does Lysthea call him `Engineer`?

Current:

```text
Mundur, Engineer!
```

This is mostly fine.

Reason:

- She came looking for a mechanic.
- Aeterna has just repaired the defense core.
- Calling him "Engineer" is a practical label, not hidden knowledge.

Optional nuance:

- In Indonesian text, "Engineer" mixed with Indonesian dialogue can feel stylized. That is consistent with the magitech/cyber language.
- If you want smoother Indonesian, use `Mekanik` before reveal and reserve `Engineer` as her personal nickname after.

Potential future payoff:

- Lysthea calling him `Engineer` before the reveal and `Arsitek` after the reveal is a nice relationship marker.
- Current story already does this reasonably well.

## Key Continuity Issue 6: Earth recovery -> Aetheria return/rebirth needs one stronger connective cue

Current relevant lines:

```text
Scene 1:
Kisah hidupku di dunia ini bermula...
Aku terlahir dari sepasang mekanik Magitech...

Scene 4:
Aku harus mengirim sisa jiwaku ke Bumi, dunia tanpa sihir.
Di sana aku bisa pulih sebagai manusia fana.

Montage:
Earth 2026 frames, traffic, crosswalk, truck hit.
```

What the player can infer:

- Aeterna's soul went to Earth.
- He lived/recovered there as a mortal.
- The truck impact likely triggers his return/rebirth into Aetheria.
- Scene 1 is the "return after 10,000 years" life in Aetheria.

Potential confusion:

- Scene 1 says he is born in Aetheria before the player knows Earth is involved.
- Scene 4 says Earth is where he recovers.
- The montage shows Earth, but without text/caption connecting Earth death to Aetheria rebirth.

This is not broken, but it is a comprehension risk.

Recommended small clarification in Scene 4 D009_B or D014:

```text
Di sana aku bisa pulih sebagai manusia fana... sampai takdir menarikku kembali ke Aetheria.
```

Or in English voice:

```text
There, I can recover as a mortal... until fate brings me back to Aetheria.
```

This single clause makes Scene 1 and Scene 5 connect cleanly.

## Scene 5 Montage Assessment

`src/data/chapter-1/montage.ts` is not empty. It has a complete visual arc:

1. Golden Age.
2. Departure.
3. Lonely millennia.
4. Abyss invasion and aftermath.
5. Endless winter.
6. Twin destinies: Earth/Aetheria parallel.
7. Impact.
8. Black screen.

This is structurally good.

What it communicates well:

- Time passes in large jumps.
- Lysthea remains alone.
- Aetheria decays/changes.
- Abyss becomes a larger threat.
- Earth and Aetheria timelines converge around year 9999.
- Truck impact likely triggers the transition into the protagonist's Aetheria life.

Potential risk:

- The montage has year labels but no narrative captions.
- If the CGs are strong enough, this is fine.
- If any CG is ambiguous, viewers may not understand that frames 25/27/30 are Earth-side Aeterna recovery/return setup.

Recommendation:

- Keep it visual if the images are clear.
- If playtesters get confused, add only minimal captions, not full narration.

Possible minimalist captions:

```text
EARTH: 2026
AETHERIA: YEAR 9999
```

You already have Earth/year display logic, so this may be enough.

## Readability of Main Plot

### What is easy to follow

- Aetheria is a magitech world.
- Aeterna is a mechanic who is secretly much more.
- Lysthea arrives because a district defense system is failing.
- Aeterna fixes it too easily.
- The Abyss attack forces the hidden divine identity to awaken.
- Aeterna and Lysthea knew each other 10,000 years ago.
- Lysthea kept the system alive alone.
- Aeterna left because staying would endanger Aetheria.
- Earth is a recovery dimension/world.

### What may be hard to follow

- Whether "Lysthea" is supposed to be a mystery or just a character name shown by UI.
- Why the narrator knows she is the Grand Saintess before the reveal.
- What exactly the assassin means by "Relik itu."
- How exactly Earth recovery leads to Aeterna's 23-year Aetheria mechanic life.
- Difference between `Origin Code` and `Origin Rune`.

## Recommended Fix Order

These are story fixes, not voice fixes.

### 1. Decide the Lysthea name-reveal policy

Option A: Player can know her name early.

- Keep speaker label `Lysthea`.
- Then make peace with the fact that name is not a reveal.
- The actual reveal becomes her role: `Goddess of Order`, ancient guardian, Grand Saintess.

Option B: Player should not know her name early.

- Add speaker alias `mysterious_woman`.
- Use it from Scene 2 through early Scene 3.
- Switch to `lysthea` after Aeterna says her name.

This is the biggest choice.

### 2. Avoid `Grand Saintess` before title reveal

Change early narrator references:

```text
Sang Grand Saintess
```

to:

```text
wanita berjubah itu
```

until after the reveal.

### 3. Put name + title reveal into Aeterna's recognition line

Current:

```text
Lama tidak berjumpa... Goddess of Order.
```

Clearer:

```text
Lama tidak berjumpa... Lysthea, Goddess of Order.
```

This single edit solves a lot of audience comprehension.

### 4. Clarify the assassin's target

Current:

```text
Relik itu
```

Choose one:

```text
core itu
Origin Rune itu
sisa otoritas itu
```

The right choice depends on what the assassin is actually hunting.

### 5. Add one bridge from Earth recovery to Aetheria return

Suggested concept:

```text
Di sana aku bisa pulih sebagai manusia fana... sampai takdir menarikku kembali ke Aetheria.
```

This makes Scene 1 + Scene 4 + montage click together.

### 6. Keep Scene 4 mostly intact

Scene 4's emotional/lore delivery is currently strong.

Do not over-rewrite it. Only add the Earth-return connective clause if needed.

## Verdict

The story is understandable in broad strokes, but the current version leaks identity information before the narrative earns it.

The biggest issue is not "does the player know the plot?" The player can follow the plot. The issue is "does the reveal feel clean?"

Right now:

- The UI reveals Lysthea's name early.
- The narrator reveals `Grand Saintess` early.
- The story later treats Aeterna naming her as an emotional recognition moment.

Those three things pull against each other.

Best minimal solution:

```text
1. Use neutral labels/descriptions before memory unlock.
2. Let Aeterna's "Lysthea, Goddess of Order" line be the true reveal.
3. Use "Grand Saintess" only after that.
4. Clarify what the assassin is targeting.
5. Add one clause connecting Earth recovery to eventual return to Aetheria.
```

With those small changes, the chapter's plot should be much easier to follow while preserving the current cinematic drama.
