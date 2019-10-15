import { ApiModelProperty } from "@nestjs/swagger";

export class SongProfile {
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  songs: string[];
}
