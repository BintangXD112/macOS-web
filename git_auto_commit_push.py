import subprocess
import os
import sys
from typing import List, Tuple

# Aturan mapping file ke conventional commit type
CONVENTIONAL_MAP = {
    '.md': 'docs',
    '.json': 'chore',
    '.ts': 'feat',
    '.tsx': 'feat',
    '.js': 'feat',
    '.css': 'style',
    '.html': 'feat',
    'README.md': 'docs',
    'package.json': 'chore',
    'tsconfig.json': 'chore',
    'vite.config.ts': 'chore',
}

# Helper untuk menjalankan perintah shell dan ambil output
def run(cmd: List[str]) -> str:
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        print(f"Error running {' '.join(cmd)}: {result.stderr}")
        sys.exit(1)
    return result.stdout.strip()

# Ambil branch saat ini
def get_current_branch() -> str:
    return run(["git", "rev-parse", "--abbrev-ref", "HEAD"])

# Parse git status --porcelain untuk file baru/terubah
def get_changed_files() -> List[Tuple[str, str]]:
    status = run(["git", "status", "--porcelain"])
    files = []
    for line in status.splitlines():
        code = line[:2]
        file = line[3:].strip()
        if code in ("??", " M", "M "):
            files.append((code, file))
    return files

# Tentukan conventional type dari nama file
def get_commit_type(filename: str) -> str:
    for key, ctype in CONVENTIONAL_MAP.items():
        if filename.endswith(key) or filename == key:
            return ctype
    if filename.lower().startswith("app") or filename.lower().startswith("component"):
        return "feat"
    return "chore"

# Generate commit message yang jelas dan berbeda
def generate_commit_message(code: str, filename: str) -> str:
    ctype = get_commit_type(filename)
    if code == "??":
        return f"{ctype}: add {filename} (initial commit)"
    elif code.strip() == "M":
        return f"{ctype}: update {filename} (content update)"
    else:
        return f"{ctype}: update {filename}"

# Proses utama: add, commit, push satu per satu
def main():
    branch = get_current_branch()
    files = get_changed_files()
    if not files:
        print("Tidak ada file baru/terubah untuk di-commit.")
        return
    for code, filename in files:
        print(f"\nMemproses: {filename} ({code})")
        run(["git", "add", filename])
        msg = generate_commit_message(code, filename)
        print(f"Commit message: {msg}")
        run(["git", "commit", "-m", msg])
        run(["git", "push", "origin", branch])
        print(f"Sukses commit & push: {filename}\n")
    print("\nSemua file selesai di-commit dan push satu per satu!")

if __name__ == "__main__":
    main() 