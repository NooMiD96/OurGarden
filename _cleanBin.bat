dir /s /b /ad bin | findstr "\\" >  dirs.txt
dir /s /b /ad obj | findstr "\\" >> dirs.txt
for /f "delims=;" %%i in (dirs.txt) DO rd /s /q "%%i"
del dirs.txt