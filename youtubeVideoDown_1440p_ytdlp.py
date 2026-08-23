import tkinter as tk
from tkinter import messagebox
import os
import re
import shutil

import yt_dlp


def safe_filename(name):
    return re.sub(r'[\\/:*?"<>|]', '_', name)


def parse_quality(quality_text):
    """
    '1440p', '1080', '720P' 등의 입력에서 높이 숫자만 추출한다.
    """
    match = re.search(r'(\d+)', quality_text)
    if not match:
        raise ValueError("화질은 1440p, 1080p, 720p처럼 입력하세요.")

    height = int(match.group(1))

    if height <= 0:
        raise ValueError("화질 값은 0보다 커야 합니다.")

    return height


def find_ffmpeg():
    """
    PATH에서 ffmpeg를 찾는다.
    찾지 못하면 기존 사용 환경을 고려해 자주 쓰는 경로도 확인한다.
    """
    ffmpeg_path = shutil.which("ffmpeg")

    if ffmpeg_path:
        return ffmpeg_path

    candidates = [
        r"H:\ffmpeg\bin\ffmpeg.exe",
        r"C:\ffmpeg\bin\ffmpeg.exe",
        r"D:\ffmpeg\bin\ffmpeg.exe",
    ]

    for candidate in candidates:
        if os.path.isfile(candidate):
            return candidate

    return None


def download_youtube_video():
    video_url = url_entry.get().strip()
    download_path = path_entry.get().strip()
    video_quality = quality_entry.get().strip()

    if not video_url or not download_path:
        messagebox.showerror("오류", "URL과 다운로드 경로를 입력하세요.")
        return

    try:
        requested_height = parse_quality(video_quality)

        os.makedirs(download_path, exist_ok=True)

        ffmpeg_path = find_ffmpeg()

        # 요청 화질 이하에서 가장 좋은 video-only 스트림을 선택한다.
        #
        # 우선순위:
        # 1. 요청 화질 이하 MP4 + H.264/AVC
        # 2. 요청 화질 이하 MP4
        # 3. 요청 화질 이하 모든 video-only
        #
        # 예:
        # 1440p 요청 + 영상 최고 화질 1080p
        # -> 1080p 최고 video-only 스트림 자동 선택
        format_selector = (
            f"bestvideo[height<={requested_height}][ext=mp4][vcodec^=avc1]/"
            f"bestvideo[height<={requested_height}][ext=mp4]/"
            f"bestvideo[height<={requested_height}]"
        )

        # 실제 선택된 화질을 파일명에 넣는다.
        output_template = os.path.join(
            download_path,
            "%(title)s_%(height)sp_HIGH_video_only.%(ext)s"
        )

        ydl_opts = {
            "format": format_selector,
            "outtmpl": output_template,

            # video-only 다운로드
            "noplaylist": True,

            # 이미 존재하는 파일은 덮어쓴다.
            "overwrites": True,

            # Windows에서 사용할 수 없는 문자를 yt-dlp가 정리하도록 한다.
            "windowsfilenames": True,

            # 콘솔창이 없는 --windowed EXE에서도 내부 출력 때문에
            # 문제가 생기지 않도록 조용히 처리한다.
            "quiet": True,
            "no_warnings": True,
        }

        # ffmpeg를 찾은 경우 yt-dlp에 명시적으로 알려준다.
        if ffmpeg_path:
            ydl_opts["ffmpeg_location"] = ffmpeg_path

            # MP4 스트림이 없어서 webm 등이 선택된 경우
            # 원본 프로그램과 마찬가지로 최종 결과를 MP4로 변환한다.
            ydl_opts["recodevideo"] = "mp4"

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # 정보 조회와 실제 다운로드를 한 번에 수행한다.
            info = ydl.extract_info(video_url, download=True)

            if not info:
                raise RuntimeError("YouTube 영상 정보를 가져오지 못했습니다.")

            title = info.get("title") or "youtube_video"

            selected_downloads = info.get("requested_downloads") or []
            if selected_downloads:
                selected = selected_downloads[0]
            else:
                selected = info

            actual_height = selected.get("height")

        if actual_height:
            actual_quality_text = f"{actual_height}p"
        else:
            actual_quality_text = "선택된 최고 화질"

        if actual_height and actual_height < requested_height:
            quality_message = (
                f"\n\n요청한 {requested_height}p 화질이 없어 "
                f"{actual_quality_text}로 다운로드했습니다."
            )
        else:
            quality_message = ""

        messagebox.showinfo(
            "완료",
            f"{title}\n"
            f"{actual_quality_text} video-only 다운로드 완료!"
            f"{quality_message}\n\n"
            f"저장 경로:\n{download_path}"
        )

    except yt_dlp.utils.DownloadError as e:
        messagebox.showerror(
            "다운로드 오류",
            "yt-dlp 다운로드 중 오류가 발생했습니다.\n\n"
            f"{e}"
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
