import { Body, Controller, Get, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SongProfile } from "./songProfile";
import { SongsService } from "./songs.service";

@ApiBearerAuth()
@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get("mySongs")
  @UseGuards(AuthGuard("jwt"))
  async getUserSongs(@Request() req): Promise<SongProfile> {
    return this.songsService.getSongProfile(req.user.userId);
  }

  @Get("allSongs")
  @UseGuards(AuthGuard("jwt"))
  async getAllSongs(@Request() req): Promise<string[]> {
    return this.songsService.getAllSongs();
  }

  @Put("mySongs")
  @UseGuards(AuthGuard("jwt"))
  async writeUserSongs(@Body() songProfile: SongProfile): Promise<SongProfile> {
    return this.songsService.writeUserSongs(songProfile);
  }
}
