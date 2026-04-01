import { Schema, model, Document } from 'mongoose'

export interface IUrl extends Document {
  originalUrl: string
  shortCode: string
  clicks: number
  expiresAt?: Date
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    clicks: {
      type: Number,
      default: 0
    },
    expiresAt: {
      type: Date
    }
  },
  { timestamps: true }
)

// TTL index (auto delete nếu có expiresAt)
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const UrlModel = model<IUrl>('Url', urlSchema)