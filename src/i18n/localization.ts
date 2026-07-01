import type { Language } from '../stores/settingsStore';
import type { DialogueLine, Scene } from '../types';

// ─── UI String Translations ──────────────────────────────────────────

const uiStrings: Record<string, Record<Language, string>> = {
  // Settings
  'settings.title': { en: 'Settings', id: 'Pengaturan' },
  'settings.textSpeed': { en: 'Text Speed', id: 'Kecepatan Teks' },
  'settings.textSpeed.slow': { en: 'Slow', id: 'Lambat' },
  'settings.textSpeed.normal': { en: 'Normal', id: 'Normal' },
  'settings.textSpeed.fast': { en: 'Fast', id: 'Cepat' },
  'settings.language': { en: 'Language', id: 'Bahasa' },
  'settings.language.en': { en: 'English', id: 'Inggris' },
  'settings.language.id': { en: 'Indonesian', id: 'Indonesia' },
  'settings.info': {
    en: 'Settings are saved automatically. Click anywhere on the story screen to advance dialogue.',
    id: 'Pengaturan tersimpan otomatis. Klik di mana saja pada layar cerita untuk melanjutkan dialog.',
  },
  'settings.backToMenu': { en: 'Back to Main Menu', id: 'Kembali ke Menu Utama' },

  // Landing
  'landing.start': { en: 'Start New Game', id: 'Mulai Permainan Baru' },
  'landing.continue': { en: 'Continue', id: 'Lanjutkan' },

  // Common
  'common.settings': { en: 'Settings', id: 'Pengaturan' },
  'common.evidence': { en: 'Evidence', id: 'Bukti' },
  'common.back': { en: 'Back', id: 'Kembali' },
  'common.confirm': { en: 'Confirm', id: 'Konfirmasi' },
  'common.cancel': { en: 'Cancel', id: 'Batal' },
  // Investigation screens
  'investigation.correlation': { en: 'Correlation', id: 'Korelasi' },
  'investigation.correlationDesc': { en: 'Evidence supports each other', id: 'Bukti saling mendukung' },
  'investigation.contextNeeded': { en: 'Needs Context', id: 'Perlu Konteks' },
  'investigation.contextNeededDesc': { en: 'Needs more info', id: 'Butuh info tambahan' },
  'investigation.irrelevant': { en: 'Irrelevant', id: 'Tidak Relevan' },
  'investigation.irrelevantDesc': { en: 'No connection', id: 'Tidak ada hubungan' },
  'investigation.weakCorrelation': { en: 'Weak Correlation', id: 'Korelasi Lemah' },
  'investigation.weakCorrelationDesc': { en: 'There is a link, but weak', id: 'Ada hubungan, tapi lemah' },
  'investigation.contradiction': { en: 'Contradiction', id: 'Kontradiksi' },
  'investigation.contradictionDesc': { en: 'Evidence conflicts', id: 'Bukti bertentangan' },
  'investigation.unknown': { en: 'Unknown', id: 'Belum Diketahui' },
  'investigation.unknownDesc': { en: 'Not yet analyzed', id: 'Belum dianalisis' },
  'investigation.noEvidence': { en: 'No evidence yet', id: 'Belum ada bukti' },
  'investigation.correlationLegend': { en: 'Correlation Legend', id: 'Legenda Korelasi' },
  'investigation.connectEvidence': { en: 'Connect Evidence', id: 'Hubungkan Bukti' },
  'investigation.selectSecondEvidence': { en: 'Select second evidence to connect', id: 'Pilih bukti kedua untuk menghubungkan' },
  'investigation.noEvidenceInCaseFile': { en: 'No evidence in Case File yet.', id: 'Belum ada bukti di Case File.' },
  'investigation.connectAndFindPatterns': { en: 'Connect evidence & find patterns', id: 'Hubungkan bukti & cari pola' },
  'investigation.connectBeforeConfront': { en: 'Connect related evidence on the detective board before using this for confrontation.', id: 'Hubungkan bukti terkait di detective board sebelum memakai bukti ini untuk konfrontasi.' },
  'investigation.backToHub': { en: 'Back to Hub', id: 'Kembali ke Hub' },
  'investigation.presentEvidence': { en: 'Present Evidence', id: 'Sodorkan Bukti' },
  'investigation.notAvailable': { en: 'Not available here', id: 'Tidak tersedia di sini' },
  'investigation.locked': { en: 'Locked (Talk first)', id: 'Terkunci (Ngobrol dulu)' },
  'investigation.pressWithEvidence': { en: 'Press with evidence', id: 'Tekan dengan bukti' },
  'investigation.caseFileEmpty': { en: 'Case file is empty. Start exploring the school.', id: 'Case file masih kosong. Mulai keliling sekolah.' },
  'investigation.selectEvidence': { en: 'Select Evidence', id: 'Pilih Berkas' },
  'investigation.evaluateEvidence': { en: 'Evaluate Evidence', id: 'Evaluasi Bukti' },
  'investigation.selectReference': { en: 'Select Reference File', id: 'Pilih Berkas Referensi' },
  'investigation.evidenceNotEnough': { en: 'This evidence is not enough to inspect that claim.', id: 'Bukti ini belum cukup untuk memeriksa klaim tersebut.' },
  'investigation.back': { en: 'Back', id: 'Kembali' },
  'common.clickToContinue': { en: 'Click to continue', id: 'Klik untuk lanjut' },
  'common.continue': { en: 'Continue', id: 'Lanjut' },

  // Speaker names
  'speaker.narrator': { en: 'Narrator', id: 'Narator' },
  'speaker.system': { en: 'System', id: 'Sistem' },
  'speaker.aeterna': { en: 'Aeterna', id: 'Aeterna' },
  'speaker.lysthea': { en: 'Lysthea', id: 'Lysthea' },
  'speaker.abyssal_assassin': { en: 'Abyssal Assassin', id: 'Abyssal Assassin' },
  'speaker.elf_neighbor': { en: 'Elf Neighbor', id: 'Tetangga Elf' },
};

// ─── Dialogue Translation Helpers ────────────────────────────────────

/**
 * Get localized text from a dialogue line.
 * If language is 'en' and textEn exists, returns textEn.
 * Otherwise falls back to the original `text` (Indonesian).
 */
export function getDialogueText(line: DialogueLine, language: Language): string {
  if (language === 'en' && line.textEn) {
    return line.textEn;
  }
  return line.text;
}

/**
 * Get localized scene title.
 */
export function getSceneTitle(scene: Scene, language: Language): string {
  if (language === 'en' && scene.titleEn) {
    return scene.titleEn;
  }
  return scene.title;
}

/**
 * Get localized scene location.
 */
export function getSceneLocation(scene: Scene, language: Language): string {
  if (language === 'en' && scene.locationEn) {
    return scene.locationEn;
  }
  return scene.location;
}

/**
 * Get localized speaker display name.
 */
export function getSpeakerName(speakerId: string, language: Language): string {
  const key = `speaker.${speakerId}`;
  if (uiStrings[key]) {
    return uiStrings[key][language];
  }
  // Fallback: capitalize the ID
  return speakerId.charAt(0).toUpperCase() + speakerId.slice(1).replace(/_/g, ' ');
}

/**
 * Get a localized UI string by key.
 */
export function getUIString(key: string, language: Language): string {
  if (uiStrings[key]) {
    return uiStrings[key][language];
  }
  return key;
}
