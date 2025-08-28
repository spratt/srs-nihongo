export interface CharacterRow {
  id: string;
  name: string;
  characters: string[];
  category: 'main' | 'dakuten' | 'handakuten' | 'combination';
}

export const hiraganaRows: CharacterRow[] = [
  // Main rows
  { id: 'vowels', name: 'Vowels', characters: ['あ', 'い', 'う', 'え', 'お'], category: 'main' },
  { id: 'k', name: 'K-row', characters: ['か', 'き', 'く', 'け', 'こ'], category: 'main' },
  { id: 's', name: 'S-row', characters: ['さ', 'し', 'す', 'せ', 'そ'], category: 'main' },
  { id: 't', name: 'T-row', characters: ['た', 'ち', 'つ', 'て', 'と'], category: 'main' },
  { id: 'n', name: 'N-row', characters: ['な', 'に', 'ぬ', 'ね', 'の'], category: 'main' },
  { id: 'h', name: 'H-row', characters: ['は', 'ひ', 'ふ', 'へ', 'ほ'], category: 'main' },
  { id: 'm', name: 'M-row', characters: ['ま', 'み', 'む', 'め', 'も'], category: 'main' },
  { id: 'y', name: 'Y-row', characters: ['や', 'ゆ', 'よ'], category: 'main' },
  { id: 'r', name: 'R-row', characters: ['ら', 'り', 'る', 'れ', 'ろ'], category: 'main' },
  { id: 'w', name: 'W-row', characters: ['わ', 'ゐ', 'ゑ', 'を'], category: 'main' },
  { id: 'n-consonant', name: 'N', characters: ['ん'], category: 'main' },
  
  // Dakuten rows
  { id: 'g', name: 'G-row', characters: ['が', 'ぎ', 'ぐ', 'げ', 'ご'], category: 'dakuten' },
  { id: 'z', name: 'Z-row', characters: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'], category: 'dakuten' },
  { id: 'd', name: 'D-row', characters: ['だ', 'ぢ', 'づ', 'で', 'ど'], category: 'dakuten' },
  { id: 'b', name: 'B-row', characters: ['ば', 'び', 'ぶ', 'べ', 'ぼ'], category: 'dakuten' },
  
  // Han-dakuten row
  { id: 'p', name: 'P-row', characters: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'], category: 'handakuten' },
  
  // Combination rows
  { id: 'kya', name: 'Kya-row', characters: ['きゃ', 'きゅ', 'きょ'], category: 'combination' },
  { id: 'sha', name: 'Sha-row', characters: ['しゃ', 'しゅ', 'しょ'], category: 'combination' },
  { id: 'cha', name: 'Cha-row', characters: ['ちゃ', 'ちゅ', 'ちょ'], category: 'combination' },
  { id: 'nya', name: 'Nya-row', characters: ['にゃ', 'にゅ', 'にょ'], category: 'combination' },
  { id: 'hya', name: 'Hya-row', characters: ['ひゃ', 'ひゅ', 'ひょ'], category: 'combination' },
  { id: 'mya', name: 'Mya-row', characters: ['みゃ', 'みゅ', 'みょ'], category: 'combination' },
  { id: 'rya', name: 'Rya-row', characters: ['りゃ', 'りゅ', 'りょ'], category: 'combination' },
  { id: 'gya', name: 'Gya-row', characters: ['ぎゃ', 'ぎゅ', 'ぎょ'], category: 'combination' },
  { id: 'ja', name: 'Ja-row', characters: ['じゃ', 'じゅ', 'じょ'], category: 'combination' },
  { id: 'dya', name: 'Dya-row', characters: ['ぢゃ', 'ぢゅ', 'ぢょ'], category: 'combination' },
  { id: 'bya', name: 'Bya-row', characters: ['びゃ', 'びゅ', 'びょ'], category: 'combination' },
  { id: 'pya', name: 'Pya-row', characters: ['ぴゃ', 'ぴゅ', 'ぴょ'], category: 'combination' },
];

export const katakanaRows: CharacterRow[] = [
  // Main rows
  { id: 'vowels', name: 'Vowels', characters: ['ア', 'イ', 'ウ', 'エ', 'オ'], category: 'main' },
  { id: 'k', name: 'K-row', characters: ['カ', 'キ', 'ク', 'ケ', 'コ'], category: 'main' },
  { id: 's', name: 'S-row', characters: ['サ', 'シ', 'ス', 'セ', 'ソ'], category: 'main' },
  { id: 't', name: 'T-row', characters: ['タ', 'チ', 'ツ', 'テ', 'ト'], category: 'main' },
  { id: 'n', name: 'N-row', characters: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'], category: 'main' },
  { id: 'h', name: 'H-row', characters: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'], category: 'main' },
  { id: 'm', name: 'M-row', characters: ['マ', 'ミ', 'ム', 'メ', 'モ'], category: 'main' },
  { id: 'y', name: 'Y-row', characters: ['ヤ', 'ユ', 'ヨ'], category: 'main' },
  { id: 'r', name: 'R-row', characters: ['ラ', 'リ', 'ル', 'レ', 'ロ'], category: 'main' },
  { id: 'w', name: 'W-row', characters: ['ワ', 'ヰ', 'ヱ', 'ヲ'], category: 'main' },
  { id: 'n-consonant', name: 'N', characters: ['ン'], category: 'main' },
  
  // Dakuten rows
  { id: 'g', name: 'G-row', characters: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'], category: 'dakuten' },
  { id: 'z', name: 'Z-row', characters: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'], category: 'dakuten' },
  { id: 'd', name: 'D-row', characters: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'], category: 'dakuten' },
  { id: 'b', name: 'B-row', characters: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'], category: 'dakuten' },
  { id: 'v', name: 'V', characters: ['ヴ'], category: 'dakuten' },
  
  // Han-dakuten row
  { id: 'p', name: 'P-row', characters: ['パ', 'ピ', 'プ', 'ペ', 'ポ'], category: 'handakuten' },
  
  // Combination rows
  { id: 'kya', name: 'Kya-row', characters: ['キャ', 'キュ', 'キョ'], category: 'combination' },
  { id: 'sha', name: 'Sha-row', characters: ['シャ', 'シュ', 'ショ'], category: 'combination' },
  { id: 'cha', name: 'Cha-row', characters: ['チャ', 'チュ', 'チョ'], category: 'combination' },
  { id: 'nya', name: 'Nya-row', characters: ['ニャ', 'ニュ', 'ニョ'], category: 'combination' },
  { id: 'hya', name: 'Hya-row', characters: ['ヒャ', 'ヒュ', 'ヒョ'], category: 'combination' },
  { id: 'mya', name: 'Mya-row', characters: ['ミャ', 'ミュ', 'ミョ'], category: 'combination' },
  { id: 'rya', name: 'Rya-row', characters: ['リャ', 'リュ', 'リョ'], category: 'combination' },
  { id: 'gya', name: 'Gya-row', characters: ['ギャ', 'ギュ', 'ギョ'], category: 'combination' },
  { id: 'ja', name: 'Ja-row', characters: ['ジャ', 'ジュ', 'ジョ'], category: 'combination' },
  { id: 'dya', name: 'Dya-row', characters: ['ヂャ', 'ヂュ', 'ヂョ'], category: 'combination' },
  { id: 'bya', name: 'Bya-row', characters: ['ビャ', 'ビュ', 'ビョ'], category: 'combination' },
  { id: 'pya', name: 'Pya-row', characters: ['ピャ', 'ピュ', 'ピョ'], category: 'combination' },
  
  // Extra katakana combinations
  { id: 'va', name: 'Va-row', characters: ['ヴァ', 'ヴィ', 'ヴェ', 'ヴォ'], category: 'combination' },
  { id: 'wi', name: 'Wi-row', characters: ['ウィ', 'ウェ', 'ウォ'], category: 'combination' },
  { id: 'fa', name: 'Fa-row', characters: ['ファ', 'フィ', 'フェ', 'フォ'], category: 'combination' },
  { id: 'tsa', name: 'Tsa-row', characters: ['ツァ', 'ツィ', 'ツェ', 'ツォ'], category: 'combination' },
  { id: 'she', name: 'She', characters: ['シェ'], category: 'combination' },
  { id: 'je', name: 'Je', characters: ['ジェ'], category: 'combination' },
  { id: 'che', name: 'Che', characters: ['チェ'], category: 'combination' },
];

export function getCharactersFromRows(rows: CharacterRow[], selectedRowIds: string[]): string[] {
  const characters: string[] = [];
  for (const row of rows) {
    if (selectedRowIds.includes(row.id)) {
      characters.push(...row.characters);
    }
  }
  return characters;
}