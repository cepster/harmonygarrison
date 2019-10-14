import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { LearnedSong } from "../../../../models/song.model";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"]
})
export class SongsComponent implements OnInit {
  public songs: LearnedSong[];
  public allSongs: string[];
  public songToAdd: string;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get("/songs/mySongs").subscribe((a: LearnedSong[]) => {
      this.songs = a;

      this.http.get("/songs/allSongs").subscribe((allSongs: string[]) => {
        this.allSongs = allSongs;
        this.filterAllSongs();
      });
    });
  }

  addSong(event: any) {
    console.log(event);
    this.songs.push({
      userId: 1,
      songTitle: event.item
    });
    this.songToAdd = "";
    this.filterAllSongs();
  }

  deleteSong(song: LearnedSong) {
    this.songs = this.songs.filter(s => s.songTitle !== song.songTitle);
  }

  filterAllSongs() {
    this.allSongs = this.allSongs.filter(song => {
      return !this.songs.map(s => s.songTitle).find(s => s === song);
    });
  }

  saveSongs() {
    this.http
      .put("/songs/mySongs", this.songs)
      .subscribe((a: LearnedSong[]) => {
        console.log(a);
      });
  }
}
