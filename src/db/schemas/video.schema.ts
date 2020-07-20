import {
  Prop,
  modelOptions,
  Ref,
  plugin,
  mongoose,
} from '@typegoose/typegoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { Category } from './category.schema';
import { MultiLanguageDTO } from 'src/core/DTO/multi-language.dto';
import { MultiLanguageOptionalDTO } from 'src/core/DTO/multi-language.optional';

@plugin(mongoosePaginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Video {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  name: MultiLanguageDTO;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  description: MultiLanguageOptionalDTO;

  @Prop({ required: true })
  url: string;

  @Prop({ ref: 'Category', required: true })
  category!: Ref<Category>;
}
