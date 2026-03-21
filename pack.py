import os
import shutil
import zipfile

src_dir = r"c:\Users\priya\OneDrive\文档\Desktop\AI_CRM_Project"
dest_zip = r"c:\Users\priya\OneDrive\文档\Desktop\AI_CRM_Project_Submission.zip"
video_src = r"C:\Users\priya\.gemini\antigravity\brain\f8483dd7-9a80-45a5-bbe1-65f097ad32a2\crm_app_demo_1774111636735.webp"
video_dest = os.path.join(src_dir, "demo_video.webp")

# Copy the video
if os.path.exists(video_src):
    shutil.copy2(video_src, video_dest)
    print("Copied video successfully.")
else:
    print("Warning: Video not found at source!")

# Exclude directories
exclude_dirs = {'venv', 'node_modules', '.git', '__pycache__'}

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            # Skip the zip file itself and the script
            if file == "AI_CRM_Project_Submission.zip" or file == "pack.py":
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, path)
            ziph.write(file_path, arcname)

print("Creating ZIP archive...")
with zipfile.ZipFile(dest_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipdir(src_dir, zipf)

print(f"Project successfully zipped at {dest_zip}")
