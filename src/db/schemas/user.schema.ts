import { Prop, modelOptions, pre, plugin } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import * as mongoosePaginate from 'mongoose-paginate';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@pre<User>('save', async function() {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
})
@plugin(mongoosePaginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Prop({
    trim: true,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  })
  username: string;

  @Prop({
    trim: true,
    lowercase: true,
    required: false,
    unique: true,
    uniqueCaseInsensitive: true,
    sparse: true,
  })
  email: string;

  @Prop({
    trim: true,
    lowercase: true,
    required: false,
  })
  mobile: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({ enum: Gender })
  gender?: Gender;

  @Prop({
    required: true,
  })
  role: 'ADMIN' | 'USER';

  @Prop({ required: false })
  profilePictureUrl: string;

  public async comparePassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  }
}
