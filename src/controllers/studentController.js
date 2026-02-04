const pool = require('../db')

// get
exports.getStudents = async (req, res) => {
  try {
    const teacher_id = req.user.id

    const result = await pool.query(
      `SELECT * FROM students WHERE teacher_id = $1 ORDER BY number ASC`,
      [teacher_id]
    )

    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// add
exports.addStudent = async (req, res) => {
  try {
    const { number, prefix, name, level, department } = req.body
    const teacher_id = req.user.id

    const result = await pool.query(
      `INSERT INTO students (number, prefix, name, level, department, teacher_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [number, prefix, name, level, department, teacher_id]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    if (err.code === '23505') {
      return res.status(400).json({ message: 'เลขที่ซ้ำในห้อง' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// update
exports.updateStudent = async (req, res) => {
  try {
    const { number, prefix, name, level, department } = req.body
    const { id } = req.params
    const teacher_id = req.user.id

    await pool.query(
      `UPDATE students 
       SET number=$1, prefix=$2, name=$3, level=$4, department=$5 
       WHERE id=$6 AND teacher_id=$7`,
      [number, prefix, name, level, department, id, teacher_id]
    )

    res.json({ message: 'updated' })
  } catch (err) {
    console.error(err)
    if (err.code === '23505') {
      return res.status(400).json({ message: 'เลขที่ซ้ำในห้อง' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// delete
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    const teacher_id = req.user.id

    await pool.query(
      'DELETE FROM students WHERE id=$1 AND teacher_id=$2',
      [id, teacher_id]
    )

    res.json({ message: 'deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
