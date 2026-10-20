import { bibleBooks } from '../data/bibleBooks';
import type { BibleBook } from '../types/bible';

// Même ordre canonique que bibleBooks ; les numéros restent visibles pour
// distinguer notamment Jean de 1, 2 et 3 Jean sur les petits écrans.
const shortNames = {
  fr: 'Gn|Ex|Lv|Nb|Dt|Jos|Jg|Rt|1 S|2 S|1 R|2 R|1 Ch|2 Ch|Esd|Né|Est|Jb|Ps|Pr|Ec|Ct|Es|Jr|Lm|Ez|Dn|Os|Jl|Am|Ab|Jon|Mi|Na|Ha|So|Ag|Za|Ml|Mt|Mc|Lc|Jn|Ac|Rm|1 Co|2 Co|Ga|Ep|Ph|Col|1 Th|2 Th|1 Tm|2 Tm|Tt|Phm|Hé|Jc|1 P|2 P|1 Jn|2 Jn|3 Jn|Ap'.split('|'),
  en: 'Gen|Ex|Lev|Num|Deut|Josh|Judg|Ruth|1 Sam|2 Sam|1 Kgs|2 Kgs|1 Chr|2 Chr|Ezra|Neh|Esth|Job|Ps|Prov|Eccl|Song|Isa|Jer|Lam|Ezek|Dan|Hos|Joel|Amos|Obad|Jonah|Mic|Nah|Hab|Zeph|Hag|Zech|Mal|Matt|Mark|Luke|John|Acts|Rom|1 Cor|2 Cor|Gal|Eph|Phil|Col|1 Th|2 Th|1 Tim|2 Tim|Titus|Phlm|Heb|Jas|1 Pet|2 Pet|1 Jn|2 Jn|3 Jn|Rev'.split('|'),
};

export function getBookAbbreviation(book: BibleBook, language: string): string {
  const index = bibleBooks.findIndex(item => item.name === book.name);
  const names = language === 'fr' ? shortNames.fr : shortNames.en;
  return names[index] ?? (language === 'fr' ? book.nameFr : book.nameEn);
}
