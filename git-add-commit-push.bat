@echo off
setlocal enabledelayedexpansion

REM Dapatkan branch saat ini
git rev-parse --abbrev-ref HEAD > tmp_branch.txt
set /p BRANCH=<tmp_branch.txt

del tmp_branch.txt

REM Loop semua file yang belum di-track atau sudah diubah
for /f "delims=" %%f in ('git status --porcelain') do (
    set "line=%%f"
    set "file=!line:~3!"
    set "status=!line:~0,2!"
    set "msgType=Update"
    set "msgDetail=!file!"

    REM Tentukan tipe pesan berdasarkan path/nama file
    echo !file! | findstr /I "^Middleware/" >nul && set "msgType=Middleware" && set "msgDetail=!file:Middleware/=!"
    echo !file! | findstr /I "^Controllers/" >nul && set "msgType=Controller" && set "msgDetail=!file:Controllers/=!"
    if /I "!file!"=="appsettings.json" set "msgType=Config" & set "msgDetail=appsettings.json"
    if /I "!file!"=="README.md" set "msgType=Docs" & set "msgDetail=README.md"

    REM Hanya proses file yang belum di-add (??) atau yang diubah ( M, M )
    if "!status!"=="??" (
        git add "!file!"
        git commit -m "Add !msgType! !msgDetail!: initial commit"
        git push origin !BRANCH!
    ) else if "!status!"==" M" (
        git add "!file!"
        git commit -m "Update !msgType! !msgDetail!: update content"
        git push origin !BRANCH!
    )
)

echo Selesai add, commit, dan push satu per satu. 