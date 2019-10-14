export interface LearnedSong {
  userId: number;
  songTitle: string;
}

export class SongsService {
  private songs: LearnedSong[] = [
    {
      userId: 1,
      songTitle: "I'm Walkin",
    },
    {
      userId: 1,
      songTitle: "Everything's Coming Up Roses",
    },
    {
      userId: 2,
      songTitle: "Love Me",
    },
    {
      userId: 3,
      songTitle: "I'm Walkin",
    },
  ];

  async getAllUserSongs(userId: number): Promise<LearnedSong[]> {
    return this.songs.filter(s => s.userId === userId);
  }

  async getAllSongs(): Promise<string[]> {
    return this.songs
      .map(s => s.songTitle)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  }

  async writeUserSongs(
    userId: number,
    songs: LearnedSong[],
  ): Promise<LearnedSong[]> {
    this.songs = [...this.songs.filter(s => s.userId !== userId), ...songs];
    return this.songs.filter(s => s.userId === userId);
  }
}
