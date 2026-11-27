const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(id) {
  return typeof id === 'string' && UUID_REGEX.test(id);
}

// ==========================================
// YARDIMCI: KONU (TOPIC) BENZERLİK SKORU (%25)
// ==========================================
function calculateTopicScore(topicA, topicB) {
  const cleanA = typeof topicA === 'string' ? topicA.toLocaleLowerCase('tr-TR').trim() : '';
  const cleanB = typeof topicB === 'string' ? topicB.toLocaleLowerCase('tr-TR').trim() : '';

  // Henüz konu girilmemişse veya şemada topic alanı boşsa akışı engelleme
  if (!cleanA || !cleanB) {
    return 10;
  }

  // Birebir aynı konu girilmişse tam puan
  if (cleanA === cleanB) {
    return 25;
  }

  // Biri diğerini kapsıyorsa (Örn: "Ağaçlar ve Graflar" ile "Ağaçlar")
  if (cleanA.includes(cleanB) || cleanB.includes(cleanA)) {
    return 22;
  }

  // Ortak anahtar kelime kontrolü
  const wordsA = cleanA.split(/[\s,.-]+/).filter((w) => w.length > 3);
  const wordsB = cleanB.split(/[\s,.-]+/).filter((w) => w.length > 3);
  const hasSharedKeyword = wordsA.some((word) => wordsB.includes(word));

  if (hasSharedKeyword) {
    return 18;
  }

  return 0;
}

// ==========================================
// 1. UYUMLULUK SKORU HESAPLAYICI (%100 AĞIRLIKLI)
// ==========================================
function calculateCompatibilityScore(reqA, reqB) {
  let totalScore = 0;
  const breakdown = {};

  // 1. DERS UYUMLULUĞU (%25) - Zorunlu Havuz Filtresi
  if (!reqA.course_id || reqA.course_id !== reqB.course_id) {
    return {
      isMatchEligible: false,
      totalScore: 0,
      breakdown: { courseScore: 0 }
    };
  }
  totalScore += 25;
  breakdown.courseScore = 25;

  // 2. KONU UYUMLULUĞU (%25) - Konu bazlı eşleştirme (topic)
  const topicScore = calculateTopicScore(reqA.topic, reqB.topic);
  totalScore += topicScore;
  breakdown.topicScore = topicScore;

  // 3. SEVİYE UYUMLULUĞU (%15) - Şemadaki preferred_level alanı
  const levelScore = (reqA.preferred_level && reqA.preferred_level === reqB.preferred_level) ? 15 : 7;
  totalScore += levelScore;
  breakdown.levelScore = levelScore;

  // 4. KAYNAK TAMAMLAYICILIĞI (%15) - Şemadaki resources tablosu
  const resourcesA = Array.isArray(reqA.resources) ? reqA.resources : [];
  const resourcesB = Array.isArray(reqB.resources) ? reqB.resources : [];

  let resourceScore = 0;
  if (resourcesA.length > 0 && resourcesB.length > 0) {
    const hasComplementary = resourcesA.some((r) => !resourcesB.includes(r)) ||
                             resourcesB.some((r) => !resourcesA.includes(r));
    resourceScore = hasComplementary ? 15 : 10;
  } else if (resourcesA.length > 0 || resourcesB.length > 0) {
    resourceScore = 7;
  }
  totalScore += resourceScore;
  breakdown.resourceScore = resourceScore;

  // 5. ÇALIŞMA TERCİHİ (%10) - Şemadaki study_preferences alanı
  const preferenceScore = (reqA.study_preferences && reqA.study_preferences === reqB.study_preferences) ? 10 : 0;
  totalScore += preferenceScore;
  breakdown.preferenceScore = preferenceScore;

  // 6. GÜVENİLİRLİK PUANI (%10) - Şemadaki ratings tablosu (5 kriter ortalaması)
  const ratingA = Number(reqA.avg_rating || 0);
  const ratingB = Number(reqB.avg_rating || 0);

  let reliabilityScore = 0;
  if (ratingA > 0 && ratingB > 0) {
    const avgRating = (ratingA + ratingB) / 2;
    reliabilityScore = Math.round((Math.min(avgRating, 5) / 5) * 10);
  } else if (ratingA > 0 || ratingB > 0) {
    const singleRating = ratingA > 0 ? ratingA : ratingB;
    reliabilityScore = Math.round((Math.min(singleRating, 5) / 5) * 10);
  }
  totalScore += reliabilityScore;
  breakdown.reliabilityScore = reliabilityScore;

  return {
    isMatchEligible: totalScore >= 40,
    totalScore,
    breakdown
  };
}

