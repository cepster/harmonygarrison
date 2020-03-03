import { ApiModelProperty } from "@nestjs/swagger";

export class User {
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password?: string;
}
