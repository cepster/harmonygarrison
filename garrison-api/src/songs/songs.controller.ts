import { Controller, Get, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LearnedSong, SongsService } from "./songs.service";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get("mySongs")
  @UseGuards(AuthGuard("jwt"))
  async getUserSongs(@Request() req): Promise<LearnedSong[]> {
    console.log("getting my songs");
    return this.songsService.getAllUserSongs(req.user.userId);
  }

  @Get("allSongs")
  @UseGuards(AuthGuard("jwt"))
  async getAllSongs(@Request() req): Promise<string[]> {
    console.log("getting all songs");
    return this.songsService.getAllSongs();
  }

  @Put("mySongs")
  @UseGuards(AuthGuard("jwt"))
  async writeUserSongs(@Request() req): Promise<LearnedSong[]> {
    console.log(req.user);
    return this.songsService.writeUserSongs(req.user.userId, req.body);
  }
}
