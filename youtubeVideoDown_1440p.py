from pytubefix import YouTube
import tkinter as tk
from tkinter import messagebox
import os
import re
import tempfile
import subprocess


def safe_filename(name):
    return re.sub(r'[\\/:*?"<>|]', '_', name)


def download_youtube_video():
    video_url = url_entry.get().strip()
    download_path = path_entry.get().strip()
    video_quality = quality_entry.get().strip()

    if not video_url or not download_path:
        messagebox.showerror("오류", "URL과 다운로드 경로를 입력하세요.")
        return

    try:
        yt = YouTube(video_url, 'WEB')

        os.makedirs(download_path, exist_ok=True)

        title = safe_filename(yt.title)
        output_file_name = f"{title}_{video_quality}_HIGH_video_only.mp4"
        output_file_path = os.path.join(download_path, output_file_name)

        # ------------------------------------------------------------
        # 1. 먼저 1440p mp4 video-only 원본 스트림을 찾는다.
        #    이게 있으면 변환 없이 그대로 다운로드한다.
        #    이 경우가 가장 좋다.
        # ------------------------------------------------------------
        mp4_video_stream = yt.streams.filter(
            res=video_quality,
            file_extension="mp4",
            adaptive=True,
            only_video=True
        ).order_by("fps").desc().first()

        if mp4_video_stream is not None:
            mp4_video_stream.download(
                output_path=download_path,
                filename=output_file_name
            )

            messagebox.showinfo(
                "완료",
                f"{yt.title}\n"
                f"{video_quality} 원본 mp4 video-only 다운로드 완료!\n\n"
                f"{output_file_path}"
            )
            return

        # ------------------------------------------------------------
        # 2. mp4 원본이 없으면 webm 포함해서 1440p video-only 스트림을 찾는다.
        #    YouTube는 1440p를 webm으로만 제공하는 경우가 많다.
        # ------------------------------------------------------------
        video_stream = yt.streams.filter(
            res=video_quality,
            adaptive=True,
            only_video=True
        ).order_by("fps").desc().first()

        if video_stream is None:
            messagebox.showerror(
                "오류",
                f"{video_quality} 화질의 video-only 스트림을 찾을 수 없습니다."
            )
            return

        # 선택된 원본 스트림 확인용
        print("===== 선택된 원본 스트림 =====")
        print("title:", yt.title)
        print("resolution:", video_stream.resolution)
        print("subtype:", video_stream.subtype)
        print("mime_type:", video_stream.mime_type)
        print("fps:", video_stream.fps)
        print("video_codec:", video_stream.video_codec)
        print("filesize:", video_stream.filesize)

        # ------------------------------------------------------------
        # 3. webm 같은 원본 video-only를 임시 폴더에 다운로드한 뒤
        #    매우 고화질 mp4로 변환한다.
        #
        # -an              : 오디오 제거
        # -c:v libx264     : mp4 호환성이 좋은 H.264로 변환
        # -preset slow     : 느리지만 압축 효율 좋음
        # -crf 10          : 매우 고화질, 대용량
        # -pix_fmt yuv420p : 일반 플레이어 호환성 확보
        #
        # crf를 더 낮추면 더 커진다.
        # 예: 8, 6, 4, 0
        # ------------------------------------------------------------
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_video_file = video_stream.download(
                output_path=temp_dir,
                filename=f"video.{video_stream.subtype}"
            )

            command = [
                "ffmpeg",
                "-y",
                "-i", temp_video_file,
                "-an",
                "-c:v", "libx264",
                "-preset", "slow",
                "-crf", "8",
                "-pix_fmt", "yuv420p",
                output_file_path
            ]

            subprocess.run(
                command,
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )

        messagebox.showinfo(
            "완료",
            f"{yt.title}\n"
            f"{video_quality} 고화질 mp4 video-only 변환 완료!\n\n"
            f"{output_file_path}"
        )

    except subprocess.CalledProcessError:
        messagebox.showerror(
            "오류 발생",
            "ffmpeg 변환 중 오류가 발생했습니다.\n\n"
            "C:\\ffmpeg\\bin 이 PATH에 제대로 등록되어 있는지 확인하세요."
        )

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
path_entry.insert(0, "Y:/dw/")

tk.Label(root, text="화질:").pack()
quality_entry = tk.Entry(root, width=50)
quality_entry.pack()
quality_entry.insert(0, "1440p")

download_button = tk.Button(
    root,
    text="다운로드",
    command=download_youtube_video
)
download_button.pack()

root.mainloop()