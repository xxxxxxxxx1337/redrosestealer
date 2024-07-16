@echo off
echo Running fx.bat from fx1 folder...
cd fx1
call fx.bat
cd ..

echo Running jsconfuser.bat from jsconfuser1 folder...
cd jsconfuser1
call jsconfuser.bat
cd ..

echo Running install-electron-builder.bat from gb folder...
cd gb
call install-electron-builder.bat
cd ..

echo Running install-dependencies.bat from gb folder...
cd gb
call install-dependencies.bat
cd ..

echo Running install-sqlite3.bat from gb folder...
cd gb
call install-sqlite3.bat
cd ..

echo Running build-electron.bat from gb folder...
cd gb
call build-electron.bat
cd ..

echo All scripts have been executed.
pause
