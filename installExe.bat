@echo off
REM Build script for goto.exe using PyInstaller
REM This script will create a standalone executable

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   Building breathe.exe
echo ========================================
echo.

REM Check if PyInstaller is installed
python -m pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo Installing PyInstaller...
    python -m pip install pyinstaller
)


REM Run PyInstaller
echo.
echo Building executable...
echo.
python -m PyInstaller breathe.spec

if errorlevel 1 (
    echo.
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Your executable is located at:
echo   dist\breathe.exe
echo.
echo Next steps:
echo   1. Add the dist\ folder to your PATH environment variable
echo      OR copy breathe.exe to a folder that's already in PATH
echo   2. Create a wrapper in PowerShell Profile to handle directory change
echo.
pause