// ==========================================
// 2. HAVUZDAKİ EN İYİ ADAYI BULAN FONKSİYON
// ==========================================
function findBestMatch(newRequest, pendingRequestsList) {
  let bestMatch = null;
  let highestScore = -1;

  for (const candidate of pendingRequestsList) {
    if (candidate.user_id === newRequest.user_id) continue;

    const result = calculateCompatibilityScore(newRequest, candidate);

    if (result.isMatchEligible && result.totalScore > highestScore) {
      highestScore = result.totalScore;
      bestMatch = {
        candidate,
        score: result.totalScore,
        breakdown: result.breakdown
      };
    }
  }

  return bestMatch;
}

// ==========================================
// YARDIMCI: RESOURCES VE RATINGS VERİLERİNİ ŞEMADAN ÇEKME
// ==========================================
async function enrichRequestsWithSchemaData(requests, courseId, db) {
  if (!requests || requests.length === 0) return [];

  const userIds = [...new Set(requests.map((r) => r.user_id))];
  const resourceMap = {};
  const ratingMap = {};

  try {
    const resQuery = await db.query(
      `SELECT user_id, resource_type
       FROM resources
       WHERE course_id = $1 AND user_id = ANY($2::uuid[])`,
      [courseId, userIds]
    );
    for (const row of resQuery.rows) {
      if (!resourceMap[row.user_id]) resourceMap[row.user_id] = [];
      resourceMap[row.user_id].push(row.resource_type);
    }
  } catch (err) {
    // Henüz kaynak kaydı yoksa akışı kesme
  }

  try {
    // Mevcut PostgreSQL şemasındaki reviewee_id ve 5 değerlendirme kriteri sütunu
    const ratingQuery = await db.query(
      `SELECT reviewee_id,
              AVG((course_contribution_score + communication_score + reliability_score + resource_sharing_score + study_harmony_score) / 5.0)::numeric(3,2) AS avg_rating
       FROM ratings
       WHERE reviewee_id = ANY($1::uuid[])
       GROUP BY reviewee_id`,
      [userIds]
    );
    for (const row of ratingQuery.rows) {
      ratingMap[row.reviewee_id] = Number(row.avg_rating);
    }
  } catch (err) {
    // Henüz değerlendirme kaydı yoksa akışı kesme
  }

  return requests.map((req) => ({
    ...req,
    resources: req.resources || resourceMap[req.user_id] || [],
    avg_rating: req.avg_rating ?? ratingMap[req.user_id] ?? 0
  }));
}

// ==========================================
// 3. VERİTABANI (POSTGRESQL) ENTEGRASYONU
// ==========================================
async function processMatchRequest(newRequest, db) {
  if (!isValidUUID(newRequest.id) || !isValidUUID(newRequest.user_id) || !isValidUUID(newRequest.course_id)) {
    throw new Error('Geçersiz PostgreSQL UUID formatı.');
  }

  // 1. Aynı derse ait aktif talepleri çek
  const pendingRequests = await db.query(
    `SELECT * FROM study_requests WHERE course_id = $1 AND is_active = TRUE AND user_id != $2`,
    [newRequest.course_id, newRequest.user_id]
  );

  if (pendingRequests.rows.length === 0) {
    return { success: false };
  }

  // 2. Şemadaki resources ve ratings verilerini taleplere ekle
  const [enrichedNewRequest] = await enrichRequestsWithSchemaData([newRequest], newRequest.course_id, db);
  const enrichedCandidates = await enrichRequestsWithSchemaData(pendingRequests.rows, newRequest.course_id, db);

  // 3. En yüksek skorlu adayı bul
  const bestMatch = findBestMatch(enrichedNewRequest, enrichedCandidates);

  // 4. Eşleşme bulunduysa matches tablosuna yaz ve talepleri pasife çek
  if (bestMatch) {
    const matchResult = await db.query(
      `INSERT INTO matches (user1_id, user2_id, study_request1_id, study_request2_id, compatibility_score)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        newRequest.user_id,
        bestMatch.candidate.user_id,
        newRequest.id,
        bestMatch.candidate.id,
        bestMatch.score
      ]
    );

    await db.query(
      `UPDATE study_requests SET is_active = FALSE WHERE id IN ($1, $2)`,
      [newRequest.id, bestMatch.candidate.id]
    );

    return {
      success: true,
      match: matchResult.rows[0],
      breakdown: bestMatch.breakdown
    };
  }

  return { success: false };
}

module.exports = {
  isValidUUID,
  calculateTopicScore,
  calculateCompatibilityScore,
  findBestMatch,
  processMatchRequest
};
