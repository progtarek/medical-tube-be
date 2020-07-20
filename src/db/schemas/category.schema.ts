import {
  Prop,
  modelOptions,
  Ref,
  plugin,
  mongoose,
} from '@typegoose/typegoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { MultiLanguageDTO } from 'src/core/DTO/multi-language.dto';
import { MultiLanguageOptionalDTO } from 'src/core/DTO/multi-language.optional';

@plugin(mongoosePaginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  name: MultiLanguageDTO;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  description: MultiLanguageOptionalDTO;
}
