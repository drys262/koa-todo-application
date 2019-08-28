import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
  todo: { type: String, required: true },
});

export default mongoose.model('Todos', TodoSchema);
