import { SongProfile } from "./songProfile";

export class SongsService {
  private allSongs: string[] = [
    "I'm Walkin'",
    "Everything's Coming Up Roses",
    "Love Me",
  ];

  private songProfiles: SongProfile[] = [
    {
      userId: 1,
      songs: ["I'm Walkin", "Everything's Coming Up Roses"],
    },
    {
      userId: 2,
      songs: ["Love Me"],
    },
    {
      userId: 3,
      songs: ["I'm Walkin"],
    },
  ];

  async getSongProfile(userId: number): Promise<SongProfile> {
    return this.songProfiles.filter(s => s.userId === userId)[0];
  }

  async getAllSongs(): Promise<string[]> {
    return this.allSongs;
  }

  async writeUserSongs(songProfile: SongProfile): Promise<SongProfile> {
    this.songProfiles = [
      ...this.songProfiles.filter(s => s.userId !== songProfile.userId),
      songProfile,
    ];

    return songProfile;
  }
}
