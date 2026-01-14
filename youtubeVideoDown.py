# 유튜브 화질이 1080p 인 경우 video만 추출됨
# url : https://4ourfuture.tistory.com/32
# 실행파일 생성 : pyinstaller --onefile --windowed youtubeVideoDown.py

# pip install pytube
# pip install pytubefix
# pip install pyinstaller

from pytubefix import YouTube
import tkinter as tk
from tkinter import messagebox

def download_youtube_video():
  video_url = url_entry.get()
  download_path = path_entry.get()

  if not video_url or not download_path:
    messagebox.showerror("오류", "URL과 다운로드 경로를 입력하세요.")
    return

  try:
    yt = YouTube(video_url)
    video_stream = yt.streams.filter(res='1080p', file_extension='mp4').first()
    video_stream.download(download_path)
    messagebox.showinfo("완료", f"{video_stream.title} 다운로드 완료!")

  except Exception as e:
    messagebox.showerror("오류 발생", str(e))

root = tk.Tk()
root.title("유튜브 영상 다운로드")

tk.Label(root, text="유튜브 영상 URL:").pack()
url_entry = tk.Entry(root, width=50)
url_entry.pack()

tk.Label(root, text="다운로드 경로:").pack()
path_entry = tk.Entry(root, width=50)
path_entry.pack()

download_button = tk.Button(root, text="다운로드", command=download_youtube_video)
download_button.pack()

root.mainloop()

#############################################################

