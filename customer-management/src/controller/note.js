import Customer from '../models/customer.js'
import Note from '../models/note.js'

export const create = async (req, res) => {
    try {
        const { note, customerId } = req.body;

        if (!note || !customerId) {
          return res.status(400).json({message: 'Insufficient data'});
        }

        const customerDB = await Customer.findOne({where: {id: customerId}})
        if (!customerDB) {
          return res.status(404).json({message: 'Customer not found'});
        }

        const noteDB = await Note.create({
          note: note,
          createdBy: req.user.id,
          customerId: customerId
        })

        return res.status(201).json({message: 'Note created', note: noteDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const update = async (req, res) => {
  try {
    const { note } = req.body;
    const { id } = req.params;


    if (!note || !id) {
      return res.status(400).json({message: 'Insufficient data'});
    }

    const noteDB = await Note.findOne({
      where: { id: id}
    })
    if (!noteDB) {
      return res.status(404).json({message: 'Note not found'});
    }

    noteDB.note = note;

    const updatedNote = await noteDB.save();

    return res.status(201).json({message: 'Note updated', note: updatedNote})
  } catch (error) {
    return res.status(500).json({message: 'Internal Error'})
  }
}

export const remove = async (req, res) => {
    try {
      const { id } = req.params;

        const noteDB = await Note.findOne({
            where: { id: id }
        })
        if (!noteDB) {
            return res.status(404).json({message: 'Note not found'});
        }

        await noteDB.destroy();

        return res.status(201).json({message: 'Note deleted', note: noteDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const noteDB = await Note.findOne({
            where: { id: id }
        })
        if (!noteDB) {
            return res.status(404).json({message: 'Note not found'});
        }

        return res.status(200).json({message: 'Note found', note: noteDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}
