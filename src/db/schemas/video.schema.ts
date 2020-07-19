import { Prop, modelOptions, Ref, plugin } from '@typegoose/typegoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { Category } from './category.schema';

@plugin(mongoosePaginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Video {
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

  @Prop({ ref: 'Category', required: true })
  category!: Ref<Category>;
}
