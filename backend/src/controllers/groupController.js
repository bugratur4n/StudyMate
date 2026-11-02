const db = require('../config/db');

async function getGroupWithMembers(groupId) {
  const groupResult = await db.query(
    `SELECT g.*, u.first_name AS creator_first_name, u.last_name AS creator_last_name
     FROM study_groups g
     JOIN users u ON u.id = g.created_by
     WHERE g.id = $1`,
    [groupId]
  );

  if (groupResult.rows.length === 0) {
    return null;
  }

  const members = await db.query(
    `SELECT gm.user_id, gm.joined_at, u.first_name, u.last_name, u.department
     FROM group_members gm
     JOIN users u ON u.id = gm.user_id
     WHERE gm.group_id = $1
     ORDER BY gm.joined_at`,
    [groupId]
  );

  return { ...groupResult.rows[0], members: members.rows };
}

exports.createGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { session_id, group_name } = req.body;

    if (!group_name) {
      return res.status(400).json({ message: 'Grup adı zorunludur.' });
    }

    const premiumCheck = await db.query('SELECT is_premium FROM users WHERE id = $1', [userId]);
    if (!premiumCheck.rows[0]?.is_premium) {
      return res.status(403).json({ message: 'Grup çalışması premium bir özelliktir.' });
    }

    if (session_id) {
      const sessionResult = await db.query(
        `SELECT s.id, m.user1_id, m.user2_id
         FROM sessions s
         JOIN matches m ON s.match_id = m.id
         WHERE s.id = $1`,
        [session_id]
      );

      if (sessionResult.rows.length === 0) {
        return res.status(404).json({ message: 'Oturum bulunamadı.' });
      }

      const session = sessionResult.rows[0];
      if (session.user1_id !== userId && session.user2_id !== userId) {
        return res.status(403).json({ message: 'Bu oturumdan grup oluşturma yetkiniz yok.' });
      }
    }

    const groupResult = await db.query(
      `INSERT INTO study_groups (session_id, created_by, group_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [session_id || null, userId, group_name]
    );

    const group = groupResult.rows[0];
    await db.query(
      'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)',
      [group.id, userId]
    );

    if (session_id) {
      const sessionResult = await db.query(
        `SELECT m.user1_id, m.user2_id
         FROM sessions s
         JOIN matches m ON s.match_id = m.id
         WHERE s.id = $1`,
        [session_id]
      );
      const partnerId = sessionResult.rows[0].user1_id === userId
        ? sessionResult.rows[0].user2_id
        : sessionResult.rows[0].user1_id;

      await db.query(
        `INSERT INTO group_members (group_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [group.id, partnerId]
      );
    }

    const fullGroup = await getGroupWithMembers(group.id);

    res.status(201).json({
      message: 'Çalışma grubu oluşturuldu.',
      group: fullGroup
    });
  } catch (error) {
    console.error('Grup oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listMyGroups = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT g.id, g.group_name, g.session_id, g.created_by, g.created_at
       FROM study_groups g
       JOIN group_members gm ON gm.group_id = g.id
       WHERE gm.user_id = $1
       ORDER BY g.created_at DESC`,
      [req.user.id]
    );

    res.json({
      message: 'Gruplar getirildi.',
      groups: result.rows
    });
  } catch (error) {
    console.error('Grup listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await getGroupWithMembers(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı.' });
    }

    const isMember = group.members.some((member) => member.user_id === req.user.id);
    if (!isMember) {
      return res.status(403).json({ message: 'Bu gruba erişim yetkiniz yok.' });
    }

    res.json({
      message: 'Grup bilgisi getirildi.',
      group
    });
  } catch (error) {
    console.error('Grup getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: 'user_id zorunludur.' });
    }

    const group = await getGroupWithMembers(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı.' });
    }

    if (group.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Sadece grup kurucusu üye ekleyebilir.' });
    }

    const userCheck = await db.query('SELECT id FROM users WHERE id = $1', [user_id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Eklenecek kullanıcı bulunamadı.' });
    }

    await db.query(
      `INSERT INTO group_members (group_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [group.id, user_id]
    );

    const updated = await getGroupWithMembers(group.id);

    res.json({
      message: 'Üye gruba eklendi.',
      group: updated
    });
  } catch (error) {
    console.error('Grup üyesi ekleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
