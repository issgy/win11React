"use babel";
import axios from "axios";

const search_song_url = "/search?query=";
const search_album_url = "/album?id=";
const song_url = "/song?pids=";
const album_url = "/album?id=";

const { floor, random } = Math;

class JioSaavn {
  constructor() {
    // this.ignorewhitespace = true;
    this.defaultSongs = [
      "Szz0RZFb",
      "cgM-pRO9",
      "mPk9X_H_",
      "R2GnvPCo",
      "eR_xs61E",
      "ZGifVkqI",
      "TEG8c_EJ",
      "gy17KLcd",
      "rkpNHSo1",
      "o8jkpKcg",
      "tUjXvoKS",
      "Kv6rGi1G",
    ];

    this.dfdata = [
      {
        id: "Szz0RZFb",
        album: "Raincoat",
        albumArt:
          "https://c.saavncdn.com/432/Raincoat-Hindi-2004-20210125130707-150x150.jpg",
        name: "Piya Tora Kaisa Abhiman",
        artist: "Shubha Mudgal",
        duration: 297,
        src: "http://aac.saavncdn.com/432/545714e974b6138352be162e6f13c4f5_160.mp4",
      },
      {
        id: "cgM-pRO9",
        album: "Ek Nazar",
        albumArt:
          "https://c.saavncdn.com/228/Ek-Nazar-Hindi-2020-20200518060806-150x150.jpg",
        name: "Ek Nazar",
        artist: "Kavita Seth",
        duration: 297,
        src: "http://aac.saavncdn.com/432/545714e974b6138352be162e6f13c4f5_160.mp4",
      },
    ];

    this.instance = axios.create({
      baseURL: "https://dev.saavn.me",
    });
  }

  fetch(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.instance(url, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject({
            error: "axios",
            data: error,
          });
        });
    });
  }

  fetchSong(pids) {
    if (typeof pids != "object") pids = [pids];
    return new Promise((resolve, reject) => {
      this.fetch(song_url + pids.join(","))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  fetchSongs(pids) {
    if (typeof pids != "object") pids = [pids];
    return Promise.all(
      pids.map((id) =>
        this.fetchSong(id)
          .then((r) => r)
          .catch((err) => null)
      )
    ).then((songs) => songs.filter((song) => song != null));
  }

  mapToSong({ ...obj }) {
    return {
      album: obj.album_name,
      albumArt: obj.song_image,
      name: obj.song_name,
      artist: obj.song_artist,
      duration: obj.song_duration,
      src:
        obj.download_links && (obj.download_links[1] || obj.download_links[0]),
    };
  }

  getAlbum(id) {
    return new Promise((resolve, reject) => {
      this.fetch(album_url + id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getDefault() {
    // console.log("Okay");
    return new Promise((resolve) => {
      resolve(this.dfdata);
      return;
      // this.fetchSongs(
      //   this.defaultSongs[floor(random() * this.defaultSongs.length)]
      // )
      //   .then((res) => {
      //     resolve([this.mapToSong(res.data)]);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     resolve(this.dfdata);
      //   });
    });
  }

  formatTime(sec) {
    if (!sec) return "0:00";
    var res = floor(sec / 60);
    res += ":";
    sec %= 60;
    if (sec < 10) res += "0";
    res += sec;

    return res;
  }

  formatPeriod(sec) {
    if (!sec) return "";
    var res = "",
      h = floor(sec / 3600);
    if (h != 0) res += h + " hr ";
    sec = sec % 3600;
    res += floor(sec / 60) + " min ";
    sec %= 60;
    res += sec + " sec";
    return res;
  }

  // 返回打乱后的数组
  shuffle(arr) {
    var currentIndex = arr.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = floor(random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  mixQueue(n) {
    var arr = [];
    for (let i = 0; i < n; i++) arr.push(i);
    var brr = this.shuffle([...arr]);
    for (let i = 0; i < n; i++) arr[brr[i]] = brr[(i + 1) % n];

    return arr;
  }

  // 将数组中第i个截取掉，返回新数组
  sliceArr(arr, i) {
    return arr.slice(i + 1, arr.length).concat(arr.slice(0, i));
  }

  searchQuery(query) {
    return new Promise((resolve, reject) => {
      this.fetch(search_song_url + query)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

export default new JioSaavn();
