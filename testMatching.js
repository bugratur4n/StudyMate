const assert = require('assert');
const {
  isValidUUID,
  calculateCompatibilityScore,
  findBestMatch,
  processMatchRequest
} = require('./matchingService');

// Rana'nın seed dosyasındaki gerçek kullanıcı UUID'leri
const TUGBA_UUID  = 'b582767c-a2da-4a99-950b-e8f11048c907'; // Tuğba Özcan
const EREN_UUID   = '182aaec9-479f-4bde-a72f-65eebb492d9b'; // Eren Özcan
const HACER_UUID  = 'bdcf1e9e-77de-4d6e-8644-2ad83630dbfa'; // Hacer Keser

// Ders, talep ve eşleşme UUID'leri
const COURSE_UUID = '4f400cec-03cd-43ec-9f68-8c9d79c5ddeb';
const REQ_1_UUID  = 'd6b1a7ed-49ff-4a1f-8f8e-eb3d97b2aebc';
const REQ_2_UUID  = '09f8ca1b-0a07-4630-aae0-631913abab6f';
const REQ_3_UUID  = '7133f7d5-ce65-478f-891e-2e3f55b4772e';
const MATCH_UUID  = '9189549d-6c7a-4d50-a279-899ea73b6bdd';

// Tüm UUID'lerin PostgreSQL standardında olduğunu doğrula
[TUGBA_UUID, EREN_UUID, HACER_UUID, COURSE_UUID, REQ_1_UUID, REQ_2_UUID, REQ_3_UUID, MATCH_UUID].forEach((id) => {
  assert.strictEqual(isValidUUID(id), true, `Geçersiz UUID: ${id}`);
});

const mockDb = {
  query: async (sqlText, values) => {
    if (sqlText.includes('SELECT * FROM study_requests')) {
      return {
        rows: [
          {
            id: REQ_2_UUID,
            user_id: EREN_UUID,
            course_id: COURSE_UUID,
            preferred_level: 'Orta Seviye',
            study_preferences: 'Soru Çözümü',
            is_active: true
          },
          {
            id: REQ_3_UUID,
            user_id: HACER_UUID,
            course_id: COURSE_UUID,
            preferred_level: 'Başlangıç',
            study_preferences: 'Konu Anlatımı',
            is_active: true
          }
        ]
      };
    }
    if (sqlText.includes('FROM resources')) {
      return {
        rows: [
          { user_id: TUGBA_UUID, resource_type: 'PAST_EXAMS' },
          { user_id: EREN_UUID, resource_type: 'SUMMARY_NOTES' }
        ]
      };
    }
    if (sqlText.includes('FROM ratings')) {
      return {
        rows: [
          { rated_user_id: TUGBA_UUID, avg_rating: 4.8 },
          { rated_user_id: EREN_UUID, avg_rating: 4.6 }
        ]
      };
    }
    if (sqlText.includes('INSERT INTO matches')) {
      return {
        rows: [
          {
            id: MATCH_UUID,
            user1_id: values[0],
            user2_id: values[1],
            study_request1_id: values[2],
            study_request2_id: values[3],
            compatibility_score: values[4],
            is_active: true
          }
        ]
      };
    }
    if (sqlText.includes('UPDATE study_requests')) {
      return { rowCount: 2 };
    }
  }
};

async function runTests() {
  console.log('=== 1. SKOR VE ADAY SEÇİM TESTİ ===');
  const tugbaRequest = {
    id: REQ_1_UUID,
    user_id: TUGBA_UUID,
    course_id: COURSE_UUID,
    preferred_level: 'Orta Seviye',
    study_preferences: 'Soru Çözümü',
    resources: ['PAST_EXAMS'],
    avg_rating: 4.8
  };

  const erenRequest = {
    id: REQ_2_UUID,
    user_id: EREN_UUID,
    course_id: COURSE_UUID,
    preferred_level: 'Orta Seviye',
    study_preferences: 'Soru Çözümü',
    resources: ['SUMMARY_NOTES'],
    avg_rating: 4.6
  };

  const scoreResult = calculateCompatibilityScore(tugbaRequest, erenRequest);
  console.log('Skor Kırılımı (Tuğba & Eren):', scoreResult);
  assert.strictEqual(scoreResult.isMatchEligible, true);
  assert.strictEqual(scoreResult.totalScore, 99);

  const bestCandidate = findBestMatch(tugbaRequest, [erenRequest]);
  assert.strictEqual(bestCandidate.candidate.user_id, EREN_UUID);

  console.log('\n=== 2. VERİTABANI ENTEGRASYON TESTİ (GERÇEK UUID) ===');
  const sonuc = await processMatchRequest(tugbaRequest, mockDb);
  console.log('İŞLEM SONUCU:', sonuc);
  assert.strictEqual(sonuc.success, true);
  assert.strictEqual(sonuc.match.user1_id, TUGBA_UUID);
  assert.strictEqual(sonuc.match.user2_id, EREN_UUID);
  assert.strictEqual(sonuc.match.id, MATCH_UUID);

  console.log('\nTÜM TESTLER RANA SEED UUID VERİLERİYLE BAŞARIYLA GEÇTİ!');
}

runTests().catch((err) => {
  console.error('Test hatası:', err);
  process.exit(1);
});
