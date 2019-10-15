import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as toastr from "toastr";
import { SongProfile } from "./songProfile.model";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"]
})
export class SongsComponent implements OnInit {
  public songProfile: SongProfile;
  public allSongs: string[];
  public songToAdd: string;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get("/songs/mySongs").subscribe((a: SongProfile) => {
      this.songProfile = a;

      this.http.get("/songs/allSongs").subscribe((allSongs: string[]) => {
        this.allSongs = allSongs;
        this.filterAllSongs();
      });
    });
  }

  addSong(event: any) {
    console.log(event);
    this.songProfile.songs.push(event.item);
    this.songToAdd = "";
    this.filterAllSongs();
  }

  deleteSong(song: string) {
    this.songProfile.songs = this.songProfile.songs.filter(s => s !== song);
  }

  filterAllSongs() {
    this.allSongs = this.allSongs.filter(song => {
      return !this.songProfile.songs.find(s => s === song);
    });
  }

  saveSongs() {
    this.http
      .put("/songs/mySongs", this.songProfile)
      .subscribe((a: SongProfile) => {
        toastr.success("Songs have been saved!");
      });
  }
}
