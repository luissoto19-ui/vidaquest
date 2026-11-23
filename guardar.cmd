@echo off
rem Guarda una copia del proyecto y la sube a GitHub.
rem Uso:  .\guardar "lo que cambiaste"
set GIT="C:\Program Files\Git\cmd\git.exe"
if "%~1"=="" (
  set /p MSG=Que cambiaste?:
) else (
  set MSG=%~1
)
%GIT% add -A
%GIT% commit -m "%MSG%"
%GIT% push
echo.
echo Listo! Copia guardada y subida a GitHub.
