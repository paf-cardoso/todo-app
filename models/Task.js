import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'O título da tarefa é obrigatório'],
      trim: true,
      maxlength: [200, 'O título não pode ter mais de 200 caracteres']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
