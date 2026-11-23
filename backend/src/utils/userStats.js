const db = require('../config/db');

const FREE_DAILY_SESSION_LIMIT = 3;
const FREE_SESSION_MINUTES = 20;
const PREMIUM_SESSION_MINUTES = 60;

async function getRatingSummary(userId) {
  const result = await db.query(
    `SELECT
       COUNT(*)::int AS rating_count,
       ROUND(AVG((
         COALESCE(communication_score, 0) +
         COALESCE(reliability_score, 0) +
         COALESCE(resource_sharing_score, 0) +
         COALESCE(study_harmony_score, 0) +
         COALESCE(course_contribution_score, 0)
       ) / GREATEST(
         (CASE WHEN communication_score IS NOT NULL THEN 1 ELSE 0 END) +
         (CASE WHEN reliability_score IS NOT NULL THEN 1 ELSE 0 END) +
         (CASE WHEN resource_sharing_score IS NOT NULL THEN 1 ELSE 0 END) +
         (CASE WHEN study_harmony_score IS NOT NULL THEN 1 ELSE 0 END) +
         (CASE WHEN course_contribution_score IS NOT NULL THEN 1 ELSE 0 END),
         1
       )), 2) AS average_rating
     FROM ratings
     WHERE reviewee_id = $1`,
    [userId]
  );

  const row = result.rows[0];
  return {
    rating_count: row.rating_count || 0,
    average_rating: row.average_rating ? Number(row.average_rating) : null
  };
}

async function getTodaysSessionCount(userId) {
  const result = await db.query(
    `SELECT COUNT(*)::int AS count
     FROM sessions s
     JOIN matches m ON s.match_id = m.id
     WHERE (m.user1_id = $1 OR m.user2_id = $1)
       AND s.start_time >= date_trunc('day', NOW())`,
    [userId]
  );

  return result.rows[0].count;
}

function getSessionDurationMinutes(isPremium) {
  return isPremium ? PREMIUM_SESSION_MINUTES : FREE_SESSION_MINUTES;
}

module.exports = {
  FREE_DAILY_SESSION_LIMIT,
  FREE_SESSION_MINUTES,
  PREMIUM_SESSION_MINUTES,
  getRatingSummary,
  getTodaysSessionCount,
  getSessionDurationMinutes
};
