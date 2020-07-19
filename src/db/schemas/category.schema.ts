import { Prop, modelOptions, Ref, plugin, MapProp } from '@typegoose/typegoose';
import { User } from './user.schema';
import * as mongoosePaginate from 'mongoose-paginate';

@plugin(mongoosePaginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  @Prop({
    required: true,
  })
  name: {
    en: string;
    ar: string;
  };

  @Prop()
  description: {
    en: string;
    ar: string;
  };
}
