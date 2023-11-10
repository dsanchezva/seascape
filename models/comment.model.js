const comentariosSchema = new mongoose.Schema({
  comentario: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beach",
  },
});
