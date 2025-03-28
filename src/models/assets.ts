import mongoose from "mongoose"

export interface IAsset extends mongoose.Document {
  name: string
}

export interface Asset extends Pick<IAsset, "name"> {
  id: string
  dateCreated: Date
  dateUpdated: Date
}

const AssetSchema = new mongoose.Schema<IAsset>(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Asset name is required"],
      max: [120, "Asset name cannot be more than 120 characters"],
      min: [10, "Asseet name is too short"]
    }
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateUpdated"
    },
    toJSON: {
      virtuals: true,
      transform: (_, ret, __) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)

export default mongoose.models.Assets ||
  mongoose.model<IAsset>("Assets", AssetSchema)
