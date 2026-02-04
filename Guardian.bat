@echo off
IF "%1"=="run" (
    echo Starting Guardian AI Platform...
    npm run dev
) ELSE (
    echo Usage: Guardian run
    echo This will start the Backend and all Frontend modules.
)
